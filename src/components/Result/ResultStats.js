import React from "react";
import styled from "styled-components";
import * as d3 from "d3-format";
import likesIcon from "../../assets/likes.svg";
import dislikesIcon from "../../assets/dislikes.svg";
import viewsIcon from "../../assets/views.svg";

const Stats = styled.div`
    display: flex;
    width: 100%;
`;

const VideoStatistic = styled.div`
    display: flex;
    align-items: center;
    margin: 3% 5% 3% 0;

    & p {
        margin: 0;
        font-size: 0.7rem;
    }
`;

const StatisticIcon = styled.img`
    margin-left: 0.2rem;
    width: 1rem;
`;

function ResultStats(props) {
    return (
        <Stats>
            <VideoStatistic>
                <p>
                    {props.result.views !== undefined
                        ? d3.formatPrefix(
                              ".1~s",
                              props.result.views
                          )(props.result.views)
                        : 0}
                </p>
                <StatisticIcon src={viewsIcon} />
            </VideoStatistic>
            <VideoStatistic>
                <p>
                    {props.result.likes !== undefined
                        ? d3.formatPrefix(
                              ".1~s",
                              props.result.likes
                          )(props.result.likes)
                        : 0}
                </p>
                <StatisticIcon src={likesIcon} />
            </VideoStatistic>
            <VideoStatistic>
                <p>
                    {props.result.dislikes !== undefined
                        ? d3.formatPrefix(
                              ".1~s",
                              props.result.dislikes
                          )(props.result.dislikes)
                        : 0}
                </p>
                <StatisticIcon src={dislikesIcon} />
            </VideoStatistic>
        </Stats>
    );
}

export default ResultStats;
