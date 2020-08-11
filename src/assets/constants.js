// Results
const RESULTS_LIMIT = 50;
const PAGE_LIMIT = 10;
const REQUEST_LOOP_LIMIT = 5;

// URLs
const BASE_CONTENT_URL = "https://www.youtube.com/";
const BASE_API_URL = "https://www.googleapis.com/youtube/v3/";

const CHANNEL_URL = BASE_CONTENT_URL + "channel/";
const VIDEO_URL = BASE_CONTENT_URL + "watch?v=";

const API_SEARCH_URL = BASE_API_URL + "search?";
const SEARCH_PARAMS =
    "&key=" +
    process.env.REACT_APP_YOUTUBE_DATA_API_KEY +
    "&maxResults=" +
    RESULTS_LIMIT +
    "&chart=mostPopular" +
    "&regionCode=US" +
    "&relevanceLanguage=en" +
    "&safeSearch=none" +
    "&type=video" +
    "&part=snippet" +
    "&fields=nextPageToken,prevPageToken,items(id,snippet(publishedAt,channelId,title,channelTitle),snippet/thumbnails(medium))";

const API_VIDEOS_URL = BASE_API_URL + "videos?";
const VIDEOS_PARAMS =
    "&key=" +
    process.env.REACT_APP_YOUTUBE_DATA_API_KEY +
    "&part=statistics,contentDetails" +
    "&fields=items(statistics(viewCount,likeCount,dislikeCount,favoriteCount),contentDetails(duration))" +
    "&id=";

export {
    CHANNEL_URL,
    VIDEO_URL,
    API_SEARCH_URL,
    SEARCH_PARAMS,
    API_VIDEOS_URL,
    VIDEOS_PARAMS,
    RESULTS_LIMIT,
    PAGE_LIMIT,
    REQUEST_LOOP_LIMIT,
};
