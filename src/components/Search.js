import React from "react";
import searchIcon from "../assets/searchIcon.svg";
import styled from "styled-components";

function Search() {
    const SearchContainer = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 2%;
        padding: 25px 0 25px 0;
        width: 50%;
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
        background-color: white;
        border-bottom: 1px solid black;
    `;

    const SearchInput = styled.input`
        border-radius: 25px;
        border: solid black 2.5px;
        padding: 10px;
        width: 40%;
        height: 2rem;
        font-size: 1.5rem;
    `;

    const SearchIcon = styled.img`
        width: 1.8rem;
        margin: 0 2% 0 2%;
        cursor: pointer;
    `;

    const SearchResults = styled.p`
        font-size: 1.5rem;
    `;

    return (
        <SearchContainer>
            <SearchInput />
            <SearchIcon src={searchIcon} alt="Submit Search" />
            <SearchResults>0 Results</SearchResults>
        </SearchContainer>
    );
}

export default Search;
