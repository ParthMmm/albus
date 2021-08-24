import axios from "axios";

const tagTopAlbumsFetch = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&format=json&limit=10${process.env.LAST_FM_KEY}`;
const albumInfoFetch = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&format=json${process.env.LAST_FM_KEY}`;

export { tagTopAlbumsFetch, albumInfoFetch };

// https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&format=json&limit=10&tag=dance&api_key=9fad01c4307703006aa5ebe8aded58bc
