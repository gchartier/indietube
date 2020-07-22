import React from "react";

function VideoResult(props) {
    return (
        <div className="searchResult">
            <div className="resultThumbnail">
                <img src={props.thumbnailSrc} />
                <div className="thumbnailTime">
                    <p>{props.thumbnailTime}</p>
                </div>
            </div>
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
                    <img src={props.channelIcon} alt="Channel Icon" />
                    <p>
                        {props.channelName} - {props.channelSubs}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VideoResult;
