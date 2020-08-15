import styled from "styled-components";

export const SubHeading = styled.h2`
    font-size: 1.5rem;
    ${(props) => props.isCenter && "text-align: center;"}
`;
