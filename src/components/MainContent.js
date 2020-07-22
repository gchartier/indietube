import React from "react";
import Search from "./Search";
import ResultList from "./ResultsList";

function MainContent() {
    const results = [
        {
            thumbnailSrc: "xyz.jpg",
            thumbnailTime: "10:10",
            views: "1000",
            likes: "25",
            dislikes: "15",
            title: "Hello thereeeeeee",
            channelIcon: "xyz.jpg",
            channelName: "Test 1234",
            channelSubs: "500",
        },
        {
            thumbnailSrc: "xyz.jpg",
            thumbnailTime: "10:10",
            views: "1000",
            likes: "25",
            dislikes: "15",
            title: "BISHHHHHHHHHH",
            channelIcon: "xyz.jpg",
            channelName: "REEEEEEE",
            channelSubs: "512",
        },
    ];

    return (
        <div id="mainContent">
            <Search />
            <ResultList results={results} />
        </div>
    );
}

export default MainContent;
