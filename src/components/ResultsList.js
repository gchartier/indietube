import React from "react";
import VideoResult from "./Result/Result";
import styled from "styled-components";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

const StyledResults = styled.div`
    background-color: #e6e6e6;
    width: 75%;
    min-width: 300px;
    max-height: 500px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function ResultList(props) {
    const scrollRef = useBottomScrollListener(() => props.scrollHandler());

    return (
        <StyledResults ref={scrollRef}>
            {props.results.map((result) => {
                return <VideoResult key={result.id} result={result} />;
            })}
        </StyledResults>
    );
}

export default ResultList;
