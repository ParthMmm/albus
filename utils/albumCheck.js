const albumCheck = (albums) => {
  return albums.filter((album) => album.image[2]["#text"].length > 0);
};

export default albumCheck;
