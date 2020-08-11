import React from "react";
import Modal from "./Modal";

const subheading = { fontSize: "1.5rem" };
const subheadingCenter = { ...subheading, textAlign: "center" };

function About(props) {
    return (
        <Modal
            closeHandler={props.closeHandler}
            modalHeader={"About"}
            modalContent={
                <div>
                    <h2 style={subheading}>What is indieTube?</h2>
                    <p>
                        <b>IndieTube</b>, in its most basic form, is a filter on
                        YouTube's search algorithm to only show you the
                        independent creators on the platform. In YouTube's early
                        days,
                        <b> EVERYTHING</b> was about the creators and rightfully
                        so: they made the whole platform successful with their
                        awesome content! No matter what you searched, you were
                        bound to find a new independent YouTube creator trying
                        to get their content out to anyone who would watch.{" "}
                        <br />
                        <br />
                        Fast forward to today...independent creators are buried
                        in the search results under page upon page of news
                        channels, corporations, media conglomerates, ads, and
                        YouTube Originals. IndieTube is an attempt to fight{" "}
                        <b>against</b> the over-corporatization of YouTube and
                        to fight <b>for</b> the creators that made this platform
                        successful in the first place.
                    </p>
                    <h2 style={subheading}>What classifies as "indie"?</h2>
                    <p>
                        There's really only 1 golden rule that's considered
                        before filtering out a channel's results from the final
                        results you see in indieTube: Does the channel more
                        represent an individual creator or does it more
                        represent a corporation? That's pretty much it! However,
                        with rules so simple, there are bound to be false
                        positives and negatives and that is where <b>YOU</b>{" "}
                        come in!
                    </p>

                    <h2 style={subheading}>What can I do to help?</h2>
                    <p>
                        If you use indieTube, help us make it better! If you
                        notice any results that do not represent our 1 golden
                        rule listed above, click the menu icon on the video and
                        click "This isn't indie" and the channel will be
                        submitted for review to be removed from the indieTube
                        results.
                    </p>
                    <h2 style={subheadingCenter}>For the creators!</h2>
                    <br />
                </div>
            }
        />
    );
}

export default About;
