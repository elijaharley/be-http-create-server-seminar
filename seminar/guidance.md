# Seminar Overview

The lecture will deal with making a more complicated endpoint with `http.createServer`.
This example builds on the lecture examples to add a `POST` endpoint which will require them to use their knowledge of promises and combine it with how to assemble request bodies from last week.

There are good opportunities for student interaction but take care to provide enough high-level guidance or pseudo-code for them as this will be new ground.

## Setup a post request

The lecture will implement a server with some endpoints already completed which you can build on. Setup a new `POST` request in insomnia and show what you are going to add to the server. Start by adding a console log to make sure that you can get into the right part of your if statement.

```js
const server = http.createServer((req, res) => {
  const { url, method } = req;
  if (url === '/') {
    // ...
  }
  if (url === '/api/cats') {
    if (method === 'GET') {
      // ...
    }
    if (method === 'POST') {
      console.log('in the post');
    }
  }
});
```

## Parse the request body

Parse the incoming body using the same pattern that was used last week when dealing with responses.

```js
if (method === 'POST') {
  let body = '';
  req.on('data', (packet) => {
    body += packet.toString();
  });
  req.on('end', () => {
    const newCat = JSON.parse(body);
    console.log(newCat);
  });
}
```

## Re-write the data file

Take suggestions on how to update the json file. Conclude that we will have to read, update and then re-write the file.

A common mistake is to try to `append` the data to the end. Note this will not work as it'll break our JSON format.

You can show the additional arguments to `JSON.stringify` if you'd like the file to be written with the spacing already in.

```js
if (method === 'POST') {
  let body = '';
  req.on('data', (packet) => {
    body += packet.toString();
  });
  req.on('end', () => {
    const newCat = JSON.parse(body);
    fs.readFile('data/cats.json', 'utf-8').then((fileContents) => {
      const cats = JSON.parse(fileContents);
      const newCats = [...cats, newCat];
      return fs.writeFile('data/cats.json', JSON.stringify(newCats, null, 2));
    });
  });
}
```

## Send the response

Now the data has been added set the 201 statusCode and send the response to the client. Note the convention to send back the newly created resource on a key that represents it. Draw attention to the `201` representing that this is a newly created resource on a standard key (`cat` in this case) and there is no need use a key such as `newCat` or `addedCat` for this purpose.

```js
if (method === 'POST') {
  let body = '';
  req.on('data', (packet) => {
    body += packet.toString();
  });
  req.on('end', () => {
    const newCat = JSON.parse(body);
    fs.readFile('data/cats.json', 'utf-8')
      .then((fileContents) => {
        const cats = JSON.parse(fileContents);
        const newCats = [...cats, newCat];
        return fs.writeFile('data/cats.json', JSON.stringify(newCats, null, 2));
      })
      .then(() => {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 201;
        res.write(JSON.stringify({ cat: newCat }));
        res.end();
      });
  });
}
```
