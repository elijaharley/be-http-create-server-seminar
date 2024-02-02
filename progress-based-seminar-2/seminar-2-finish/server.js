const http = require("http");
const fs = require("fs/promises");

const server = http.createServer((request, response) => {
  const method = request.method;
  const url = request.url;

  if (url === "/api/artworks" && method === "GET") {
    fs.readFile("./data/artworks.json", "utf-8").then((contents) => {
      const artworks = JSON.parse(contents);
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify({ artworks: artworks }));
      response.end();
    });
  }

  if (url === "/api/artworks" && method === "POST") {
    let body = "";
    request.on("data", (packet) => {
      body += packet;
    });
    request.on("end", () => {
      const artworkToPost = JSON.parse(body);
      fs.readFile(`${__dirname}/data/artworks.json`, "utf-8").then(
        (artworks) => {
          const parsedArtworks = JSON.parse(artworks);
          const artWorksWithAddedArt = [...parsedArtworks, artworkToPost];
          fs.writeFile(
            `${__dirname}/data/artworks.json`,
            JSON.stringify(artWorksWithAddedArt, null, 2)
          ).then(() => {
            response.statusCode = 201;
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify({ addedArtwork: artworkToPost }));
            response.end();
          });
        }
      );
    });
  }
});

server.listen(9090, (err) => {
  console.log("Server listening on port 9090");
});
