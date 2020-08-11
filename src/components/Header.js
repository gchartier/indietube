import React, { Component } from "react";
import styled from "styled-components";
import About from "./About";
import { ADD_TO_FILTER } from "../assets/constants";

const StyledHeader = styled.header`
    display: flex;
    text-align: left;
    justify-content: space-between;
    padding: 2%;
    box-shadow: 0px 5px 11px -4px #899380;
`;

const H1 = styled.h1`
    font-size: 2rem;
    margin: 0;
`;

const PrimarySpan = styled.span`
    color: #f4b400;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
`;

const NavList = styled.ul`
    display: flex;
    padding: 0;
    margin: 0;
`;

const NavItem = styled.li`
    text-decoration: none;
    list-style: none;
    cursor: pointer;
    font-weight: bold;
    color: #f4b400;
    font-size: 1.3rem;
`;

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aboutModalIsOpen: false,
        };
    }

    openAboutModal = () => {
        this.setState({ aboutModalIsOpen: true });
    };

    closeAboutModal = () => {
        this.setState({ aboutModalIsOpen: false });
    };

    render() {
        return (
            <StyledHeader>
                <H1>
                    indie<PrimarySpan>Tube</PrimarySpan>
                </H1>
                <Nav>
                    <button
                        onClick={() => {
                            let items = ADD_TO_FILTER.map((item) =>
                                JSON.stringify(item)
                            );
                            console.log(items.toString());
                        }}
                    >
                        GET LIST
                    </button>
                    <NavList>
                        <NavItem onClick={this.openAboutModal}>About</NavItem>
                    </NavList>
                </Nav>
                {this.state.aboutModalIsOpen && (
                    <About closeHandler={this.closeAboutModal} />
                )}
            </StyledHeader>
        );
    }
}

export default Header;
