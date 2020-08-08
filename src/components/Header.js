import React, { Component } from "react";
import styled from "styled-components";
import About from "./About";

const StyledHeader = styled.header`
    display: flex;
    text-align: left;
    justify-content: space-between;
`;

const H1 = styled.h1`
    font-size: 2rem;
    padding-left: 2%;
`;

const PrimarySpan = styled.span`
    color: #ffce80;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2%;
`;

const NavList = styled.ul`
    display: flex;
    padding: 0;
`;

const NavItem = styled.li`
    text-decoration: none;
    list-style: none;
    cursor: pointer;
    font-weight: bold;
    color: #ffce80;
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
