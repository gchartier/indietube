import React from "react";
import ReactDOM from "react-dom";
import ReactLoading from "react-loading";
import * as ui from "./styles";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

export default function Loading() {
    const themeContext = useContext(ThemeContext);

    return ReactDOM.createPortal(
        <ui.LoadingContainer>
            <ReactLoading
                type={"bubbles"}
                color={themeContext.primaryYellow}
                height={"25%"}
                width={"25%"}
            />
        </ui.LoadingContainer>,
        document.querySelector("#modal")
    );
}
