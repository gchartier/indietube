import styled from "styled-components";
import searchIcon from "../../assets/search.svg";

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: white;

    @media (max-width: 500px) {
        order: 3;
        padding: 3% 0;
    }
`;

export const InputContainer = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const SearchInput = styled.input`
    border-radius: 5px;
    border: solid 1px #d3d3d3;
    background-color: white;
    box-shadow: 0 6px 24px 2px rgba(0, 0, 0, 0.14);
    padding: 10px;
    width: 70%;
    max-width: 500px;
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
`;

export const SearchDetails = styled.div`
    display: flex;
    width: 100%;
`;

export const ResultsFiltered = styled.p`
    font-size: 0.9rem;
    padding: 0;
    margin: 2% 0 0 5%;
`;
