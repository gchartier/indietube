import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import * as ui from "./styles";
import { CHANNEL_FILTER_LIST } from "../../utilities/channelFilter";
import HTTPException from "../../utilities/exceptions";
import formatVideoDuration from "../../utilities/formatVideoDuration";
import ResultList from "../results-list/ResultsList";
import Loading from "../loading/Loading";
import NoResults from "../no-results/NoResults";
import {
    API_SEARCH_URL,
    SEARCH_PARAMS,
    API_VIDEOS_URL,
    VIDEOS_PARAMS,
    PAGE_LIMIT,
    REQUEST_LOOP_LIMIT,
} from "../../utilities/constants";

export default function MainContent(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [resultsState, setResultsState] = useState({
        indieResults: [],
        resultsBuffer: [],
        nextPageToken: "",
        isSearch: true,
    });

    const getSearchListResp = useCallback(
        async (nextPageToken) => {
            let searchEndpoint =
                API_SEARCH_URL + "&q=" + props.searchQuery + SEARCH_PARAMS;

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
        },
        [props.searchQuery]
    );

    const handleResultsError = useCallback(
        (error) => {
            if (error instanceof HTTPException) {
                if (error.status === 403)
                    alert(
                        "indieTube has exceeded it's daily quota for the YouTube Data API. Check back tomorrow. :("
                    );
                else alert("Something went wrong...");
            } else alert(error);

            if (resultsState.isSearch) {
                setResultsState({
                    indieResults: [],
                    resultsBuffer: [],
                    nonIndieCount: 0,
                    nextPageToken: "",
                    isSearch: true,
                });
                props.setNonIndieCount(0);
            } else {
                setResultsState({
                    indieResults: resultsState.indieResults,
                    resultsBuffer: resultsState.resultsBuffer,
                    nextPageToken: "",
                    isSearch: false,
                });
            }

            setIsLoading(false);
        },
        [
            props,
            resultsState.indieResults,
            resultsState.isSearch,
            resultsState.resultsBuffer,
        ]
    );

    const getSearchResults = useCallback(async () => {
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
                nextPageToken: nextPageToken,
                isSearch: true,
            });
            props.setNonIndieCount(nonIndieResults.length);

            setIsLoading(false);
        } catch (error) {
            handleResultsError(error);
        }
    }, [getSearchListResp, handleResultsError, props]);

    useEffect(() => {
        if (props.submitSearch === true) {
            // Clear results state
            setResultsState({
                indieResults: [],
                resultsBuffer: [],
                nextPageToken: "",
                isSearch: true,
            });

            getSearchResults();
            props.setSubmitSearch(false);
        }
    }, [props, getSearchResults]);

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
                nextPageToken: nextPageToken,
                isSearch: false,
            });
            props.setNonIndieCount(
                props.nonIndieCount + nonIndieResults.length
            );

            setIsLoading(false);
        } catch (error) {
            handleResultsError(error);
        }
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
        <ui.StyledMainContent>
            {isLoading && <Loading />}

            {resultsState.indieResults.length > 0 ? (
                <ResultList
                    results={resultsState.indieResults}
                    scrollHandler={getNextResultsPage}
                    isSearch={resultsState.isSearch}
                />
            ) : (
                <NoResults />
            )}
        </ui.StyledMainContent>
    );
}
