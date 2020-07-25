import React from "react";
import VideoResult from "./VideoResult";
import styled from "styled-components";

function ResultList(props) {
    const StyledResults = styled.div`
        background-color: white;
        width: 95%;
        max-width: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
    `;

    return (
        <StyledResults>
            {props.results.map((result) => {
                return (
                    <VideoResult
                        title={result.title}
                        thumbnailSrc={result.thumbnailSrc}
                        thumbnailTime={result.thumbnailTime}
                        views={result.views}
                        likes={result.likes}
                        dislikes={result.dislikes}
                        channelIcon={result.channelIcon}
                        channelName={result.channelName}
                        channelSubs={result.channelSubs}
                    />
                );
            })}
        </StyledResults>
    );
}

export default ResultList;
