import React, { useState, useEffect } from "react"
import { encode } from "querystring"
import * as ui from "./styles"
import optionsMenu from "../../../assets/menu.svg"

export default function OptionsMenu(props) {
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const menuContainer = React.createRef()

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuContainer.current && !menuContainer.current.contains(event.target)) {
                setIsMenuVisible(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return function cleanup() {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    })

    const handleMenuClick = () => {
        setIsMenuVisible(!isMenuVisible)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

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
    }

    return (
        <ui.ResultOptions>
            <ui.MenuIcon src={optionsMenu} alt="Result Options" onClick={handleMenuClick} />
            {isMenuVisible && (
                <ui.Menu ref={menuContainer}>
                    <ui.MenuItem onClick={handleMenuClick}>
                        <ui.ResultLink href={props.videoURL} target="_blank" textDecor="none">
                            Open with YouTube
                        </ui.ResultLink>
                    </ui.MenuItem>
                    <ui.MenuItem onClick={handleMenuClick}>
                        <ui.ResultLink href={props.channelURL} target="_blank" textDecor="none">
                            Go to Channel
                        </ui.ResultLink>
                    </ui.MenuItem>
                    <form onSubmit={handleSubmit}>
                        <input name="channelId" type="hidden" value={props.channel.id} />
                        <input name="channelName" type="hidden" value={props.channel.name} />
                        <ui.MenuItem>
                            <ui.MenuButton type="submit">This isn't indie</ui.MenuButton>
                        </ui.MenuItem>
                    </form>
                </ui.Menu>
            )}
        </ui.ResultOptions>
    )
}
