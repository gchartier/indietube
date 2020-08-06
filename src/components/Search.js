import React from "react";
import searchIcon from "../assets/search.svg";
import styled from "styled-components";

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

const InputContainer = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const SearchInput = styled.input`
    border-radius: 10px;
    border: solid #ffce80 1.5px;
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
    padding: 10px;
    width: 70%;
    height: 1rem;
    font-size: 1.5rem;
`;

const SearchIcon = styled.button`
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

const ResultsContainer = styled.div`
    display: flex;
    width: 100%;
`;

const ResultsFiltered = styled.p`
    font-size: 0.9rem;
    padding: 0;
    margin: 2% 0 0 5%;
`;

function Search(props) {
    return (
        <SearchContainer>
            <InputContainer onSubmit={props.onSearchSubmit}>
                <SearchInput
                    value={props.searchQuery}
                    onChange={props.onSearchChange}
                />
                <SearchIcon type="submit" alt="Submit Search" />
            </InputContainer>
            <ResultsContainer>
                <ResultsFiltered>
                    {props.nonIndieCount} Non-indie Videos
                </ResultsFiltered>
            </ResultsContainer>
        </SearchContainer>
    );
}

export default Search;
