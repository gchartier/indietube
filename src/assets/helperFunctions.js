function convertDurationToTimestamp(ISODuration) {
    let timestamp = "";
    const matches = ISODuration.match(
        /((?<hours>\d{0,2})H)?((?<minutes>\d{0,2})M)?(?<seconds>\d{0,2})S/
    );

    if (matches) {
        if (matches.groups.hours)
            timestamp = timestamp.concat(matches.groups.hours + ":");

        if (matches.groups.minutes) {
            if (matches.groups.hours && matches.groups.minutes.length === 1)
                timestamp = timestamp.concat(
                    "0" + matches.groups.minutes + ":"
                );
            else timestamp = timestamp.concat(matches.groups.minutes + ":");
        } else timestamp = timestamp.concat("0:");

        if (matches.groups.seconds) {
            if (matches.groups.seconds.length === 1)
                timestamp = timestamp.concat("0" + matches.groups.seconds);
            else timestamp = timestamp.concat(matches.groups.seconds);
        }
    }
    return timestamp;
}

export default convertDurationToTimestamp;
