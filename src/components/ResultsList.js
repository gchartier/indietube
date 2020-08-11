import React from "react";
import VideoResult from "./Result/Result";
import styled from "styled-components";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

const StyledResults = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    flex-grow: 1;
    flex-wrap: wrap;
    width: 100%;
    min-height: 0;
    overflow: scroll;
    background-color: whitesmoke;
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
