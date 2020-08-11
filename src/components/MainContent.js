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
    CHANNEL_FILTER_LIST,
    PAGE_LIMIT,
} from "../assets/constants.js";

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
                nonIndieCount: results.nonIndieCount,
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
                    />
                ) : (
                    <NoResults />
                )}
            </StyledMainContent>
        );
    }
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
            searchResponse = await axios.get(
                nextPageToken !== ""
                    ? searchEndpoint + "&pageToken=" + nextPageToken
                    : searchEndpoint
            );
            searchData = await searchResponse.data;

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
        } while (resultPage.length < PAGE_LIMIT && requestRound < 4);

        // Request videos API endpoint to retrieve video statistics
        const videoDetailsResponse = await axios.get(
            videosEndpoint + videoIds.join("%2C")
        );
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
    } catch (e) {
        console.log("Error: " + e);
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
        while (resultPage.length < PAGE_LIMIT && requestRound < 6) {
            searchResponse = await axios.get(
                nextPageToken !== ""
                    ? searchEndpoint + "&pageToken=" + nextPageToken
                    : searchEndpoint
            );
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
        const videoDetailsResponse = await axios.get(
            videosEndpoint + videoIds.join("%2C")
        );
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
    } catch (e) {
        console.log("Error: " + e);
    }
}

export default MainContent;
