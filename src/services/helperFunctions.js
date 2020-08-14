import moment from "moment";
const momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);

function formatVideoDuration(duration) {
    let formattedDuration = duration;

    if (duration === "P0D") return "LIVE";
    else {
        formattedDuration = moment
            .duration(formattedDuration)
            .format("hh:mm:ss");
        if (formattedDuration.length < 3)
            formattedDuration = "0:" + formattedDuration;
    }
    return formattedDuration;
}

export default formatVideoDuration;
