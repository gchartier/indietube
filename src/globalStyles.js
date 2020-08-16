import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Fira Sans', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

export const StyledApp = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    height: 100vh;
`;
