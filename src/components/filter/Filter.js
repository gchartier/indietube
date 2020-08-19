import React from "react";
import { CHANNEL_FILTER_LIST } from "../../utilities/channelFilter";
import * as ui from "./styles";

export default function Filter() {
    return (
        <ui.FilterListContainer>
            <ui.FilterList>
                {CHANNEL_FILTER_LIST.map((channel, index) => (
                    <li key={index}>{channel.channelName}</li>
                ))}
            </ui.FilterList>
        </ui.FilterListContainer>
    );
}
