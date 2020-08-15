import React from "react";
import * as ui from "./styles";

export default function Footer() {
    return (
        <ui.StyledFooter>
            <ui.P>
                <ui.FlexContainer>
                    <span>
                        Built by{" "}
                        <ui.SiteLink
                            color="#0F9D58"
                            href="https://gabrielchartier.dev"
                            target="_blank"
                        >
                            GabrielChartier.dev
                        </ui.SiteLink>
                    </span>
                    <span>
                        &nbsp;using the{" "}
                        <ui.SiteLink
                            color="#DB4437"
                            href="https://developers.google.com/youtube/v3/"
                            target="_blank"
                        >
                            YouTube Data API
                        </ui.SiteLink>
                    </span>
                </ui.FlexContainer>
                <ui.SiteLink
                    color="#4285F4"
                    target="_blank"
                    href="https://www.buymeacoffee.com/gabrielchartier"
                >
                    Buy me a coffee?
                </ui.SiteLink>
            </ui.P>
        </ui.StyledFooter>
    );
}
