import styled from "styled-components";

export const StyledFooter = styled.footer`
    text-align: center;
    font-size: 1.2rem;
    background-color: ${(props) => props.theme.bgColorPrimary};
    padding: 2%;
    box-shadow: 0px -5px 10px -10px rgba(0, 0, 0, 0.5);
`;

export const P = styled.p`
    font-weight: bold;
    font-size: calc(15px + (18 - 15) * ((100vw - 300px) / (1600 - 300)));
    margin: 0;
`;

export const FlexContainer = styled.span`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export const SiteLink = styled.a`
    color: ${(props) => props.color || "black"};
`;
