import React from "react";
import searchIcon from "../assets/searchIcon.svg";
import styled from "styled-components";

function Search() {
    const SearchContainer = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 2%;
        padding: 5% 0 5% 0;
        width: 95%;
        max-width: 500px;
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
        background-color: white;
        border-bottom: 1px solid black;
    `;

    const InputContainer = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    `;

    const SearchInput = styled.input`
        border-radius: 25px;
        border: solid black 2.5px;
        padding: 10px;
        width: 70%;
        height: 1rem;
        font-size: 1.5rem;
    `;

    const SearchIcon = styled.img`
        width: 1.8rem;
        margin: 0 2% 0 2%;
        cursor: pointer;
    `;

    const ResultsContainer = styled.div`
        display: flex;
        justify-content: space-evenly;
        width: 100%;
    `;

    const SearchResults = styled.p`
        font-size: 1.3rem;
        padding: 0;
        margin: 2% 0 0 0;
    `;

    const ResultsFiltered = styled.p`
        font-size: 1.3rem;
        padding: 0;
        margin: 2% 0 0 0;
    `;

    return (
        <SearchContainer>
            <InputContainer>
                <SearchInput />
                <SearchIcon src={searchIcon} alt="Submit Search" />
            </InputContainer>
            <ResultsContainer>
                <SearchResults>2 Results</SearchResults>
                <ResultsFiltered>5 Filtered</ResultsFiltered>
            </ResultsContainer>
        </SearchContainer>
    );
}

export default Search;
