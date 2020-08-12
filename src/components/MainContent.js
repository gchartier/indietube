import React, { Component } from "react";
import Search from "./Search";
import ResultList from "./ResultsList";
import styled from "styled-components";
import axios from "axios";
import convertDurationToTimestamp from "../assets/helperFunctions.js";
import Loading from "./Loading";
import NoResults from "./NoResults";
import {
    API_SEARCH_URL,
    SEARCH_PARAMS,
    API_VIDEOS_URL,
    VIDEOS_PARAMS,
    PAGE_LIMIT,
    REQUEST_LOOP_LIMIT,
} from "../assets/constants.js";
import { CHANNEL_FILTER_LIST } from "../assets/channelFilter";

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

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.getNextPageOfResults = this.getNextPageOfResults.bind(this);
        this.setIsLoading = this.setIsLoading.bind(this);
    }

    handleSearchChange(event) {
        this.setState({ searchQuery: event.target.value });
    }

    handleSearchSubmit(event) {
        event.preventDefault();
        this.setIsLoading(true);

        retrieveSearchResults(this.state).then((results) => {
            this.setState({
                resultPages: results.resultPage,
                pageOverflow: results.pageOverflow,
                nonIndieCount: results.nonIndieCount,
                nextPageToken: results.nextPageToken,
            });
            this.setIsLoading(false);
        });
    }

    getNextPageOfResults() {
        this.setIsLoading(true);
        retrieveNextSearchResultsPage(this.state).then((results) => {
            const currentPages = this.state.resultPages;
            this.setState({
                resultPages: currentPages.concat(results.resultPage),
                pageOverflow: results.pageOverflow,
                nonIndieCount: this.state.nonIndieCount + results.nonIndieCount,
                nextPageToken: results.nextPageToken,
            });
            this.setIsLoading(false);
        });
    }

    setIsLoading(isLoading) {
        this.setState({ isLoading: isLoading });
    }

    render() {
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
                        scrollHandler={this.getNextPageOfResults}
                        isSearch={this.state.isSearch}
                    />
                ) : (
                    <NoResults />
                )}
            </StyledMainContent>
        );
    }
}

function HTTPException(error) {
    this.status = error.response.status;
    this.name = "HTTPException";
    this.message = error.message;
}

async function retrieveSearchResults(state) {
    let searchEndpoint =
        API_SEARCH_URL + "&q=" + state.searchQuery + SEARCH_PARAMS;
    const videosEndpoint = API_VIDEOS_URL + VIDEOS_PARAMS;
    const videoIds = [];
    const resultPage = [];
    const pageOverflow = [];
    const nonIndieResults = [];
    let requestRound = 0;
    let searchResponse = "";
    let searchData = "";
    let nextPageToken = "";

    try {
        do {
            requestRound++;
            searchResponse = await axios
                .get(
                    nextPageToken !== ""
                        ? searchEndpoint + "&pageToken=" + nextPageToken
                        : searchEndpoint
                )
                .catch((error) => {
                    throw new HTTPException(error);
                });
            searchData = await searchResponse.data;
            if (searchResponse.status === 200 && searchData.items.length < 1)
                throw Error("No results found for your search...");

            nextPageToken = searchData.nextPageToken;
            searchData.items.forEach((item) => {
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

                // Filter out any channel Ids that are in the filter list
                if (
                    CHANNEL_FILTER_LIST.some(
                        (channel) => channel.channelId === result.channel.id
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
        } while (
            resultPage.length < PAGE_LIMIT &&
            requestRound < REQUEST_LOOP_LIMIT
        );

        // Request videos API endpoint to retrieve video statistics
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

        return {
            resultPage: resultPage,
            pageOverflow: pageOverflow,
            nonIndieCount: nonIndieResults.length,
            nextPageToken: nextPageToken,
        };
    } catch (error) {
        if (error instanceof HTTPException) {
            if (error.status === 403)
                alert(
                    "indieTube has exceeded it's daily quota for the YouTube Data API. Check back tomorrow. :("
                );
            else alert("Something went wrong...");
        } else alert(error);
        return {
            resultPage: [],
            pageOverflow: [],
            nonIndieCount: 0,
            nextPageToken: "",
            isSearch: true,
        };
    }
}

async function retrieveNextSearchResultsPage(state) {
    let searchEndpoint =
        API_SEARCH_URL + "&q=" + state.searchQuery + SEARCH_PARAMS;
    const videosEndpoint = API_VIDEOS_URL + VIDEOS_PARAMS;
    const videoIds = [];
    const resultPage = [];
    const pageOverflow = state.pageOverflow;
    const nonIndieResults = [];
    let requestRound = 0;
    let searchResponse = "";
    let searchData = "";
    let nextPageToken = state.nextPageToken;

    try {
        // Fill page from overflow if any
        while (pageOverflow.length > 0 && resultPage.length < PAGE_LIMIT) {
            resultPage.push(pageOverflow.pop());
            videoIds.push(resultPage[resultPage.length - 1].id);
        }

        // Retrieve more results if the page is not full
        while (
            resultPage.length < PAGE_LIMIT &&
            requestRound < REQUEST_LOOP_LIMIT
        ) {
            searchResponse = await axios
                .get(
                    nextPageToken !== ""
                        ? searchEndpoint + "&pageToken=" + nextPageToken
                        : searchEndpoint
                )
                .catch((error) => {
                    throw new HTTPException(error);
                });
            searchData = await searchResponse.data;

            requestRound++;
            nextPageToken = searchData.nextPageToken;
            searchData.items.forEach((item) => {
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

                // Filter out any channel Ids that are in the filter list
                if (
                    CHANNEL_FILTER_LIST.some(
                        (channel) => channel.channelId === result.channel.id
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

        // Request videos API endpoint to retrieve video statistics
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

        return {
            resultPage: resultPage,
            pageOverflow: pageOverflow,
            nonIndieCount: nonIndieResults.length,
            nextPageToken: nextPageToken,
        };
    } catch (error) {
        if (error instanceof HTTPException) {
            if (error.status === 403)
                alert(
                    "indieTube has exceeded it's daily quota for the YouTube Data API. Check back tomorrow. :("
                );
            else alert("Something went wrong...");
        } else alert(error);
        return {
            resultPage: [],
            pageOverflow: [],
            nonIndieCount: 0,
            nextPageToken: "",
            isSearch: true,
        };
    }
}

export default MainContent;
