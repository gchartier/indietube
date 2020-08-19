import React from "react";
import * as ui from "./styles";

export default function Search(props) {
    return (
        <ui.SearchForm
            onSubmit={(event) => {
                event.preventDefault();
                props.onSearchSubmit(event);
            }}
        >
            <ui.InputContainer>
                <ui.InputFields>
                    <ui.SearchInput
                        value={props.searchQuery}
                        onChange={props.onSearchChange}
                    />
                    {props.nonIndieCount > 0 && (
                        <ui.ResultsFiltered>
                            {props.nonIndieCount} results filtered out
                        </ui.ResultsFiltered>
                    )}
                </ui.InputFields>
                <ui.SearchButtonBox>
                    <ui.SearchIcon type="submit" alt="Submit Search" />
                </ui.SearchButtonBox>
            </ui.InputContainer>
        </ui.SearchForm>
    );
}
