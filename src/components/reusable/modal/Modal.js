import React from "react";
import ReactDOM from "react-dom";
import * as ui from "./styles";
import closeIcon from "../../../assets/close.svg";

export default function Modal(props) {
    return ReactDOM.createPortal(
        <ui.ModalContainer>
            <ui.ModalBody>
                <ui.CloseIcon src={closeIcon} onClick={props.closeHandler} />
                <ui.ModalHeader>{props.modalHeader}</ui.ModalHeader>
                {props.modalContent}
            </ui.ModalBody>
            <ui.Overlay onClick={props.closeHandler} />
        </ui.ModalContainer>,
        document.querySelector("#modal")
    );
}
