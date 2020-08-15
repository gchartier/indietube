import styled from "styled-components";

export const Thumbnail = styled.div`
    position: relative;
    align-self: center;
    width: 100%;
`;

export const ThumbnailImage = styled.img`
    width: 100%;
`;

export const ThumbnailTime = styled.div`
    background-color: black;
    position: absolute;
    bottom: 5%;
    right: 3%;
`;

export const Time = styled.p`
    color: white;
    font-size: 0.8rem;
    padding: 4px;
    margin: 0;
`;

export const ResultLink = styled.a`
    color: ${(props) => props.linkColor || "black"};
    text-decoration: ${(props) => props.textDecor || "underline"};
`;
