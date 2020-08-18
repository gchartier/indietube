import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    position: relative;
    text-align: left;
    padding: 2%;
    box-shadow: 0px 5px 10px -10px rgba(0, 0, 0, 0.5);
    background-color: ${(props) => props.theme.bgColorPrimary};

    @media (max-width: 594px) {
        flex-wrap: wrap;
    }
`;

export const H1 = styled.h1`
    font-size: 2rem;
    margin: 0;
`;

export const PrimarySpan = styled.span`
    color: ${(props) => props.theme.primaryYellow};
`;

export const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
`;

export const NavList = styled.ul`
    display: flex;
    justify-content: space-around;
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
    white-space: nowrap;
`;

export const StyledLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`;
