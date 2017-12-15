const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const dbHelper = require('../mongod/mongoBeta.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json()); // honestly I don't think I'll ever use this

app.get('/', (req, res) => {
  dbHelper.simpler();
  res.send('Hello World!');
});

app.post('/viewed', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
  // { videoID, userID, isAutoplay, progress, totalLength }
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}!`))
