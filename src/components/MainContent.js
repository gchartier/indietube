import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import {
    API_SEARCH_URL,
    SEARCH_PARAMS,
    API_VIDEOS_URL,
    VIDEOS_PARAMS,
    PAGE_LIMIT,
    REQUEST_LOOP_LIMIT,
} from "../services/constants.js";
import { CHANNEL_FILTER_LIST } from "../services/channelFilter";
import HTTPException from "../services/exceptions";
import convertDurationToTimestamp from "../services/helperFunctions.js";
import Search from "./Search";
import ResultList from "./ResultsList";
import Loading from "./reusable/Loading";
import NoResults from "./NoResults";

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
            resultPages: [],
            currentPage: 0,
            nextPageToken: "",
            pageOverflow: [],
            nonIndieCount: 0,
            isLoading: false,
            isSearch: true,
        };

        this.getSearchResults = this.getSearchResults.bind(this);
        this.getNextResultsPage = this.getNextResultsPage.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.setIsLoading = this.setIsLoading.bind(this);
        this.getSearchListResp = this.getSearchListResp.bind(this);
        this.getVideoListResp = this.getVideoListResp.bind(this);
        this.filterResultsByChannel = this.filterResultsByChannel.bind(this);
        this.handleResultsError = this.handleResultsError.bind(this);
    }

    async getSearchResults() {
        const videoIds = [];
        const resultPage = [];
        const pageOverflow = [];
        const nonIndieResults = [];
        let requestRound = 0;
        let videoDetailsResponse = "";
        let nextPageToken = "";

        try {
            this.setIsLoading(true);

            // Retrieve search results until the page is full
            do {
                requestRound++;
                const searchListResp = this.getSearchListResp(nextPageToken);
                nextPageToken = searchListResp.data.nextPageToken;

                if (
                    searchListResp.status === 200 &&
                    searchListResp.data.items.length < 1
                )
                    throw Error("No results found for your search...");

                this.filterResultsByChannel(
                    searchListResp.data.items,
                    result,
                    nonIndieResults,
                    resultPage,
                    videoIds,
                    pageOverflow
                );
            } while (
                resultPage.length < PAGE_LIMIT &&
                requestRound < REQUEST_LOOP_LIMIT
            );

            this.getVideoListResp(resultPage);

            this.setState({
                resultPages: resultPage,
                pageOverflow: pageOverflow,
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
        const resultPage = [];
        const pageOverflow = this.state.pageOverflow;
        const nonIndieResults = [];
        let requestRound = 0;
        let nextPageToken = this.state.nextPageToken;

        try {
            this.setIsLoading(true);

            // Fill result page from overflow if any
            while (pageOverflow.length > 0 && resultPage.length < PAGE_LIMIT) {
                resultPage.push(pageOverflow.pop());
                videoIds.push(resultPage[resultPage.length - 1].id);
            }

            // Retrieve results until the result page is full
            while (
                resultPage.length < PAGE_LIMIT &&
                requestRound < REQUEST_LOOP_LIMIT
            ) {
                requestRound++;
                const searchListResp = this.getSearchListResp(nextPageToken);
                nextPageToken = searchListResp.data.nextPageToken;

                this.filterResultsByChannel(
                    searchListResp.data.items,
                    result,
                    nonIndieResults,
                    resultPage,
                    videoIds,
                    pageOverflow
                );
            }

            this.getVideoListResp(resultPage);

            this.setState((state) => {
                return {
                    resultPages: state.resultPages.concat(resultPage),
                    pageOverflow: pageOverflow,
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

    handleSearchChange(event) {
        this.setState({ searchQuery: event.target.value });
    }

    handleSearchSubmit(event) {
        event.preventDefault();
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

        return { status: response.status, data: await searchResponse.data };
    }

    async getVideoListResp(resultPage) {
        const videosEndpoint = API_VIDEOS_URL + VIDEOS_PARAMS;
        const videoDetailsResponse = await axios
            .get(videosEndpoint + videoIds.join("%2C"))
            .catch((error) => {
                throw new HTTPException(error);
            });
        videoDetailsResponse.data.items.forEach((item, i) => {
            resultPage[i] = {
                ...resultPage[i],
                duration: convertDurationToTimestamp(
                    item.contentDetails.duration
                ),
                views: item.statistics.viewCount,
                likes: item.statistics.likeCount,
                dislikes: item.statistics.dislikeCount,
            };
        });
    }

    filterResultsByChannel(
        results,
        nonIndieResults,
        resultPage,
        videoIds,
        pageOverflow
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

            if (
                CHANNEL_FILTER_LIST.some(
                    (item) => item.channelId === result.channel.id
                )
            ) {
                nonIndieResults.push(result);
            } else {
                if (resultPage.length < PAGE_LIMIT) {
                    resultPage.push(result);
                    videoIds.push(result.id);
                } else pageOverflow.push(result);
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
                resultPages: [],
                pageOverflow: [],
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
        console.log(this.state.resultPages.length);
        return (
            <StyledMainContent>
                {this.state.isLoading && <Loading />}
                <Search
                    searchQuery={this.state.searchQuery}
                    onSearchChange={this.handleSearchChange}
                    onSearchSubmit={this.handleSearchSubmit}
                    nonIndieCount={this.state.nonIndieCount}
                />

                {this.state.resultPages.length > 0 ? (
                    <ResultList
                        results={this.state.resultPages}
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
