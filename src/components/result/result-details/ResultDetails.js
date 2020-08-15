import React from "react";
import moment from "moment";
import * as ui from "./styles";
import dividerIcon from "../../../assets/divider.svg";
import OptionsMenu from "../options-menu/OptionsMenu";
import ResultStats from "../result-stats/ResultStats";

export default function ResultDetails(props) {
    return (
        <React.Fragment>
            <ui.Title>
                <ui.ResultLink
                    href={props.videoURL}
                    target="_blank"
                    textDecor="none"
                >
                    {
                        new DOMParser().parseFromString(
                            props.result.title,
                            "text/html"
                        ).documentElement.textContent
                    }
                </ui.ResultLink>
            </ui.Title>
            <ui.FlexContainer>
                <ui.ChannelName>
                    {"by "}
                    <ui.ResultLink href={props.channelURL} target="_blank">
                        {props.result.channel.name}
                    </ui.ResultLink>
                </ui.ChannelName>
                <ui.Divider src={dividerIcon} />
                <ui.PublishDate>
                    {moment.utc(props.result.publishDate).fromNow()}
                </ui.PublishDate>
            </ui.FlexContainer>
            <ui.FlexContainer justifyContent="space-between">
                <ResultStats result={props.result} />
                <OptionsMenu
                    videoURL={props.videoURL}
                    channelURL={props.channelURL}
                    channel={props.result.channel}
                />
            </ui.FlexContainer>
        </React.Fragment>
    );
}
