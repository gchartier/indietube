import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Fira Sans', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

export const StyledApp = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

export const lightTheme = {
    bgColorPrimary: "white",
    bgColorSecondary: "whitesmoke",
    primaryYellow: "#f4b400",
    primaryYellowDark: "#dba200",
    accentYellow: "#ffce80",
    primaryGreen: "#0F9D58",
    primaryBlue: "#4285F4",
    primaryRed: "#DB4437",
    borderColor: "#d3d3d3",
    menuColor: "#f7f7f7",
    menuColorHover: "#ededed",
    navLinkSize: "1.5rem",
};

export const darkTheme = {
    backgroundColorPrimary: "white",
    backgroundColorSecondary: "whitesmoke",
};
