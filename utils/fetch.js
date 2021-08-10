import axios from "axios";

const tagTopAlbumsFetch = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&format=json&limit=10${process.env.LAST_FM_KEY}`;

export { tagTopAlbumsFetch };
