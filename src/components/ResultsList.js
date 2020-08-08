import React from "react";
import VideoResult from "./Result/Result";
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
                return <VideoResult key={result.id} result={result} />;
            })}
        </StyledResults>
    );
}

export default ResultList;
