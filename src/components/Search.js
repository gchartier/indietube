import React from "react";
import searchIcon from "../assets/search.svg";
import styled from "styled-components";

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2%;
    padding: 0 0 2% 0;
    width: 95%;
    max-width: 400px;
`;

const InputContainer = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const SearchInput = styled.input`
    border-radius: 5px;
    border: solid 1px #d3d3d3;
    background-color: white;
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

const SearchDetails = styled.div`
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
            <SearchDetails>
                {props.nonIndieCount > 0 && (
                    <ResultsFiltered>
                        {props.nonIndieCount} Non-indie Videos
                    </ResultsFiltered>
                )}
            </SearchDetails>
        </SearchContainer>
    );
}

export default Search;
