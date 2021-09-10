const albumCheck = (albums) => {
  console.log(albums);
  return albums.filter((album) => album.image[2]["#text"].length > 0);
};

export default albumCheck;
