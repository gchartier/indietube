import styled from "styled-components";

export const ChannelName = styled.p`
    margin: 0;
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const Title = styled.p`
    font-size: 1rem;
    margin: 0;
`;

export const FlexContainer = styled.div`
    display: flex;
    align-items: ${(props) => props.alignItems || "center"};
    justify-content: ${(props) => props.justifyContent || "flex-start"};
`;

export const PublishDate = styled.p`
    margin: 0;
    font-size: 0.8rem;
`;

export const Divider = styled.img`
    width: 0.5rem;
    margin: 0 0.5rem 0 0.5rem;
`;

export const ResultLink = styled.a`
    color: ${(props) => props.linkColor || "black"};
    text-decoration: ${(props) => props.textDecor || "underline"};
`;
