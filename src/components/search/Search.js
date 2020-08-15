import React from "react";
import * as ui from "./styles";

export default function Search(props) {
    return (
        <ui.SearchContainer>
            <ui.InputContainer onSubmit={props.onSearchSubmit}>
                <ui.SearchInput
                    value={props.searchQuery}
                    onChange={props.onSearchChange}
                />
                <ui.SearchIcon type="submit" alt="Submit Search" />
            </ui.InputContainer>
            <ui.SearchDetails>
                {props.nonIndieCount > 0 && (
                    <ui.ResultsFiltered>
                        {props.nonIndieCount} videos filtered out
                    </ui.ResultsFiltered>
                )}
            </ui.SearchDetails>
        </ui.SearchContainer>
    );
}
