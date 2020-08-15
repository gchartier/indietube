import React from "react";
import * as d3 from "d3-format";
import likesIcon from "../../../assets/likes.svg";
import dislikesIcon from "../../../assets/dislikes.svg";
import viewsIcon from "../../../assets/views.svg";
import * as ui from "./styles";

export default function ResultStats(props) {
    return (
        <ui.Stats>
            <ui.VideoStatistic>
                <p>
                    {props.result.views !== undefined
                        ? d3.formatPrefix(
                              ".1~s",
                              props.result.views
                          )(props.result.views)
                        : 0}
                </p>
                <ui.StatisticIcon src={viewsIcon} />
            </ui.VideoStatistic>
            <ui.VideoStatistic>
                <p>
                    {props.result.likes !== undefined
                        ? d3.formatPrefix(
                              ".1~s",
                              props.result.likes
                          )(props.result.likes)
                        : 0}
                </p>
                <ui.StatisticIcon src={likesIcon} />
            </ui.VideoStatistic>
            <ui.VideoStatistic>
                <p>
                    {props.result.dislikes !== undefined
                        ? d3.formatPrefix(
                              ".1~s",
                              props.result.dislikes
                          )(props.result.dislikes)
                        : 0}
                </p>
                <ui.StatisticIcon src={dislikesIcon} />
            </ui.VideoStatistic>
        </ui.Stats>
    );
}
