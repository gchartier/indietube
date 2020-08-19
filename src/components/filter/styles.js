import styled from "styled-components";

export const FilterListContainer = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: ${(props) => props.theme.bgColorSecondary};
`;

export const FilterList = styled.ul`
    list-style-type: circle;
`;
