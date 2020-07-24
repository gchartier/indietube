import React from "react";
import Search from "./Search";
import ResultList from "./ResultsList";
import styled from "styled-components";

function MainContent() {
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

    const MainContent = styled.div`
        background-color: whitesmoke;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    `;

    return (
        <MainContent>
            <Search />
            <ResultList results={results} />
        </MainContent>
    );
}

export default MainContent;
