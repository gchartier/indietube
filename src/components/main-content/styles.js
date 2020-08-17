import styled from "styled-components";

export const StyledMainContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    background-color: ${(props) => props.theme.bgColorSecondary};
    min-height: 0;
    width: 100%;
`;
