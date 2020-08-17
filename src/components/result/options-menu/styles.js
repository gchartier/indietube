import styled from "styled-components";

export const ResultOptions = styled.div`
    position: relative;
    align-self: flex-end;
`;

export const MenuIcon = styled.img`
    padding: 0;
    width: 0.4rem;
`;

export const Menu = styled.ul`
    position: absolute;
    bottom: 100%;
    right: 0;
    white-space: nowrap;
    padding: 10px 0 10px 0;
    margin: 0;
    z-index: 2;
    border: 1px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
    background-color: ${(props) => props.theme.menuColor};
`;

export const MenuItem = styled.li`
    list-style-type: none;
    padding: 8px;

    &:hover {
        background-color: ${(props) => props.theme.menuColorHover};
    }

    & a {
        display: block;
        width: 100%;
    }
`;

export const ResultLink = styled.a`
    color: ${(props) => props.linkColor || "black"};
    text-decoration: ${(props) => props.textDecor || "underline"};
`;

export const MenuButton = styled.button`
    border: none;
    background-color: inherit;
    font-size: inherit;
    width: 100%;
    text-align: left;
    padding: 0;
`;
