import React, { Component } from "react";
import Search from "./Search";
import ResultList from "./ResultsList";
import styled from "styled-components";
import axios from "axios";
import {
    API_SEARCH_URL,
    API_VIDEOS_URL,
    CHANNEL_FILTER_LIST,
    PAGE_NUMBER,
    RESULTS_LIMIT,
} from "../assets/constants.js";

const StyledMainContent = styled.div`
    background-color: #e6e6e6;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

class MainContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: "",
            indieResults: [],
            nonIndieResults: [],
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    handleSearchChange(event) {
        this.setState({ searchQuery: event.target.value });
    }

    handleSearchSubmit(event) {
        event.preventDefault();

        retrieveSearchResults(this.state).then((results) => {
            this.setState({
                indieResults: results.indieResults,
                nonIndieResults: results.nonIndieResults,
            });
        });
    }

    render() {
        return (
            <StyledMainContent>
                <Search
                    searchQuery={this.state.searchQuery}
                    onSearchChange={this.handleSearchChange}
                    onSearchSubmit={this.handleSearchSubmit}
                    nonIndieCount={this.state.nonIndieResults.length}
                />
                <ResultList results={this.state.indieResults} />
            </StyledMainContent>
        );
    }
}

async function retrieveSearchResults(state) {
    const indieResults = [];
    const nonIndieResults = [];
    const videoIds = [];
    const searchEndpoint =
        API_SEARCH_URL +
        "&q=" +
        state.searchQuery +
        "&key=" +
        process.env.REACT_APP_YOUTUBE_DATA_API_KEY +
        "&maxResults=" +
        RESULTS_LIMIT +
        "&chart=mostPopular" +
        "&regionCode=US" +
        "&type=video" +
        "&part=snippet" +
        "&fields=items(id,snippet(publishedAt,channelId,title,channelTitle),snippet/thumbnails(medium))";
    const videosEndpoint =
        API_VIDEOS_URL +
        "&key=" +
        process.env.REACT_APP_YOUTUBE_DATA_API_KEY +
        "&part=statistics,contentDetails" +
        "&fields=items(statistics(viewCount,likeCount,dislikeCount,favoriteCount),contentDetails(duration))" +
        "&id=";

    // while (results.length < RESULTS_LIMIT) {

    // }
    try {
        const videosResponse = await axios.get(searchEndpoint);
        const videoList = await videosResponse.data;

        videoList.items.forEach((item) => {
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
                indieResults.push(result);
                videoIds.push(result.id);
            }
        });

        // Request videos API endpoint to retrieve video statistics
        const searchResponse = await axios.get(
            videosEndpoint + videoIds.join("%2C")
        );
        searchResponse.data.items.forEach((item, i) => {
            indieResults[i] = {
                ...indieResults[i],
                duration: convertDurationToTimestamp(
                    item.contentDetails.duration
                ),
                views: item.statistics.viewCount,
                likes: item.statistics.likeCount,
                dislikes: item.statistics.dislikeCount,
            };
        });

        return { indieResults: indieResults, nonIndieResults: nonIndieResults };
    } catch (e) {
        console.log("Error: " + e);
    }
}

// This should be refactored to use the npm package installed
function convertDurationToTimestamp(ISODuration) {
    let timestamp = "";
    const matches = ISODuration.match(
        /((?<hours>\d{0,2})H)?((?<minutes>\d{0,2})M)?(?<seconds>\d{0,2})S/
    );

    if (matches) {
        if (matches.groups.hours)
            timestamp = timestamp.concat(matches.groups.hours + ":");

        if (matches.groups.minutes) {
            if (matches.groups.hours && matches.groups.minutes.length === 1)
                timestamp = timestamp.concat(
                    "0" + matches.groups.minutes + ":"
                );
            else timestamp = timestamp.concat(matches.groups.minutes + ":");
        } else timestamp = timestamp.concat("0:");

        if (matches.groups.seconds) {
            if (matches.groups.seconds.length === 1)
                timestamp = timestamp.concat("0" + matches.groups.seconds);
            else timestamp = timestamp.concat(matches.groups.seconds);
        }
    }
    return timestamp;
}

export default MainContent;
