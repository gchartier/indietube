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
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
`;

function ResultList(props) {
    return (
        <StyledResults>
            {props.results.map((result) => {
                return <VideoResult result={result} />;
            })}
        </StyledResults>
    );
}

export default ResultList;
