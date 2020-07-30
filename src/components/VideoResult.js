import React from "react";
import styled from "styled-components";
import optionsMenu from "../assets/menuIcon.svg";

const ResultContainer = styled.div`
    width: 90%;
    border-radius: 25px;
    border: 1px solid black;
    background-color: white;
    margin: 3% 0 3% 0;
    padding-top: 4%;
`;

const ResultThumbnail = styled.div`
    text-align: center;
    position: relative;
`;

const ThumbnailImage = styled.img`
    width: 95%;
    height: 200px;
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

const ChannelDetails = styled.div`
    display: flex;
    align-items: center;
    margin-left: 5%;
`;

const ChannelImage = styled.img`
    height: 40px;
    width: 40px;
    border-radius: 50%;
`;

const Title = styled.p`
    font-size: 1.5rem;
    margin: 0;
    margin-left: 5%;
`;

const ResultStats = styled.div`
    display: flex;
    argin: 0;
    margin-left: 5%;
`;

const ResultOptions = styled.div``;

const MenuIcon = styled.img``;

const Menu = styled.ul`
    background-color: green;
`;

function VideoResult(props) {
    return (
        <ResultContainer>
            <ResultThumbnail>
                <ThumbnailImage src={props.thumbnail.url} />
                <ThumbnailTime>
                    <Time>{props.thumbnail.time}</Time>
                </ThumbnailTime>
            </ResultThumbnail>
            <ChannelDetails key={props.channel.id}>
                <ChannelImage src={props.channel.icon} alt="Channel Icon" />
                <p>
                    {props.channel.name} - {props.channel.subs}
                </p>
            </ChannelDetails>
            <Title>{props.title}</Title>
            <ResultStats>
                <p>{props.views} Views &nbsp;</p>
                <p>{props.likes} Likes &nbsp;</p>
                <p>{props.dislikes} Dislikes</p>
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
        </ResultContainer>
    );
}

export default VideoResult;
