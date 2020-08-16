import styled from "styled-components";

export const StyledHeader = styled.header`
    display: flex;
    position: relative;
    text-align: left;
    justify-content: space-between;
    padding: 2%;
    box-shadow: 0px 5px 10px -10px rgba(0, 0, 0, 0.5);

    @media (max-width: 500px) {
        flex-wrap: wrap;
    }
`;

export const H1 = styled.h1`
    font-size: 2rem;
    margin: 0;
`;

export const PrimarySpan = styled.span`
    color: #f4b400;
`;

export const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
`;

export const NavList = styled.ul`
    display: flex;
    padding: 0;
    margin: 0;
`;

export const NavItem = styled.li`
    text-decoration: none;
    list-style: none;
    cursor: pointer;
    font-weight: bold;
    color: #f4b400;
    font-size: 1.3rem;
`;
