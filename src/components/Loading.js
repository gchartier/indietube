import React from "react";
import ReactDOM from "react-dom";
import ReactLoading from "react-loading";
import styled from "styled-components";

const LoadingContainer = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function Loading() {
    return ReactDOM.createPortal(
        <LoadingContainer>
            <ReactLoading
                type={"bubbles"}
                color={"#f4b400"}
                height={"35%"}
                width={"35%"}
            />
        </LoadingContainer>,
        document.querySelector("#modal")
    );
}

export default Loading;
