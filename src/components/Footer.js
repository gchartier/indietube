import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
    text-align: center;
    font-size: 1.2rem;
    line-height: 1.1rem;
    background-color: white;
    padding: 2%;
`;

const P = styled.p`
    font-weight: bold;
    font-size: calc(10px + (20 - 10) * ((100vw - 300px) / (1600 - 300)));
    margin: 0;
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
                    color="#0F9D58"
                    href="https://gabrielchartier.dev"
                    target="_blank"
                >
                    GabrielChartier.dev
                </SiteLink>{" "}
                using the{" "}
                <SiteLink
                    color="#DB4437"
                    href="https://developers.google.com/youtube/v3/"
                    target="_blank"
                >
                    YouTube Data API
                </SiteLink>
                <br />
                <SiteLink
                    color="#4285F4"
                    target="_blank"
                    href="https://www.buymeacoffee.com/gabrielchartier"
                >
                    Buy me a coffee?
                </SiteLink>
            </P>
        </StyledFooter>
    );
}

export default Footer;
