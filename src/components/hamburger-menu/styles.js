import styled from "styled-components";
import { animated } from "react-spring";
import { Link } from "react-router-dom";

export const Icon = styled.img`
    position: relative;
    z-index: 1020;
    width: 15%;
`;

export const NavDrawer = styled(animated.div)`
    position: absolute;
    z-index: 1010;
    background-color: ${(props) => props.theme.menuColor};
    top: 0;
    right: 0;
    width: 75%;
    height: 100vh;
    box-shadow: -8px 0px 16px -6px rgba(0, 0, 0, 0.75);
`;

export const Overlay = styled(animated.div)`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
    transition: opacity 200ms;
`;

export const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    height: 100%;
`;

export const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
`;

export const NavItem = styled.li`
    text-decoration: none;
    list-style: none;
    cursor: pointer;
    font-weight: bold;
    color: ${(props) => props.theme.primaryYellow};
    font-size: 1.3rem;
    margin: 10% 0;
`;

export const StyledLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`;
