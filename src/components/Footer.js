import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
    text-align: center;
    font-size: 1.2rem;
    background-color: #e6e6e6;
`;

const P = styled.p`
    font-weight: bold;
    line-height: 2rem;
`;

const SiteLink = styled.a`
    color: ${(props) => props.color || "black"};
`;

function Footer() {
    return (
        <StyledFooter>
            <P>
                Built by{" "}
                <SiteLink
                    color="#67a36f"
                    href="https://gabrielchartier.dev"
                    target="_blank"
                >
                    GabrielChartier.dev
                </SiteLink>
                <br />
                Using the{" "}
                <SiteLink
                    color="tomato"
                    href="https://developers.google.com/youtube/v3/"
                    target="_blank"
                >
                    YouTube Data API
                </SiteLink>
            </P>
        </StyledFooter>
    );
}

export default Footer;
