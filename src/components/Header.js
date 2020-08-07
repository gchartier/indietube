import React, { Component } from "react";
import styled from "styled-components";
import Menu from "react-burger-menu/lib/menus/slide";

const StyledHeader = styled.header`
    text-align: left;
`;

const H1 = styled.h1`
    font-size: 2rem;
    padding-left: 2%;
`;

const PrimarySpan = styled.span`
    color: #ffce80;
`;

var menuStyles = {
    bmBurgerButton: {
        position: "absolute",
        width: "36px",
        height: "30px",
        right: "36px",
        top: "30px",
    },
    bmBurgerBars: {
        background: "#373a47",
    },
    bmCrossButton: {
        height: "24px",
        width: "24px",
    },
    bmCross: {
        background: "#bdc3c7",
    },
    bmMenuWrap: {
        position: "fixed",
        height: "100%",
    },
    bmMenu: {
        background: "#373a47",
        padding: "2.5em 1.5em 0",
        fontSize: "1.15em",
    },
    bmMorphShape: {
        fill: "#373a47",
    },
    bmItemList: {
        color: "#b8b7ad",
        padding: "0.8em",
    },
    bmItem: {
        display: "inline-block",
        color: "#ffce80",
        fontSize: "1.5rem",
        cursor: "pointer",
    },
    bmOverlay: {
        height: "100vh",
        background: "rgba(0, 0, 0, 0.3)",
    },
};

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
        };
    }

    handleStateChange(state) {
        this.setState({ menuOpen: state.isOpen });
    }

    closeMenu() {
        this.setState({ menuOpen: false });
    }

    openAbout() {
        this.setState((state) => ({ menuOpen: !state.menuOpen }));
    }

    render() {
        return (
            <StyledHeader>
                <H1>
                    indie<PrimarySpan>Tube</PrimarySpan>
                </H1>
                <Menu
                    right
                    styles={menuStyles}
                    isOpen={this.state.menuOpen}
                    onStateChange={(state) => this.handleStateChange(state)}
                >
                    <a
                        id="About"
                        className="menu-item"
                        onClick={() => this.closeMenu()}
                    >
                        About
                    </a>
                </Menu>
            </StyledHeader>
        );
    }
}

export default Header;
