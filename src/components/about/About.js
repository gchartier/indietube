import React from "react";
import * as ui from "./styles";

export default function About() {
    return (
        <ui.AboutContainer>
            <ui.SubHeading>What is indieTube?</ui.SubHeading>
            <p>
                <b>IndieTube</b>, in its most basic form, is a filter on
                YouTube's search algorithm to only show you the independent
                creators on the platform. In YouTube's early days,
                <b> EVERYTHING</b> was about the creators and rightfully so:
                they made the whole platform successful with their awesome
                content! No matter what you searched, you were bound to find a
                new independent YouTube creator trying to get their content out
                to anyone who would watch. <br />
                <br />
                Fast forward to today...independent creators are buried in the
                search results under page upon page of news channels,
                corporations, media conglomerates, ads, and YouTube Originals.
                IndieTube is an attempt to fight <b>against</b> the
                over-corporatization of YouTube and to fight <b>for</b> the
                creators that made this platform successful in the first place.
            </p>
            <ui.SubHeading>What classifies as "indie"?</ui.SubHeading>
            <p>
                There's really only 1 golden rule that's considered before
                filtering out a channel's results from the final results you see
                in indieTube: Does the channel more represent an individual
                creator or does it more represent a corporation? That's pretty
                much it! However, with rules so simple, there are bound to be
                false positives and negatives and that is where <b>YOU</b> come
                in!
            </p>

            <ui.SubHeading>What can I do to help?</ui.SubHeading>
            <p>
                If you use indieTube, help us make it better! If you notice any
                results that do not represent our 1 golden rule listed above,
                click the menu icon on the video and click "This isn't indie"
                and the channel will be submitted for review to be removed from
                the indieTube results.
            </p>
            <ui.SubHeading isCenter={true}>For the creators!</ui.SubHeading>
            <br />
        </ui.AboutContainer>
    );
}
