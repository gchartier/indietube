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

// List of non-indie channels to filter against
// prettier-ignore
const CHANNEL_FILTER_LIST = [
    { channelName: "El Espectador", channelId: "UCFYdMS-M4mRdbxPuErz1CVw" },
    { channelName: "NBC News", channelId: "UCeY0bbntWzzVIaj2z3QigXg" },
    { channelName: "Sky News", channelId: "UCoMdktPbSTixAyNGwb-UYkQ" },
    { channelName: "CBS This Morning", channelId: "UC-SJ6nODDmufqBzPBwCvYvQ" },
    { channelName: "Bloomberg QuickTake News", channelId: "UChirEOpgFCupRAk5etXqPaA",},
    { channelName: "Netflix", channelId: "UCWOA1ZGywLbqmigxE4Qlvuw" },
    { channelName: "HuffPost", channelId: "UCZfsrIV68Oegr5bJgAMLBDA" },
    { channelName: "This Morning", channelId: "UChFsYLqPUyLiZnfRog6wiZA" },
    { channelName: "ABC News", channelId: "UCBi2mrWuNuyYy4gbM6fU18Q" },
    { channelName: "TODAY", channelId: "UChDKyKQ59fYz3JO2fl0Z6sg" },
    { channelName: "CBC News", channelId: "UCuFFtHWoLl5fauMMD5Ww2jA" },
    { channelName: "NBC New York", channelId: "UCxCfoSInadl-4i3F70zDt1A" },
    { channelName: "CBC News: The National",channelId: "UCKjU3KzdbJE1EFcHVqXC3_g",},
    { channelName: "BBC News", channelId: "UC16niRr50-MSBwiO3YDb3RA" },
    { channelName: "11Alive", channelId: "UCzF4Ryn8TKn64md77gS5Q5Q" },
    { channelName: "Lorraine", channelId: "UCM0cwESe107DHyGpEUx1n4Q" },
    { channelName: "The Telegraph", channelId: "UCPgLNge0xqQHWM5B5EFH9Cg" },
    { channelName: "CBS News", channelId: "UC8p1vwvWtl6T73JiExfWs1g" },
    { channelName: "USA Today", channelId: "UCP6HGa63sBC7-KHtkme-p-g" },
    { channelName: "Access", channelId: "UCiKGMZZmZXK-RpbKJGXgH3Q" },
    { channelName: "CNBC Television", channelId: "UCrp_UI8XtuYfpiqluWLD7Lw" },
    { channelName: "Guardian News", channelId: "UCIRYBXDze5krPDzAEOxFGVA" },
    { channelName: "FRANCE 24", channelId: "UCCCPCZNChQdGa9EkATeye4g" },
    { channelName: "9 News Australia", channelId: "UCIYLOcEUX6TbBo7HQVF2PKA" },
    { channelName: "NowThis News", channelId: "UCn4sPeUomNGIr26bElVdDYg" },
    { channelName: "El Mundo", channelId: "UCGXbLrVe8vnkiFv7q2vYv3w" },
    { channelName: "HuffPost UK", channelId: "UCwtPniJKxrUL6DzDmFUF-ZA" },
    { channelName: "Le Parisien", channelId: "UCfHn_8-ehdem86fEvlFg-Gw" },
    { channelName: "EWTN", channelId: "UCijDos-LUTh9RQvSCMQqN6Q" },
    { channelName: "HBO", channelId: "UCVTQuK2CaWaTgSsoNkn5AiQ" },
    { channelName: "WELT Nachrichtensender",channelId: "UCZMsvbAhhRblVGXmEXW8TSA",},
    { channelName: "Global News", channelId: "UChLtXXpo4Ge1ReTEboVvTDg" },
    { channelName: "WKYC Channel 3", channelId: "UCNBmxc6FvKyxtCpUygcdINA" },
    { channelName: "WION", channelId: "UC_gUM8rL-Lrg6O3adPW9K1g" },
    { channelName: "MSNBC", channelId: "UCaXkIU1QidjPwiAYu6GcHjg" },
    { channelName: "CNN", channelId: "UCupvZG-5ko_eiXAupbDfxWw" },
    { channelName: "Reuters", channelId: "UChqUTb7kYRX8-EiaN3XFrSQ" },
    { channelName: "The Sun", channelId: "UCIzXayRP7-P0ANpq-nD-h5g" },
    { channelName: "28 minutes - ARTE", channelId: "UC8EzKGkEiusTm7g0mTfkWkg" },
    { channelName: "T13", channelId: "UCsRnhjcUCR78Q3Ud6OXCTNg" },
    { channelName: "RMC", channelId: "UCgGb7tN3tIH5_Kk05D1J_bA" },
    { channelName: "L'Obs", channelId: "UC1ObaaFz4XHVPN2T5IFsU4w" },
    { channelName: "Fox News", channelId: "UCXIJgqnII2ZOINSWNOGFThA" },
    { channelName: "Saturday Night Live",channelId: "UCqFzWxSCi39LnW1JKFR3efg" },
    { channelName: "Hindustan Times", channelId: "UCm7lHFkt2yB_WzL67aruVBQ" },
    { channelName: "extratv", channelId: "UCVr-TwiGNnveWyOouIyz2fQ" },
    { channelName: "Revista Semana", channelId: "UC4oQAvXFuNlKivYjUynQKTA" },
    { channelName: "60 Minutes Australia", channelId: "UC0L1suV8pVgO4pCAIBNGx5w" },
    { channelName: "Lifetime", channelId: "UCpYF_3dMxbTukeCG2GsgPbA" },
    { channelName: "Netflix UK & Ireland", channelId: "UCGie8GMlUo3kBKIopdvumVQ" },
    { channelName: "Rotten Tomatoes TV", channelId: "UCz1GPotHecuLngiLuY739QQ" },
    { channelName: "Meganoticias", channelId: "UCkccyEbqhhM3uKOI6Shm-4Q" },
    { channelName: "BBC Newsnight", channelId: "UC6o-wWU-v2ClFMwougmK7dA" },
    { channelName: "The Daily Show with Trevor Noah", channelId: "UCwWhs_6x42TyRM4Wstoq8HA" },
    { channelName: "Good Morning Britain", channelId: "UCq18eeL7D9Vd8DhjMcLh9QQ" },
    { channelName: "CTV News", channelId: "UCi7Zk9baY1tvdlgxIML8MXg" },
    { channelName: "SHOWTIME", channelId: "UCtwMWJr2BFPkuJTnSvCESSQ" },
    { channelName: "Inside Edition", channelId: "UC9k-yiEpRHMNVOnOi_aQK8w" },
    { channelName: "Madame Figaro", channelId: "UCtMNeiW7rOdKOXhCexxQAy" },
    { channelName: "ABC News (Australia)", channelId: "UCVgO39Bk5sMo66-6o6Spn6Q" },
    { channelName: "Band Jornalismo", channelId: "UCoa-D_VfMkFrCYodrOC9-mA" },
    { channelName: "Tribun Timur", channelId: "UCK6c4qk3hRaa6fMIEZrhiXQ" },
    { channelName: "The View", channelId: "UCeH6qE4V7n5tVwP7NkdrtJg" },
    { channelName: "The Tonight Show Starring Jimmy Fallon", channelId: "UC8-Th83bH_thdKZDJCrn88g" },
    { channelName: "Al Jazeera English", channelId: "UCNye-wNBqNL5ZzHSJj3l8Bg" },
    { channelName: "Good Morning America", channelId: "UCH1oRy1dINbMVp3UFWrKP0w" },
    { channelName: "FRANCE 24 English", channelId: "UCQfwfsi5VrQ8yKZ-UWmAEFg" },
    { channelName: "Noticias Telemundo", channelId: "UCRwA1NUcUnwsly35ikGhp0A" },
    { channelName: "MILENIO", channelId: "UCFxHplbcoJK9m70c4VyTIxg" },
    { channelName: "Yahoo Finance", channelId: "UCEAZeUIeJs0IjQiqTCdVSIg" },
    { channelName: "Os Pingos nos Is", channelId: "UCzjtGnD7qqeaHW3nvDVrjQA" },
    { channelName: "Europe 1", channelId: "UCIMGfEAERXjmWwQeg15BFsg" },
    { channelName: "Morning Show", channelId: "UC-wcdrzucnlKGBjyEUaEWaQ" },
    { channelName: "Record News", channelId: "UCuiLR4p6wQ3xLEm15pEn1Xw" },
    { channelName: "Jovem Pan - 3 em 1", channelId: "UCEsbaUdrM_87K-2um30hf8Q" },
    { channelName: "Democracy Now!", channelId: "UCzuqE7-t13O4NIDYJfakrhw" },
    { channelName: "Jornal da Record", channelId: "UCmpHPgeCBgvk_fDXZQKsnAA" },
    { channelName: "Le Point", channelId: "UCQd5LYcykaFeZtjDaP3bNSA" },
    { channelName: "The Verge", channelId: "UCddiUEpeqJcYeBxX1IVBKvQ" },
    { channelName: "Facebook App", channelId: "UCcr9tciZbuvJrEVAgIXCp8Q" },
    { channelName: "euronews (in English)", channelId: "UCSrZ3UV4jOidv8ppoVuvW9Q" },
    { channelName: "DER AKTIONÄR TV", channelId: "UC62IIFhchBWQxLPSyUatD-A" },
    { channelName: "inKhabar", channelId: "UC1tnj_v8Sn-hWERFvqSjBWQ" },
    { channelName: "Pânico Jovem Pan", channelId: "UC9U4nIDyIzzelXrjNQXNvxA" },
    { channelName: "Platzi", channelId: "UC55-mxUj5Nj3niXFReG44OQ" },
    { channelName: "CNBC Indonesia", channelId: "UCGN9JsnkvK05v2lnTI_-uGA" },
    { channelName: "El Universal", channelId: "UC2SEk1w7DgoHs_G3w1biz-w" },
    { channelName: "News24", channelId: "UCuzS3rPQAYqHcLWqOFuY0pw" },
    { channelName: "Bloomberg Politics", channelId: "UCV61VqLMr2eIhH4f51PV0gA" },
    { channelName: "TV9 Bharatvarsh", channelId: "UCOutOIcn_oho8pyVN3Ng-Pg" },
    { channelName: "tagesschau", channelId: "UC5NOEUbkLheQcaaRldYW5GA" },
    { channelName: "GQ", channelId: "UCsEukrAd64fqA7FjwkmZ_Dw" },
    { channelName: "Kanak News", channelId: "UC90RW5ZmBBqp4r2QIQxfAC" },
    { channelName: "Mi Canal Peru", channelId: "UCPdMo4auXNg5mVtkJ_LbP8g" },
    { channelName: "Twitter", channelId: "UCpg-U3_G3ZVck6QO6uhW_OA" },
    { channelName: "CBS Evening News", channelId: "UCAeWdyKJXGWmVAXFpgLNNTg" },
    { channelName: "WFLA News Channel 8", channelId: "UCDvJcb8Adv-_bOrtnRLmiDw" },
];

const ADD_TO_FILTER = [];

export {
    CHANNEL_URL,
    VIDEO_URL,
    API_SEARCH_URL,
    SEARCH_PARAMS,
    API_VIDEOS_URL,
    VIDEOS_PARAMS,
    RESULTS_LIMIT,
    PAGE_LIMIT,
    CHANNEL_FILTER_LIST,
    REQUEST_LOOP_LIMIT,
    ADD_TO_FILTER,
};
