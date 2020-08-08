import React from "react";
import styled from "styled-components";

const Thumbnail = styled.div`
    position: relative;
    align-self: center;
    width: 100%;
`;

const ThumbnailImage = styled.img`
    width: 100%;
`;

const ThumbnailTime = styled.div`
    background-color: black;
    position: absolute;
    bottom: 5%;
    right: 3%;
`;

const Time = styled.p`
    color: white;
    font-size: 0.8rem;
    padding: 4px;
    margin: 0;
`;

const ResultLink = styled.a`
    color: ${(props) => props.linkColor || "black"};
    text-decoration: ${(props) => props.textDecor || "underline"};
`;

function ResultThumbnail(props) {
    return (
        <Thumbnail>
            <ResultLink href={props.videoURL} target="_blank">
                <ThumbnailImage src={props.thumbnailURL} />
            </ResultLink>
            <ThumbnailTime>
                <Time>{props.videoDuration}</Time>
            </ThumbnailTime>
        </Thumbnail>
    );
}

export default ResultThumbnail;
