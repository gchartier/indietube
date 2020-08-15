import React from "react";
import { CHANNEL_URL, VIDEO_URL } from "../../../utilities/constants.js";
import ResultThumbnail from "../result-thumbnail/ResultThumbnail";
import ResultDetails from "../result-details/ResultDetails";
import * as ui from "./styles";

export default function VideoResult(props) {
    return (
        <ui.ResultContainer>
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
        </ui.ResultContainer>
    );
}
