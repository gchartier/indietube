// Results
const RESULTS_LIMIT = 50;
const PAGE_LIMIT = 10;

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

const tempResults = [
    {
        id: "dDh4cNtY4gs",
        title:
            "New Rule: Here Lies Donald Trump | Real Time with Bill Maher (HBO)",
        publishDate: "2020-08-08T21:34:20Z",
        channel: {
            id: "UCy6kyFxaMqGtpE3pQTflK8A",
            name: "Real Time with Bill Maher",
        },
        thumbnail: {
            url: "https://i.ytimg.com/vi/dDh4cNtY4gs/mqdefault.jpg",
            width: 320,
            height: 180,
        },
        duration: "5:31",
        views: "746148",
        likes: "25542",
        dislikes: "1844",
    },
    {
        id: "AbUk25SYQuc",
        title: "LeBron James Reacts To Trump&#39;s NBA Criticism",
        publishDate: "2020-08-06T19:02:42Z",
        channel: { id: "UCKY5PiEq8Tl9r7f3qittXng", name: "ET Canada" },
        thumbnail: {
            url: "https://i.ytimg.com/vi/AbUk25SYQuc/mqdefault.jpg",
            width: 320,
            height: 180,
        },
        duration: "8:33",
        views: "21309",
        likes: "325",
        dislikes: "53",
    },
    {
        id: "vCpqFs-S7_I",
        title: "Trump Twice Mispronounces Yosemite During Signing Ceremony",
        publishDate: "2020-08-06T09:00:14Z",
        channel: {
            id: "UCVTyTA7-g9nopHeHbeuvpRA",
            name: "Late Night with Seth Meyers",
        },
        thumbnail: {
            url: "https://i.ytimg.com/vi/vCpqFs-S7_I/mqdefault.jpg",
            width: 320,
            height: 180,
        },
        duration: "3:22",
        views: "478768",
        likes: "9201",
        dislikes: "249",
    },
    {
        id: "THQH9QJKrIE",
        title:
            "Trump signs executive orders on unemployment, evictions, student loans and payroll tax",
        publishDate: "2020-08-08T21:15:00Z",
        channel: { id: "UCHd62-u_v4DvJ8TCFtpi4GA", name: "Washington Post" },
        thumbnail: {
            url: "https://i.ytimg.com/vi/THQH9QJKrIE/mqdefault.jpg",
            width: 320,
            height: 180,
        },
        duration: "2:18",
        views: "437939",
        likes: "5312",
        dislikes: "840",
    },
    {
        id: "Y8_H6wYuRc8",
        title:
            "Trump defends crowd gathered for news conference in N.J. as &#39;peaceful protesters&#39;",
        publishDate: "2020-08-08T00:53:47Z",
        channel: { id: "UCHd62-u_v4DvJ8TCFtpi4GA", name: "Washington Post" },
        thumbnail: {
            url: "https://i.ytimg.com/vi/Y8_H6wYuRc8/mqdefault.jpg",
            width: 320,
            height: 180,
        },
        duration: "1:29",
        views: "230457",
        likes: "3474",
        dislikes: "721",
    },
    {
        id: "gR1VzDA-rr4",
        title:
            "First Take on LeBron James addressing President Trump&#39;s comments",
        publishDate: "2020-08-06T17:33:53Z",
        channel: { id: "UCiWLfSweyRNmLpgEHekhoAg", name: "ESPN" },
        thumbnail: {
            url: "https://i.ytimg.com/vi/gR1VzDA-rr4/mqdefault.jpg",
            width: 320,
            height: 180,
        },
        duration: "7:05",
        views: "59817",
        likes: "935",
        dislikes: "454",
    },
    {
        id: "WlCrWLQ3Tb0",
        title: "Republicans IMPLODE Over Post-Trump Leader",
        publishDate: "2020-08-09T16:00:06Z",
        channel: { id: "UCl9roQQwv4o4OuBj3FhQdDQ", name: "The Damage Report" },
        thumbnail: {
            url: "https://i.ytimg.com/vi/WlCrWLQ3Tb0/mqdefault.jpg",
            width: 320,
            height: 180,
        },
        duration: "8:58",
        views: "40581",
        likes: "2297",
        dislikes: "36",
    },
    {
        id: "hjNPoaxuWSc",
        title:
            "LeBron James talks Lakers’ loss, reacts to President Trump&#39;s criticism of kneeling | NBA on ESPN",
        publishDate: "2020-08-06T04:30:23Z",
        channel: { id: "UCiWLfSweyRNmLpgEHekhoAg", name: "ESPN" },
        thumbnail: {
            url: "https://i.ytimg.com/vi/hjNPoaxuWSc/mqdefault.jpg",
            width: 320,
            height: 180,
        },
        duration: "9:04",
        views: "107542",
        likes: "1134",
        dislikes: "662",
    },
    {
        id: "mp_Uuz9k7Os",
        title:
            "He Predicted a Trump Win in 2016. What&#39;s His Forecast For 2020? | NYT Opinion",
        publishDate: "2020-08-05T17:00:09Z",
        channel: { id: "UCqnbDFdCpuN8CMEg0VuEBqA", name: "The New York Times" },
        thumbnail: {
            url: "https://i.ytimg.com/vi/mp_Uuz9k7Os/mqdefault.jpg",
            width: 320,
            height: 180,
        },
        duration: "7:14",
        views: "800377",
        likes: "15775",
        dislikes: "3926",
    },
    {
        id: "UC80rITXfT4",
        title:
            "WHAT DID YOU JUST SAY? President Trump TAKES ON MEDIA During SURPRISE News Conference",
        publishDate: "2020-08-08T00:24:23Z",
        channel: { id: "UCJg9wBPyKMNA5sRDnvzmkdg", name: "NewsNOW from FOX" },
        thumbnail: {
            url: "https://i.ytimg.com/vi/UC80rITXfT4/mqdefault.jpg",
            width: 320,
            height: 180,
        },
        duration: "7:50",
        views: "163676",
        likes: "6654",
        dislikes: "180",
    },
];

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
    tempResults,
};
