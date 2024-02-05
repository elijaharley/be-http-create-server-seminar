**They haven't seen a POST request before and may not** **have used insomnia -
make no assumptions**

0. learning objectives
1. look at previous requests
2. look at insomnia
3. pseudocode steps to add something _read file_ _send new data from insomnia_
   _write to the file_ _send back data to confirm_
4. http.createServer - server.listen (9090)
5. log err
6. log req _How can we tell that a post request to this url has happened?_ _What
   do we need to do to build up the body of the response?_
7. req.on('data', (packet) => body += packet.toString())
8. req.on('end', () => { const newThing = JSON.parse(body)})
9. fs.readFile(path, encoding)
10. how do we get the data using promises?
11. parse data ->
12. add new thing to existing array
13. fs.writeFile(path, JSON.stringify(newThings, null, 2)) <- data, replacer -
    to update any data, spacing
14. RETURN fs.writeFile
15. send response - look at notes _What status code will the response have?_
16. res.end()
