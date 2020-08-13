import React, { useEffect } from "react";
import VideoResult from "./result/VideoResult";
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

    useEffect(() => {
        if (props.isSearch === true) window.scrollTo(0, 0);
    }, [props.isSearch]);

    return (
        <StyledResults ref={scrollRef}>
            {props.results.map((result) => {
                return <VideoResult key={result.id} result={result} />;
            })}
        </StyledResults>
    );
}

export default ResultList;
