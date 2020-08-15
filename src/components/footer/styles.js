import styled from "styled-components";

export const StyledFooter = styled.footer`
    text-align: center;
    font-size: 1.2rem;
    background-color: white;
    padding: 2%;
`;

export const P = styled.p`
    font-weight: bold;
    font-size: calc(12px + (18 - 12) * ((100vw - 300px) / (1600 - 300)));
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
