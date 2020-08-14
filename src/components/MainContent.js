import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import moment from "moment";
import { CHANNEL_FILTER_LIST } from "../services/channelFilter";
import HTTPException from "../services/exceptions";
import formatVideoDuration from "../services/helperFunctions.js";
import Search from "./Search";
import ResultList from "./ResultsList";
import Loading from "./reusable/Loading";
import NoResults from "./NoResults";
import {
    API_SEARCH_URL,
    SEARCH_PARAMS,
    API_VIDEOS_URL,
    VIDEOS_PARAMS,
    PAGE_LIMIT,
    REQUEST_LOOP_LIMIT,
} from "../services/constants.js";

const StyledMainContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    background-color: whitesmoke;
    min-height: 0;
    width: 100%;
`;

class MainContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: "",
            indieResults: [],
            resultsBuffer: [],
            nextPageToken: "",
            nonIndieCount: 0,
            isLoading: false,
            isSearch: true,
        };

        this.getSearchResults = this.getSearchResults.bind(this);
        this.getNextResultsPage = this.getNextResultsPage.bind(this);
        this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.setIsLoading = this.setIsLoading.bind(this);
        this.getSearchListResp = this.getSearchListResp.bind(this);
        this.getVideoDetails = this.getVideoDetails.bind(this);
        this.filterResultsByChannel = this.filterResultsByChannel.bind(this);
        this.handleResultsError = this.handleResultsError.bind(this);
    }

    async getSearchResults() {
        const videoIds = [];
        const indieResults = [];
        const resultsBuffer = [];
        const nonIndieResults = [];
        let requestRound = 0;
        let nextPageToken = "";

        try {
            this.setIsLoading(true);

            // Retrieve search results until the page is full
            do {
                requestRound++;

                const searchListResp = await this.getSearchListResp(
                    nextPageToken
                );

                nextPageToken = searchListResp.data.nextPageToken;

                if (
                    searchListResp.status === 200 &&
                    searchListResp.data.items.length < 1
                )
                    throw Error("No results found for your search...");

                this.filterResultsByChannel(
                    searchListResp.data.items,
                    nonIndieResults,
                    indieResults,
                    videoIds,
                    resultsBuffer
                );
            } while (
                indieResults.length < PAGE_LIMIT &&
                requestRound < REQUEST_LOOP_LIMIT
            );

            await this.getVideoDetails(indieResults, videoIds);

            this.setState({
                indieResults: indieResults,
                resultsBuffer: resultsBuffer,
                nonIndieCount: nonIndieResults.length,
                nextPageToken: nextPageToken,
                isSearch: true,
            });

            this.setIsLoading(false);
        } catch (error) {
            this.handleResultsError(error, true);
        }
    }

    async getNextResultsPage() {
        const videoIds = [];
        const indieResults = [];
        const resultsBuffer = this.state.resultsBuffer;
        const nonIndieResults = [];
        let requestRound = 0;
        let nextPageToken = this.state.nextPageToken;

        try {
            this.setIsLoading(true);

            // Fill result page from overflow if any
            while (
                resultsBuffer.length > 0 &&
                indieResults.length < PAGE_LIMIT
            ) {
                indieResults.push(resultsBuffer.pop());
                videoIds.push(indieResults[indieResults.length - 1].id);
            }

            // Retrieve results until the result page is full
            while (
                indieResults.length < PAGE_LIMIT &&
                requestRound < REQUEST_LOOP_LIMIT
            ) {
                requestRound++;

                const searchListResp = await this.getSearchListResp(
                    nextPageToken
                );

                nextPageToken = searchListResp.data.nextPageToken;

                this.filterResultsByChannel(
                    searchListResp.data.items,
                    nonIndieResults,
                    indieResults,
                    videoIds,
                    resultsBuffer
                );
            }

            await this.getVideoDetails(indieResults, videoIds);

            this.setState((state) => {
                return {
                    indieResults: state.indieResults.concat(indieResults),
                    resultsBuffer: resultsBuffer,
                    nonIndieCount: state.nonIndieCount + nonIndieResults.length,
                    nextPageToken: nextPageToken,
                    isSearch: false,
                };
            });

            this.setIsLoading(false);
        } catch (error) {
            this.handleResultsError(error, false);
        }
    }

    handleSearchQueryChange(event) {
        this.setState({ searchQuery: event.target.value });
    }

    handleSearchSubmit(event) {
        event.preventDefault();

        // Clear result list state
        this.setState({
            indieResults: [],
            nextPageToken: "",
            resultsBuffer: [],
            nonIndieCount: 0,
            isSearch: true,
        });
        this.getSearchResults();
    }

    setIsLoading(isLoading) {
        this.setState({ isLoading: isLoading });
    }

    async getSearchListResp(nextPageToken) {
        let searchEndpoint =
            API_SEARCH_URL + "&q=" + this.state.searchQuery + SEARCH_PARAMS;

        const searchResponse = await axios
            .get(
                nextPageToken !== ""
                    ? searchEndpoint + "&pageToken=" + nextPageToken
                    : searchEndpoint
            )
            .catch((error) => {
                throw new HTTPException(error);
            });

        return {
            status: searchResponse.status,
            data: await searchResponse.data,
        };
    }

    async getVideoDetails(indieResults, videoIds) {
        const videosEndpoint = API_VIDEOS_URL + VIDEOS_PARAMS;

        const videoDetailsResponse = await axios
            .get(videosEndpoint + videoIds.join("%2C"))
            .catch((error) => {
                throw new HTTPException(error);
            });

        videoDetailsResponse.data.items.forEach((item, i) => {
            console.log(item.contentDetails.duration);
            indieResults[i] = {
                ...indieResults[i],
                duration: formatVideoDuration(item.contentDetails.duration),
                views: item.statistics.viewCount,
                likes: item.statistics.likeCount,
                dislikes: item.statistics.dislikeCount,
            };
            console.log(indieResults[i].duration);
        });
    }

    filterResultsByChannel(
        results,
        nonIndieResults,
        indieResults,
        videoIds,
        resultsBuffer
    ) {
        results.forEach((item) => {
            const result = {
                id: item.id.videoId,
                title: item.snippet.title,
                publishDate: item.snippet.publishedAt,
                channel: {
                    id: item.snippet.channelId,
                    name: item.snippet.channelTitle,
                },
                thumbnail: item.snippet.thumbnails.medium,
            };

            // Filter results by channel
            if (
                indieResults.findIndex((item) => result.id === item.id) < 0 &&
                resultsBuffer.findIndex((item) => result.id === item.id) < 0
            )
                if (
                    CHANNEL_FILTER_LIST.some(
                        (item) => item.channelId === result.channel.id
                    )
                ) {
                    nonIndieResults.push(result);
                } else {
                    if (indieResults.length < PAGE_LIMIT) {
                        indieResults.push(result);
                        videoIds.push(result.id);
                    } else resultsBuffer.push(result);
                }
        });
    }

    handleResultsError(error, isInitialSearch) {
        if (error instanceof HTTPException) {
            if (error.status === 403)
                alert(
                    "indieTube has exceeded it's daily quota for the YouTube Data API. Check back tomorrow. :("
                );
            else alert("Something went wrong...");
        } else alert(error);

        if (isInitialSearch)
            this.setState({
                indieResults: [],
                resultsBuffer: [],
                nonIndieCount: 0,
                nextPageToken: "",
                isSearch: true,
            });
        else
            this.setState({
                nextPageToken: "",
                isSearch: false,
            });

        this.setIsLoading(false);
    }

    render() {
        return (
            <StyledMainContent>
                {this.state.isLoading && <Loading />}
                <Search
                    searchQuery={this.state.searchQuery}
                    onSearchChange={this.handleSearchQueryChange}
                    onSearchSubmit={this.handleSearchSubmit}
                    nonIndieCount={this.state.nonIndieCount}
                />

                {this.state.indieResults.length > 0 ? (
                    <ResultList
                        results={this.state.indieResults}
                        scrollHandler={this.getNextResultsPage}
                        isSearch={this.state.isSearch}
                    />
                ) : (
                    <NoResults />
                )}
            </StyledMainContent>
        );
    }
}

export default MainContent;
