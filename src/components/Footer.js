import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
    text-align: center;
    font-size: 1.2rem;
    background-color: white;
    padding: 2%;
`;

const P = styled.p`
    font-weight: bold;
    font-size: calc(12px + (18 - 12) * ((100vw - 300px) / (1600 - 300)));
    margin: 0;
`;

const FlexContainer = styled.span`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const SiteLink = styled.a`
    color: ${(props) => props.color || "black"};
`;

function Footer() {
    return (
        <StyledFooter>
            <P>
                <FlexContainer>
                    <span>
                        Built by{" "}
                        <SiteLink
                            color="#0F9D58"
                            href="https://gabrielchartier.dev"
                            target="_blank"
                        >
                            GabrielChartier.dev
                        </SiteLink>
                    </span>
                    <span>
                        &nbsp;using the{" "}
                        <SiteLink
                            color="#DB4437"
                            href="https://developers.google.com/youtube/v3/"
                            target="_blank"
                        >
                            YouTube Data API
                        </SiteLink>
                    </span>
                </FlexContainer>
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
