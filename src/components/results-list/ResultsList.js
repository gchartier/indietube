import React, { useEffect } from "react";
import * as ui from "./styles";
import VideoResult from "../result/video-result/VideoResult";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

export default function ResultList(props) {
    const scrollRef = useBottomScrollListener(() => props.scrollHandler());

    useEffect(() => {
        if (props.isSearch === true) window.scrollTo(0, 0);
    }, [props.isSearch]);

    return (
        <ui.StyledResults ref={scrollRef}>
            {props.results.map((result) => {
                return <VideoResult key={result.id} result={result} />;
            })}
        </ui.StyledResults>
    );
}
