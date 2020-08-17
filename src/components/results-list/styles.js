import styled from "styled-components";

export const StyledResults = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    flex-grow: 1;
    flex-wrap: wrap;
    width: 100%;
    min-height: 0;
    overflow: scroll;
    background-color: ${(props) => props.theme.bgColorSecondary};
`;
