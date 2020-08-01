const fs = require('fs');
const path = require('path');

const express = require('express');
const Busboy = require('busboy');

const app = express();
const port = 8080;

app.use(express.static('public'));

app.post('/deploy', (req, res) => {
  const busboy = new Busboy({headers: req.headers});
  
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const saveTo = path.resolve( __dirname, './public', filename);
    file.pipe(fs.createWriteStream(saveTo))
  });

  busboy.on('finish', () => {
    res.writeHead(200, { 'Connection': 'close' });
    res.end('The deploy finished successfully')
  });

  return req.pipe(busboy);
});

app.listen(port, () => {
  console.log(`Developer portal listening at port ${port}.`);
});