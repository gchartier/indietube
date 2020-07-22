import React from "react";

function Search() {
    return (
        <div id="search">
            <input id="searchInput"></input>
            <img
                src="../assets/searchIcon.svg"
                id="searchIcon"
                alt="Submit Search"
            />
            <p>0 Results</p>
        </div>
    );
}

export default Search;
