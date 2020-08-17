import styled from "styled-components";

export const ModalContainer = styled.div`
    position: absolute;
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

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    z-index: 100;
    background: rgba(0, 0, 0, 0.5);
    transition: opacity 200ms;
`;

export const ModalBody = styled.div`
    position: absolute;
    overflow: scroll;
    top: 10%;
    max-width: 70vw;
    max-height: 70vh;
    margin: 0 auto;
    text-align: left;
    z-index: 101;
    background-color: ${(props) => props.theme.accentYellow};
    border-radius: 15px;
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
    padding: 2rem;
`;

export const CloseIcon = styled.img`
    position: absolute;
    width: 2rem;
    right: 2%;
    top: 2%;
    cursor: pointer;
`;

export const ModalHeader = styled.h1`
    text-align: center;
    font-size: 2rem;
`;