const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.end();
});

app.get('/username/:username', (req, res) => {
  axios({
    url: `https://api.myanimelist.net/v2/users/${req.params.username}/animelist`,
    method: 'get',
    headers: {
      'X-MAL-CLIENT-ID': process.env.malClientId,
    },
    params: {
      fields: 'list_status,start_date,end_date',
      limit: 40,
      status: 'completed',
    },
  })
    .then((response) => {
      res.send(response.data.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
