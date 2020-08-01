import React, { Component } from "react";
import Search from "./Search";
import ResultList from "./ResultsList";
import styled from "styled-components";
import axios from "axios";

const results = [
    {
        id: "xzy",
        thumbnail: {
            url:
                "https://images.unsplash.com/photo-1549281899-f75600a24107?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80",
            width: 120,
            height: 90,
        },
        duration: "10:10",
        views: "1000",
        likes: "25",
        dislikes: "15",
        title: "Hello thereeeeeee",
        channel: {
            id: "123",
            icon:
                "https://images.unsplash.com/photo-1557296387-5358ad7997bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
            name: "Test 1234",
            subs: "500",
        },
    },
    {
        id: "abc",
        thumbnail: {
            url:
                "https://images.unsplash.com/photo-1520531158340-44015069e78e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2038&q=80",
            width: 120,
            height: 90,
        },
        duration: "10:50",
        views: "1000",
        likes: "25",
        dislikes: "15",
        title: "BISHHHHHHHHHH",
        channel: {
            id: "1234",
            icon:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
            name: "REEEEEEE",
            subs: "512",
        },
    },
];

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
            searchResults: results,
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    handleSearchChange(event) {
        this.setState({ searchQuery: event.target.value });
    }

    handleSearchSubmit(event) {
        event.preventDefault();

        // Request search API endpoint to get initial video list data
        axios
            .get(
                "https://www.googleapis.com/youtube/v3/search?q=" +
                    this.state.searchQuery +
                    "&key=" +
                    process.env.REACT_APP_YOUTUBE_DATA_API_KEY +
                    "&part=snippet" +
                    "&type=video" +
                    "&fields=items(id,snippet(publishedAt,channelId,title,channelTitle,publishTime),snippet/thumbnails(medium))"
            )
            .then((response) => {
                const results = [];
                const videoIds = [];

                response.data.items.forEach((item) => {
                    results.push({
                        id: item.id.videoId,
                        title: item.snippet.title,
                        publishDate: item.snippet.publishedAt,
                        publishTime: item.snippet.publishTime,
                        channel: {
                            id: item.snippet.channelId,
                            name: item.snippet.channelTitle,
                        },
                        thumbnail: item.snippet.thumbnails.medium,
                    });

                    // Build array of ids to be used in the next request
                    videoIds.push(item.id.videoId);
                });

                // Request videos API endpoint to retrieve video statistics
                let URLEncodedIds = videoIds.join("%2C");
                axios
                    .get(
                        "https://www.googleapis.com/youtube/v3/videos?&id=" +
                            URLEncodedIds +
                            "&key=" +
                            process.env.REACT_APP_YOUTUBE_DATA_API_KEY +
                            "&part=statistics,contentDetails" +
                            "&fields=items(statistics(viewCount,likeCount,dislikeCount,favoriteCount),contentDetails(duration))"
                    )
                    .then((response) => {
                        response.data.items.forEach((item, i) => {
                            results[i] = {
                                ...results[i],
                                duration: convertDurationToTimestamp(
                                    item.contentDetails.duration
                                ),
                                views: item.statistics.viewCount,
                                likes: item.statistics.likeCount,
                                dislikes: item.statistics.dislikeCount,
                            };
                        });
                        this.setState({ searchResults: results });
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                this.setState({ searchResults: results });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <StyledMainContent>
                <Search
                    searchQuery={this.state.searchQuery}
                    onSearchChange={this.handleSearchChange}
                    onSearchSubmit={this.handleSearchSubmit}
                />
                <ResultList results={this.state.searchResults} />
            </StyledMainContent>
        );
    }
}

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
