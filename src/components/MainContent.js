import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
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

function MainContent() {
    const [resultsState, setResultsState] = useState({
        indieResults: [],
        resultsBuffer: [],
        nonIndieCount: 0,
        nextPageToken: "",
        isSearch: true,
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function getSearchResults() {
        const videoIds = [];
        const indieResults = [];
        const resultsBuffer = [];
        const nonIndieResults = [];
        let requestRound = 0;
        let nextPageToken = "";

        try {
            setIsLoading(true);

            // Retrieve search results until the page is full
            do {
                requestRound++;

                const searchListResp = await getSearchListResp(nextPageToken);

                nextPageToken = searchListResp.data.nextPageToken;

                if (
                    searchListResp.status === 200 &&
                    searchListResp.data.items.length < 1
                )
                    throw Error("No results found for your search...");

                filterResultsByChannel(
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

            await getVideoDetails(indieResults, videoIds);

            setResultsState({
                indieResults: indieResults,
                resultsBuffer: resultsBuffer,
                nonIndieCount: nonIndieResults.length,
                nextPageToken: nextPageToken,
                isSearch: true,
            });

            setIsLoading(false);
        } catch (error) {
            handleResultsError(error);
        }
    }

    async function getNextResultsPage() {
        const videoIds = [];
        const indieResults = [];
        const resultsBuffer = resultsState.resultsBuffer;
        const nonIndieResults = [];
        let requestRound = 0;
        let nextPageToken = resultsState.nextPageToken;

        try {
            setIsLoading(true);

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

                const searchListResp = await getSearchListResp(nextPageToken);

                nextPageToken = searchListResp.data.nextPageToken;

                filterResultsByChannel(
                    searchListResp.data.items,
                    nonIndieResults,
                    indieResults,
                    videoIds,
                    resultsBuffer
                );
            }

            await getVideoDetails(indieResults, videoIds);

            setResultsState({
                indieResults: resultsState.indieResults.concat(indieResults),
                resultsBuffer: resultsBuffer,
                nonIndieCount:
                    resultsState.nonIndieCount + nonIndieResults.length,
                nextPageToken: nextPageToken,
                isSearch: false,
            });

            setIsLoading(false);
        } catch (error) {
            handleResultsError(error);
        }
    }

    function handleSearchQueryChange(event) {
        setSearchQuery(event.target.value);
    }

    function handleSearchSubmit(event) {
        event.preventDefault();

        // Clear results state
        setResultsState({
            indieResults: [],
            resultsBuffer: [],
            nonIndieCount: 0,
            nextPageToken: "",
            isSearch: true,
        });

        getSearchResults();
    }

    function filterResultsByChannel(
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

    function handleResultsError(error) {
        if (error instanceof HTTPException) {
            if (error.status === 403)
                alert(
                    "indieTube has exceeded it's daily quota for the YouTube Data API. Check back tomorrow. :("
                );
            else alert("Something went wrong...");
        } else alert(error);

        if (resultsState.isSearch)
            setResultsState({
                indieResults: [],
                resultsBuffer: [],
                nonIndieCount: 0,
                nextPageToken: "",
                isSearch: true,
            });
        else
            setResultsState({
                indieResults: resultsState.indieResults,
                resultsBuffer: resultsState.resultsBuffer,
                nonIndieCount: resultsState.nonIndieCount,
                nextPageToken: "",
                isSearch: false,
            });

        setIsLoading(false);
    }

    async function getSearchListResp(nextPageToken) {
        let searchEndpoint =
            API_SEARCH_URL + "&q=" + searchQuery + SEARCH_PARAMS;

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

    async function getVideoDetails(indieResults, videoIds) {
        const videosEndpoint = API_VIDEOS_URL + VIDEOS_PARAMS;

        const videoDetailsResponse = await axios
            .get(videosEndpoint + videoIds.join("%2C"))
            .catch((error) => {
                throw new HTTPException(error);
            });

        videoDetailsResponse.data.items.forEach((item, i) => {
            indieResults[i] = {
                ...indieResults[i],
                duration: formatVideoDuration(item.contentDetails.duration),
                views: item.statistics.viewCount,
                likes: item.statistics.likeCount,
                dislikes: item.statistics.dislikeCount,
            };
        });
    }

    return (
        <StyledMainContent>
            {isLoading && <Loading />}
            <Search
                searchQuery={searchQuery}
                onSearchChange={handleSearchQueryChange}
                onSearchSubmit={handleSearchSubmit}
                nonIndieCount={resultsState.nonIndieCount}
            />

            {resultsState.indieResults.length > 0 ? (
                <ResultList
                    results={resultsState.indieResults}
                    scrollHandler={getNextResultsPage}
                    isSearch={resultsState.isSearch}
                />
            ) : (
                <NoResults />
            )}
        </StyledMainContent>
    );
}

export default MainContent;
