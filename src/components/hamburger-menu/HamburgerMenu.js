import React, { useState, Fragment } from "react";
import * as ui from "./styles";
import { useTransition, animated } from "react-spring";
import hamburgerMenuBlack from "../../assets/hamburgerMenu-black.svg";
import hamburgerMenuWhite from "../../assets/hamburgerMenu-white.svg";

export default function HamburgerMenu(props) {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const menuTransitions = useTransition(drawerIsOpen, null, {
        from: { transform: "translateX(100%)" },
        enter: { transform: "translateX(0%)" },
        leave: { transform: "translateX(100%)" },
    });
    const overlayTransitions = useTransition(drawerIsOpen, null, {
        from: { position: "absolute", opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    return (
        <Fragment>
            <ui.Icon
                src={hamburgerMenuBlack}
                onClick={() => setDrawerIsOpen(!drawerIsOpen)}
            />
            {menuTransitions.map(
                ({ item, key, props }) =>
                    item && (
                        <ui.NavDrawer key={key} style={props}>
                            <ui.Nav>
                                <ui.NavList>
                                    <ui.NavItem
                                        onClick={() => setDrawerIsOpen(false)}
                                    >
                                        About
                                    </ui.NavItem>
                                    <ui.NavItem
                                        onClick={() => setDrawerIsOpen(false)}
                                    >
                                        View Filter
                                    </ui.NavItem>
                                </ui.NavList>
                            </ui.Nav>
                        </ui.NavDrawer>
                    )
            )}
            {overlayTransitions.map(
                ({ item, key, props }) =>
                    item && (
                        <ui.Overlay
                            key={key}
                            style={props}
                            onClick={() => setDrawerIsOpen(false)}
                        />
                    )
            )}
        </Fragment>
    );
}
