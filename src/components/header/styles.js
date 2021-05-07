import styled from "styled-components"
import { Link } from "react-router-dom"

export const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    text-align: left;
    padding: 2%;
    box-shadow: 0px 5px 10px -10px rgba(0, 0, 0, 0.5);
    background-color: ${(props) => props.theme.bgColorPrimary};

    @media (max-width: 594px) {
        flex-wrap: wrap;
    }
`

export const H1 = styled.h1`
    font-size: 1.5rem;
    margin: 0 2%;
`

export const PrimarySpan = styled.span`
    color: ${(props) => props.theme.primaryYellow};
`

export const Nav = styled.nav`
    display: flex;
    margin: 0 2%;
`

export const NavList = styled.ul`
    display: flex;
    justify-content: space-around;
    padding: 0;
    margin: 0;
    width: 100%;
`

export const NavItem = styled.li`
    text-decoration: none;
    list-style: none;
    cursor: pointer;
    font-weight: bold;
    font-size: ${(props) => props.theme.navLinkSize};
    white-space: nowrap;
    padding: 0 5%;
    color: ${(props) => props.theme.primaryYellow};
    &:hover {
        color: black;
    }
`

export const StyledLink = styled(Link)`
    color: inherit;
`
