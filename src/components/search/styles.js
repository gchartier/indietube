import styled from "styled-components";
import searchIcon from "../../assets/search.svg";

export const SearchForm = styled.form`
    width: 100%;
    background-color: ${(props) => props.theme.bgColorPrimary};

    @media (max-width: 594px) {
        order: 3;
        padding: 3% 0;
    }
`;

export const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const InputFields = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: 60%;
`;

export const SearchInput = styled.input`
    border-radius: 5px;
    border: solid 1px ${(props) => props.theme.borderColor};
    background-color: ${(props) => props.theme.bgColorPrimary};
    box-shadow: 0 6px 24px 2px rgba(0, 0, 0, 0.14);
    padding: 10px;
    height: 1rem;
    font-size: 1.5rem;
`;

export const SearchIcon = styled.button`
    margin: 0 2% 0 2%;
    cursor: pointer;
    background-image: url(${searchIcon});
    background-size: cover;
    background-repeat: no-repeat;
    border: none;
    width: 2.2rem;
    height: 2.2rem;
    background-color: transparent;
    align-self: flex-start;
`;

export const ResultsFiltered = styled.p`
    min-width: 0;
    font-size: 0.9rem;
    padding: 2% 0 0 0;
    margin: 0;
`;
