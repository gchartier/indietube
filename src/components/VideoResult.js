import React from "react";
import styled from "styled-components";

function VideoResult(props) {
    const ResultContainer = styled.div`
        width: 95%;
        border-radius: 25px;
        background-color: white;
        box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06),
            0 22.3px 17.9px rgba(0, 0, 0, 0.072),
            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
            0 100px 80px rgba(0, 0, 0, 0.12);
        margin: 3% 0 3% 0;
    `;

    const ResultThumbnail = styled.div`
        position: relative;
    `;

    const ThumbnailImage = styled.img`
        width: 95%;
        height: 200px;
    `;

    const ThumbnailTime = styled.div`
        background-color: black;
        position: absolute;
        bottom: 5%;
        right: 5%;
    `;

    const Time = styled.p`
        color: white;
        font-size: 0.8rem;
        padding: 3px;
        margin: 0;
    `;

    const ChannelDetails = styled.div`
        display: flex;
        align-items: center;
        margin-left: 5%;
    `;

    const ChannelImage = styled.img`
        height: 40px;
        width: 40px;
        border-radius: 50%;
    `;

    return (
        <ResultContainer>
            <ResultThumbnail>
                <ThumbnailImage src={props.thumbnailSrc} />
                <ThumbnailTime>
                    <Time>{props.thumbnailTime}</Time>
                </ThumbnailTime>
            </ResultThumbnail>
            <ChannelDetails>
                <ChannelImage src={props.channelIcon} alt="Channel Icon" />
                <p>
                    {props.channelName} - {props.channelSubs}
                </p>
            </ChannelDetails>
            <div className="resultStats">
                <p>{props.views} Views</p>
                <p>{props.likes} Likes</p>
                <p>{props.dislikes} Dislikes</p>
            </div>
            <div className="resultOptions">
                <img src="../assets/optionsMenu.svg" alt="Result Options" />
                <div className="optionsMenu">
                    <ul>
                        <li>Copy URL</li>
                        <li>Open With YouTube.com</li>
                        <li>Go to Channel</li>
                        <li>This is not an indie creator</li>
                    </ul>
                </div>
            </div>
            <div className="resultTitle">
                <p>{props.title}</p>
            </div>
        </ResultContainer>
    );
}

export default VideoResult;
