**They haven't seen a POST request before and may not have used insomnia - make no assumptions**

0. learning objectives
1. look at previous requests
2. look at insomnia
3. pseudocode steps to add something
4. http.createServer - server.listen (9090)
5. log err
6. log req
7. req.on('data', (packet) => body+= packet.toString())
8. req.on('end', () => { const newThing = JSON.parse(body)})
9. fs.readFile(path, encoding)
10. how do we get the data using promises?
11. parse data
12. add new thing to existing array
13. fs.writeFile(path, JSON.stringify(newThings, null, 2)) <- what are the args?
14. RETURN fs.writeFile
15. send response - look at notes
16. res.end()
