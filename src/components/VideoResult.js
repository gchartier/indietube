import React, { Component } from "react";
import styled from "styled-components";
import optionsMenu from "../assets/menu.svg";
import likesIcon from "../assets/likes.svg";
import dislikesIcon from "../assets/dislikes.svg";
import viewsIcon from "../assets/views.svg";
import dividerIcon from "../assets/divider.svg";
import moment from "moment";
import * as d3 from "d3-format";

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    border-radius: 15px;
    border: 1px solid black;
    background-color: white;
    margin: 3% 0 3% 0;
    padding: 3%;
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
    right: 3%;
`;

const Time = styled.p`
    color: white;
    font-size: 0.8rem;
    padding: 4px;
    margin: 0;
`;

const ChannelName = styled.p`
    margin: 0;
    font-size: 0.8rem;
`;

const Title = styled.p`
    font-size: 1.2rem;
    margin: 0;
`;

const ResultStats = styled.div`
    display: flex;
    width: 100%;
`;

const ResultOptions = styled.div`
    position: relative;
    align-self: flex-end;
`;

const MenuIcon = styled.img`
    padding: 0;
    width: 0.4rem;
`;

const Menu = styled.ul`
    position: absolute;
    bottom: 100%;
    right: 0;
    white-space: nowrap;
    padding: 10px 0 10px 0;
    margin: 0;
    z-index: 2;
    border: 1px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
    background-color: #f7f7f7;
`;

const MenuItem = styled.li`
    list-style-type: none;
    padding: 8px;

    &:hover {
        background-color: #ededed;
    }
`;

const FlexContainer = styled.div`
    display: flex;
    align-items: ${(props) => props.alignItems || "center"};
    justify-content: ${(props) => props.justifyContent || "flex-start"};
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

const PublishDate = styled.p`
    margin: 0;
    font-size: 0.8rem;
`;

const Divider = styled.img`
    width: 0.5rem;
    margin: 0 0.5rem 0 0.5rem;
`;

class VideoResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuIsVisible: false,
        };

        this.menuContainer = React.createRef();

        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleMenuClick = () => {
        this.setState((state) => {
            return {
                menuIsVisible: !state.menuIsVisible,
            };
        });
    };

    handleClickOutside = (event) => {
        if (
            this.menuContainer.current &&
            !this.menuContainer.current.contains(event.target)
        ) {
            this.setState({
                menuIsVisible: false,
            });
        }
    };

    render() {
        return (
            <ResultContainer>
                <ResultThumbnail>
                    <ThumbnailImage src={this.props.result.thumbnail.url} />
                    <ThumbnailTime>
                        <Time>{this.props.result.duration}</Time>
                    </ThumbnailTime>
                </ResultThumbnail>
                <Title>{this.props.result.title}</Title>
                <FlexContainer>
                    <ChannelName key={this.props.result.channel.id}>
                        {"by " + this.props.result.channel.name}
                    </ChannelName>
                    <Divider src={dividerIcon} />
                    <PublishDate>
                        {moment.utc(this.props.result.publishDate).fromNow()}
                    </PublishDate>
                </FlexContainer>
                <FlexContainer justifyContent="space-between">
                    <ResultStats>
                        <VideoStatistic>
                            <p>
                                {d3.formatPrefix(
                                    ".1~s",
                                    this.props.result.views
                                )(this.props.result.views)}
                            </p>
                            <StatisticIcon src={viewsIcon} />
                        </VideoStatistic>
                        <VideoStatistic>
                            <p>
                                {d3.formatPrefix(
                                    ".1~s",
                                    this.props.result.likes
                                )(this.props.result.likes)}
                            </p>
                            <StatisticIcon src={likesIcon} />
                        </VideoStatistic>
                        <VideoStatistic>
                            <p>
                                {d3.formatPrefix(
                                    ".1~s",
                                    this.props.result.dislikes
                                )(this.props.result.dislikes)}
                            </p>
                            <StatisticIcon src={dislikesIcon} />
                        </VideoStatistic>
                    </ResultStats>
                    <ResultOptions>
                        <MenuIcon
                            src={optionsMenu}
                            alt="Result Options"
                            onClick={this.handleMenuClick}
                        />
                        {this.state.menuIsVisible && (
                            <Menu ref={this.menuContainer}>
                                <MenuItem>Copy URL</MenuItem>
                                <MenuItem>Open With YouTube.com</MenuItem>
                                <MenuItem>Go to Channel</MenuItem>
                                <MenuItem>
                                    This is not an indie creator
                                </MenuItem>
                            </Menu>
                        )}
                    </ResultOptions>
                </FlexContainer>
            </ResultContainer>
        );
    }
}

function showMenu() {}

export default VideoResult;
