const express = require('express');
const app = express();
const port = 8000;

const apiRouters = require('./routes/api');

app.use('/api', apiRouters);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});