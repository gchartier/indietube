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
            time: "10:10",
        },
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
            time: "10:50",
        },
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
    background-color: whitesmoke;
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
                });

                axios
                    .get(
                        "https://www.googleapis.com/youtube/v3/videos?" +
                            "&key=" +
                            process.env.REACT_APP_YOUTUBE_DATA_API_KEY +
                            "&part=statistics,contentDetails" +
                            "&fields=items(statistics(viewCount,likeCount,dislikeCount,favoriteCount),contentDetails(duration))"
                    )
                    .then((response) => {
                        response.data.items.forEach((item) => {
                            results.forEach({
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

export default MainContent;
