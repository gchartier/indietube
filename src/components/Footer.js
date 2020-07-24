import React from "react";
import styled from "styled-components";

function Footer() {
    const StyledFooter = styled.footer`
        text-align: center;
        font-size: 1.2rem;
    `;

    const P = styled.p`
        font-weight: bold;
    `;

    const PrimarySpan = styled.span`
        color: #ffce80;
    `;

    const SecondarySpan = styled.span`
        color: tomato;
    `;

    return (
        <StyledFooter>
            <P>
                Designed and Built by
                <PrimarySpan> GabrielChartier.dev</PrimarySpan>
                <br />
                All Video Content Belongs to Respective Owners <br />
                This Site Uses the
                <SecondarySpan> YouTube API</SecondarySpan>
            </P>
        </StyledFooter>
    );
}

export default Footer;
