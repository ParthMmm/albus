import axios from "axios";

const tagTopAlbumsFetch = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&format=json&limit=10${process.env.NEXT_PUBLIC_LAST_FM_KEY}`;
const albumInfoFetch = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&format=json${process.env.NEXT_PUBLIC_LAST_FM_KEY}`;
const albumSearchFetch = `https://ws.audioscrobbler.com/2.0/?method=album.search&format=json${process.env.NEXT_PUBLIC_LAST_FM_KEY}`;
const chartTopArtists = `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&format=json&limit=10${process.env.NEXT_PUBLIC_LAST_FM_KEY}`;
const chartTopTracks = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&format=json&limit=10${process.env.NEXT_PUBLIC_LAST_FM_KEY}`;

const albumReviewsFetch = `${process.env.NEXT_PUBLIC_BACKEND_SERVER}api/fetchAlbumReviews`;
export {
  tagTopAlbumsFetch,
  albumInfoFetch,
  albumSearchFetch,
  chartTopArtists,
  chartTopTracks,
  albumReviewsFetch,
};

// https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&format=json&limit=10&tag=dance&api_key=9fad01c4307703006aa5ebe8aded58bc
