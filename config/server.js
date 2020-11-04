const express = require('express');
const app = express();
const path = require('path');
const { resolve } = require('./utils');
const port = process.env.NODE_PORT || 4011;

app.use(express.static('dist'));

app.get('/*', (req, res) => {
  res.sendFile(resolve('dist/index.html'))
})

app.listen(port, () => {
  console.log(``);
  console.log(`Success!!!, Port:${port}`);
  console.log(``);
})
