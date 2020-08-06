// URLs
const BASE_CONTENT_URL = "https://www.youtube.com/";
const BASE_API_URL = "https://www.googleapis.com/youtube/v3/";
const CHANNEL_URL = BASE_CONTENT_URL + "channel/";
const VIDEO_URL = BASE_CONTENT_URL + "watch?v=";
const API_SEARCH_URL = BASE_API_URL + "search?";
const API_VIDEOS_URL = BASE_API_URL + "videos?";

// Results
const RESULTS_LIMIT = 25;
const PAGE_LIMIT = 10;

// List of non-indie channels to filter against
const CHANNEL_FILTER_LIST = [
    { channelName: "El Espectador", channelId: "UCFYdMS-M4mRdbxPuErz1CVw" },
    { channelName: "NBC News", channelId: "UCeY0bbntWzzVIaj2z3QigXg" },
    { channelName: "Sky News", channelId: "UCoMdktPbSTixAyNGwb-UYkQ" },
    { channelName: "CBS This Morning", channelId: "UC-SJ6nODDmufqBzPBwCvYvQ" },
    {
        channelName: "Bloomberg QuickTake News",
        channelId: "UChirEOpgFCupRAk5etXqPaA",
    },
    { channelName: "Netflix", channelId: "UCWOA1ZGywLbqmigxE4Qlvuw" },
    { channelName: "HuffPost", channelId: "UCZfsrIV68Oegr5bJgAMLBDA" },
    { channelName: "This Morning", channelId: "UChFsYLqPUyLiZnfRog6wiZA" },
    { channelName: "ABC News", channelId: "UCBi2mrWuNuyYy4gbM6fU18Q" },
    { channelName: "TODAY", channelId: "UChDKyKQ59fYz3JO2fl0Z6sg" },
    { channelName: "CBC News", channelId: "UCuFFtHWoLl5fauMMD5Ww2jA" },
    { channelName: "NBC New York", channelId: "UCxCfoSInadl-4i3F70zDt1A" },
    {
        channelName: "CBC News: The National",
        channelId: "UCKjU3KzdbJE1EFcHVqXC3_g",
    },
    { channelName: "BBC News", channelId: "UC16niRr50-MSBwiO3YDb3RA" },
    { channelName: "11Alive", channelId: "UCzF4Ryn8TKn64md77gS5Q5Q" },
    { channelName: "Lorraine", channelId: "UCM0cwESe107DHyGpEUx1n4Q" },
    { channelName: "The Telegraph", channelId: "UCPgLNge0xqQHWM5B5EFH9Cg" },
    { channelName: "CBS News", channelId: "UC8p1vwvWtl6T73JiExfWs1g" },
    { channelName: "USA Today", channelId: "UCP6HGa63sBC7-KHtkme-p-g" },
    { channelName: "Access", channelId: "UCiKGMZZmZXK-RpbKJGXgH3Q" },
];

export {
    CHANNEL_URL,
    VIDEO_URL,
    API_SEARCH_URL,
    API_VIDEOS_URL,
    RESULTS_LIMIT,
    PAGE_LIMIT,
    CHANNEL_FILTER_LIST,
};
