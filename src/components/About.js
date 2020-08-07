import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import closeIcon from "../assets/close.svg";

const StyledAbout = styled.div`
    position: absolute;
    overflow: scroll;
    top: 10%;
    max-width: 70vw;
    max-height: 70vh;
    margin: 0 auto;
    text-align: left;
    background-color: #ffce80;
    border-radius: 15px;
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
    padding: 2rem;
`;

const H1 = styled.h1`
    text-align: center;
    font-size: 2rem;
`;

const H2 = styled.h2`
    font-size: 1.5rem;
`;

const H2Center = styled.h2`
    font-size: 1.5rem;
    text-align: center;
`;

const CloseIcon = styled.img`
    position: absolute;
    width: 2rem;
    right: 2%;
    top: 2%;
    cursor: pointer;
`;

const AboutModal = (
    <StyledAbout>
        <H1>About</H1>
        <CloseIcon src={closeIcon} />
        <H2>What is indieTube?</H2>
        <p>
            <b>IndieTube</b>, in its most basic form, is a filter on YouTube's
            search algorithm to only show you the independent creators on the
            platform. In YouTube's early days,
            <b> EVERYTHING</b> was about the creators and rightfully so: they
            made the whole platform successful with their awesome content! No
            matter what you searched, you were bound to find a new independent
            YouTube creator trying to get their content out to anyone who would
            watch. <br />
            <br />
            Fast forward to today...independent creators are buried in the
            search results under page upon page of news channels, corporations,
            media conglomerates, ads, and YouTube Originals. IndieTube is an
            attempt to fight <b>against</b> the over-corporatization of YouTube
            and to fight <b>for</b> the creators that made this platform
            successful in the first place.
        </p>
        <H2>What classifies as "indie"?</H2>
        <p>
            There's really only 1 golden rule that's considered before filtering
            out a channel's results from the final results you see in indieTube:
            Does the channel more represent an individual creator or does it
            more represent a corporation? That's pretty much it! However, with
            rules so simple, there are bound to be false positives and negatives
            and that is where <b>YOU</b> come in!
        </p>

        <H2>What can I do to help?</H2>
        <p>
            If you use indieTube, help us make it better! If you notice any
            results that do not represent our 1 golden rule listed above, click
            the menu icon on the video and click "This is not indie!" and the
            channel will be submitted for review to be removed from the
            indieTube results.
        </p>
        <H2Center>For the creators!</H2Center>
        <br />
    </StyledAbout>
);

function About(props) {
    return ReactDOM.createPortal(AboutModal, document.querySelector("#modal"));
}

export default About;
