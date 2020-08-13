import React from "react";
import styled from "styled-components";
import { CHANNEL_URL, VIDEO_URL } from "../../services/constants.js";
import ResultThumbnail from "./ResultThumbnail";
import ResultDetails from "./ResultDetails";

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    min-width: 280px;
    max-width: 300px;
    border-radius: 5px;
    border: 0 solid black;
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
    background-color: white;
    margin: 10px;
    padding: 10px;
`;

function VideoResult(props) {
    return (
        <ResultContainer>
            <ResultThumbnail
                videoURL={VIDEO_URL + props.result.id}
                thumbnailURL={props.result.thumbnail.url}
                videoDuration={props.result.duration}
            />
            <ResultDetails
                videoURL={VIDEO_URL + props.result.id}
                channelURL={CHANNEL_URL + props.result.channel.id}
                result={props.result}
            />
        </ResultContainer>
    );
}

export default VideoResult;
