import React, { Component } from "react";
import styled from "styled-components";
import optionsMenu from "../../assets/menu.svg";

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

    & a {
        display: block;
        width: 100%;
    }
`;

const ResultLink = styled.a`
    color: ${(props) => props.linkColor || "black"};
    text-decoration: ${(props) => props.textDecor || "underline"};
`;

const MenuButton = styled.button`
    border: none;
    background-color: inherit;
    font-size: inherit;
    width: 100%;
    text-align: left;
    padding: 0;
`;

class OptionsMenu extends Component {
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
            <ResultOptions>
                <MenuIcon
                    src={optionsMenu}
                    alt="Result Options"
                    onClick={this.handleMenuClick}
                />
                {this.state.menuIsVisible && (
                    <Menu ref={this.menuContainer}>
                        <MenuItem onClick={this.handleMenuClick}>
                            <ResultLink
                                href={this.props.videoURL}
                                target="_blank"
                                textDecor="none"
                            >
                                Open with YouTube.com
                            </ResultLink>
                        </MenuItem>
                        <MenuItem onClick={this.handleMenuClick}>
                            <ResultLink
                                href={this.props.channelURL}
                                target="_blank"
                                textDecor="none"
                            >
                                Go to Channel
                            </ResultLink>
                        </MenuItem>
                        <form
                            name="thisIsntIndie"
                            method="POST"
                            data-netlify="true"
                        >
                            <input
                                name="channelId"
                                type="hidden"
                                value={this.props.channel.id}
                            />
                            <input
                                name="channelName"
                                type="hidden"
                                value={this.props.channel.name}
                            />
                            <MenuItem>
                                <MenuButton type="submit">
                                    This isn't indie
                                </MenuButton>
                            </MenuItem>
                        </form>
                    </Menu>
                )}
            </ResultOptions>
        );
    }
}

export default OptionsMenu;
