import styled from "styled-components"
import searchIcon from "../../assets/search.svg"

export const SearchForm = styled.form`
    width: 100%;
    background-color: ${(props) => props.theme.bgColorPrimary};
    align-self: center;
    @media (max-width: 594px) {
        order: 3;
        padding: 3% 0;
        padding-bottom: 0;
    }
`

export const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95%;
    margin: 0 auto;
    @media (max-width: 594px) {
        flex-wrap: wrap;
    }
`

export const SearchInput = styled.input`
    border-radius: 5px;
    border: solid 1px ${(props) => props.theme.borderColor};
    background-color: ${(props) => props.theme.bgColorPrimary};
    box-shadow: 0 6px 24px 2px rgba(0, 0, 0, 0.14);
    height: 1.7rem;
    max-width: 450px;
    width: 75%;
    font-size: large;
`

export const SearchIcon = styled.button`
    cursor: pointer;
    background-image: url(${searchIcon});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border: none;
    width: 1.7rem;
    height: 1.7rem;
    background-color: transparent;
    margin: 0;
    padding: 0;
`

export const SearchButtonBox = styled.div`
    margin: 0 1% 0 2%;
    align-self: flex-start;
`

export const ResultsFiltered = styled.p`
    min-width: 0;
    font-size: 0.9rem;
    padding: 0 0.5rem;
    margin: 0;
    white-space: nowrap;
    @media (max-width: 594px) {
        padding-top: 1rem;
        padding-bottom: 0;
    }
`
