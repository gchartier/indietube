import React, { Component } from "react";
import styled from "styled-components";
import optionsMenu from "../assets/menu.svg";
import likesIcon from "../assets/likes.svg";
import dislikesIcon from "../assets/dislikes.svg";
import viewsIcon from "../assets/views.svg";

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    border-radius: 25px;
    border: 1px solid black;
    background-color: white;
    margin: 3% 0 3% 0;
    padding: 3% 3% 0 3%;
`;

const ResultThumbnail = styled.div`
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
    right: 5%;
`;

const Time = styled.p`
    color: white;
    font-size: 0.8rem;
    padding: 3px;
    margin: 0;
`;

const ChannelName = styled.p`
    margin: 0;
`;

const Title = styled.p`
    font-size: 1.5rem;
    margin: 0;
`;

const ResultStats = styled.div`
    display: flex;
`;

const ResultOptions = styled.div`
    align-self: flex-end;
`;

const MenuIcon = styled.img`
    padding: 20px;
    width: 0.5rem;
`;

const Menu = styled.ul`
    background-color: green;
    display: none;
`;

const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const VideoStatistic = styled.div`
    display: flex;
    margin: 15px;
`;

const StatisticIcon = styled.img`
    margin-left: 0.2rem;
`;

class VideoResult extends Component(props) {
    constructor(props) {
        this.state = {
            menuIsVisible: false,
        };

        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    render(props) {
        <ResultContainer>
            <ResultThumbnail>
                <ThumbnailImage src={props.thumbnail.url} />
                <ThumbnailTime>
                    <Time>{props.duration}</Time>
                </ThumbnailTime>
            </ResultThumbnail>
            <Title>{props.title}</Title>
            <ChannelName key={props.channel.id}>
                {props.channel.name}
            </ChannelName>
            <FlexContainer>
                <ResultStats>
                    <VideoStatistic>
                        <p>{props.views}</p>
                        <StatisticIcon src={viewsIcon} />
                    </VideoStatistic>
                    <VideoStatistic>
                        <p>{props.likes}</p>
                        <StatisticIcon src={likesIcon} />
                    </VideoStatistic>
                    <VideoStatistic>
                        <p>{props.dislikes}</p>
                        <StatisticIcon src={dislikesIcon} />
                    </VideoStatistic>
                </ResultStats>
                <ResultOptions>
                    <MenuIcon src={optionsMenu} alt="Result Options" />
                    <Menu>
                        <li>Copy URL</li>
                        <li>Open With YouTube.com</li>
                        <li>Go to Channel</li>
                        <li>This is not an indie creator</li>
                    </Menu>
                </ResultOptions>
            </FlexContainer>
        </ResultContainer>;
    }
}

function showMenu() {}

export default VideoResult;
