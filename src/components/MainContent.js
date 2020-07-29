import React, { Component } from "react";
import Search from "./Search";
import ResultList from "./ResultsList";
import styled from "styled-components";
import axios from "axios";

const results = [
    {
        thumbnailSrc:
            "https://images.unsplash.com/photo-1549281899-f75600a24107?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80",
        thumbnailTime: "10:10",
        views: "1000",
        likes: "25",
        dislikes: "15",
        title: "Hello thereeeeeee",
        channelIcon:
            "https://images.unsplash.com/photo-1557296387-5358ad7997bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
        channelName: "Test 1234",
        channelSubs: "500",
    },
    {
        thumbnailSrc:
            "https://images.unsplash.com/photo-1520531158340-44015069e78e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2038&q=80",
        thumbnailTime: "10:50",
        views: "1000",
        likes: "25",
        dislikes: "15",
        title: "BISHHHHHHHHHH",
        channelIcon:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
        channelName: "REEEEEEE",
        channelSubs: "512",
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
        alert("A search was submitted: " + this.state.searchQuery);
        event.preventDefault();
        axios
            .get(
                "https://www.googleapis.com/youtube/v3/search?q=" +
                    this.state.searchQuery +
                    "&key=[API KEY HERE]"
            )
            .then((response) => {
                console.log(response.data);
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
