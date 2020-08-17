import React from "react";
import * as ui from "./styles";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

export default function Footer(props) {
    const themeContext = useContext(ThemeContext);

    return (
        <ui.StyledFooter>
            <ui.P>
                <ui.FlexContainer>
                    <span>
                        Built by{" "}
                        <ui.SiteLink
                            color={themeContext.primaryGreen}
                            href="https://gabrielchartier.dev"
                            target="_blank"
                        >
                            GabrielChartier.dev
                        </ui.SiteLink>
                    </span>
                    <span>
                        &nbsp;using the{" "}
                        <ui.SiteLink
                            color={themeContext.primaryRed}
                            href="https://developers.google.com/youtube/v3/"
                            target="_blank"
                        >
                            YouTube Data API
                        </ui.SiteLink>
                    </span>
                </ui.FlexContainer>
                <ui.SiteLink
                    color={themeContext.primaryBlue}
                    target="_blank"
                    href="https://www.buymeacoffee.com/gabrielchartier"
                >
                    Buy me a coffee?
                </ui.SiteLink>
            </ui.P>
        </ui.StyledFooter>
    );
}
