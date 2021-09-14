const albumImageCheck = (albums) => {
  return albums.filter((album) => album.image[2]["#text"].length > 0);
};

const albumMBIDCheck = (albums) => {
  return albums.filter((album) => album.mbid?.length > 0);
};

export { albumImageCheck, albumMBIDCheck };
