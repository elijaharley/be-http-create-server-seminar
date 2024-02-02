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
});

server.listen(9090, (err) => {
  console.log("Server listening on port 9090");
});
