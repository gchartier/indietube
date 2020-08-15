import React from "react";
import * as ui from "./styles";

export default function ResultThumbnail(props) {
    return (
        <ui.Thumbnail>
            <ui.ResultLink href={props.videoURL} target="_blank">
                <ui.ThumbnailImage src={props.thumbnailURL} />
            </ui.ResultLink>
            <ui.ThumbnailTime>
                <ui.Time>{props.videoDuration}</ui.Time>
            </ui.ThumbnailTime>
        </ui.Thumbnail>
    );
}
