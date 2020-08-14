import React, { useState, useEffect } from "react";
import styled from "styled-components";
import optionsMenu from "../../assets/menu.svg";
import { encode } from "querystring";

const ResultOptions = styled.div`
    position: relative;
    align-self: flex-end;
`;

const MenuIcon = styled.img`
    padding: 0;
    width: 0.4rem;
`;

const Menu = styled.ul`
    position: absolute;
    bottom: 100%;
    right: 0;
    white-space: nowrap;
    padding: 10px 0 10px 0;
    margin: 0;
    z-index: 2;
    border: 1px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
    background-color: #f7f7f7;
`;

const MenuItem = styled.li`
    list-style-type: none;
    padding: 8px;

    &:hover {
        background-color: #ededed;
    }

    & a {
        display: block;
        width: 100%;
    }
`;

const ResultLink = styled.a`
    color: ${(props) => props.linkColor || "black"};
    text-decoration: ${(props) => props.textDecor || "underline"};
`;

const MenuButton = styled.button`
    border: none;
    background-color: inherit;
    font-size: inherit;
    width: 100%;
    text-align: left;
    padding: 0;
`;

function OptionsMenu(props) {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const menuContainer = React.createRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuContainer.current &&
                !menuContainer.current.contains(event.target)
            ) {
                setIsMenuVisible(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return function cleanup() {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const handleMenuClick = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // prettier-ignore
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({
                "form-name": "notIndie",
                "channelId": event.target.children[0].value,
                "channelName": event.target.children[1].value,
            }),
        })
            .then(() => alert("Thanks!"))
            .catch((error) => console.log(error))
            .finally(() => handleMenuClick());
    };

    return (
        <ResultOptions>
            <MenuIcon
                src={optionsMenu}
                alt="Result Options"
                onClick={handleMenuClick}
            />
            {isMenuVisible && (
                <Menu ref={menuContainer}>
                    <MenuItem onClick={handleMenuClick}>
                        <ResultLink
                            href={props.videoURL}
                            target="_blank"
                            textDecor="none"
                        >
                            Open with YouTube.com
                        </ResultLink>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClick}>
                        <ResultLink
                            href={props.channelURL}
                            target="_blank"
                            textDecor="none"
                        >
                            Go to Channel
                        </ResultLink>
                    </MenuItem>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="channelId"
                            type="hidden"
                            value={props.channel.id}
                        />
                        <input
                            name="channelName"
                            type="hidden"
                            value={props.channel.name}
                        />
                        <MenuItem>
                            <MenuButton type="submit">
                                This isn't indie
                            </MenuButton>
                        </MenuItem>
                    </form>
                </Menu>
            )}
        </ResultOptions>
    );
}

export default OptionsMenu;
