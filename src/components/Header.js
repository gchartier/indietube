import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
    text-align: left;
    padding-left: 2%;
`;

const H1 = styled.h1`
    font-size: 2rem;
`;

const PrimarySpan = styled.span`
    color: #ffce80;
`;

function Header() {
    return (
        <StyledHeader>
            <H1>
                Indie<PrimarySpan>Tube</PrimarySpan>
            </H1>
        </StyledHeader>
    );
}

export default Header;
