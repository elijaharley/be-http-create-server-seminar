const http = require('http');
const fs = require('fs/promises');

const server = http.createServer((req, res) => {
  const { url, method } = req;
  console.log(url, method);
  if (url === '/' && method === 'POST') {
    let body = '';
    req.on('data', (packet) => {
      body += packet.toString();
    });
    req.on('end', () => {
      const newCat = JSON.parse(body);
      fs.readFile(`${__dirname}/data/cats.json`, 'utf-8')
        .then((data) => {
          const cats = JSON.parse(data);
          const newCats = [...cats, newCat];
          console.log(newCats);
          return fs.writeFile(
            `${__dirname}/data/cats.json`,
            JSON.stringify(newCats, null, 2)
          );
        })
        .then(() => {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 201;
          res.write(JSON.stringify({ cat: newCat }));
          res.end();
        })
        .catch((err) => console.log(err));
    });
  }
});

server.listen(9090, (err) => {
  if (err) console.log(err);
  else console.log('Server listening on port: 9090');
});
