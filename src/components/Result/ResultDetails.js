import React from "react";
import dividerIcon from "../../assets/divider.svg";
import moment from "moment";
import styled from "styled-components";
import OptionsMenu from "./OptionsMenu";
import ResultStats from "./ResultStats";

const ChannelName = styled.p`
    margin: 0;
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Title = styled.p`
    font-size: 1rem;
    margin: 0;
`;

const FlexContainer = styled.div`
    display: flex;
    align-items: ${(props) => props.alignItems || "center"};
    justify-content: ${(props) => props.justifyContent || "flex-start"};
`;

const PublishDate = styled.p`
    margin: 0;
    font-size: 0.8rem;
`;

const Divider = styled.img`
    width: 0.5rem;
    margin: 0 0.5rem 0 0.5rem;
`;

const ResultLink = styled.a`
    color: ${(props) => props.linkColor || "black"};
    text-decoration: ${(props) => props.textDecor || "underline"};
`;

function ResultDetails(props) {
    return (
        <div>
            <Title>
                <ResultLink
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
                </ResultLink>
            </Title>
            <FlexContainer>
                <ChannelName>
                    {"by "}
                    <ResultLink href={props.channelURL} target="_blank">
                        {props.result.channel.name}
                    </ResultLink>
                </ChannelName>
                <Divider src={dividerIcon} />
                <PublishDate>
                    {moment.utc(props.result.publishDate).fromNow()}
                </PublishDate>
            </FlexContainer>
            <FlexContainer justifyContent="space-between">
                <ResultStats result={props.result} />
                <OptionsMenu
                    videoURL={props.videoURL}
                    channelURL={props.channelURL}
                    channel={props.result.channel}
                />
            </FlexContainer>
        </div>
    );
}

export default ResultDetails;
