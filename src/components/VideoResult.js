import React from "react";
import styled from "styled-components";

function VideoResult(props) {
    const ResultContainer = styled.div`
        width: 80%;
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

    const ResultThumbnail = styled.div``;

    const ThumbnailImage = styled.img`
        height: 200px;
    `;

    const ChannelImage = styled.img`
        height: 50px;
    `;

    return (
        <ResultContainer>
            <ResultThumbnail>
                <ThumbnailImage src={props.thumbnailSrc} />
                <div className="thumbnailTime">
                    <p>{props.thumbnailTime}</p>
                </div>
            </ResultThumbnail>
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
                <div className="channelDetails">
                    <ChannelImage src={props.channelIcon} alt="Channel Icon" />
                    <p>
                        {props.channelName} - {props.channelSubs}
                    </p>
                </div>
            </div>
        </ResultContainer>
    );
}

export default VideoResult;
