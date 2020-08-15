import React from "react";
import ReactDOM from "react-dom";
import ReactLoading from "react-loading";
import * as ui from "./styles";

export default function Loading() {
    return ReactDOM.createPortal(
        <ui.LoadingContainer>
            <ReactLoading
                type={"bubbles"}
                color={"#f4b400"}
                height={"25%"}
                width={"25%"}
            />
        </ui.LoadingContainer>,
        document.querySelector("#modal")
    );
}
