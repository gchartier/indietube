import React, { useState } from "react";
import * as ui from "./styles";
import About from "../about/About";
import Search from "../search/Search";

export default function Header(props) {
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

    return (
        <ui.StyledHeader>
            <ui.H1>
                indie<ui.PrimarySpan>Tube</ui.PrimarySpan>
            </ui.H1>
            <Search
                searchQuery={props.searchQuery}
                onSearchChange={(event) =>
                    props.handleSearchQueryChange(event.target.value)
                }
                onSearchSubmit={props.handleSearchQuerySubmit}
                nonIndieCount={props.nonIndieCount}
            />
            <ui.Nav>
                <ui.NavList>
                    <ui.NavItem onClick={() => setIsAboutModalOpen(true)}>
                        About
                    </ui.NavItem>
                </ui.NavList>
            </ui.Nav>
            {isAboutModalOpen && (
                <About closeHandler={() => setIsAboutModalOpen(false)} />
            )}
        </ui.StyledHeader>
    );
}
