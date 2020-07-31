import React from "react";
import VideoResult from "./VideoResult";
import styled from "styled-components";

const StyledResults = styled.div`
    background-color: white;
    width: 95%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function ResultList(props) {
    return (
        <StyledResults>
            {props.results.map((result) => {
                return (
                    <VideoResult
                        key={result.id}
                        title={result.title}
                        thumbnail={result.thumbnail}
                        duration={result.duration}
                        views={result.views}
                        likes={result.likes}
                        dislikes={result.dislikes}
                        channel={result.channel}
                    />
                );
            })}
        </StyledResults>
    );
}

export default ResultList;
