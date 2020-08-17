import React, { useState } from "react";
import { useMediaPredicate } from "react-media-hook";
import * as ui from "./styles";
import About from "../about/About";
import Search from "../search/Search";
import HamburgerMenu from "../hamburger-menu/HamburgerMenu";

export default function Header(props) {
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const isMobile = useMediaPredicate("(max-width: 400px)");

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
            {isMobile ? (
                <HamburgerMenu />
            ) : (
                <ui.Nav>
                    <ui.NavList>
                        <ui.NavItem onClick={() => setIsAboutModalOpen(true)}>
                            About
                        </ui.NavItem>
                    </ui.NavList>
                </ui.Nav>
            )}

            {isAboutModalOpen && (
                <About closeHandler={() => setIsAboutModalOpen(false)} />
            )}
        </ui.StyledHeader>
    );
}
