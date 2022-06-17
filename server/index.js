const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.get('/', (req, res) => {

  res.end();
})


app.get('/username/:username', (req, res) => {
  axios.get(`https://api.myanimelist.net/v2/users/${req.params.username}/animelist?fields=list_status&status=completed&limit=10`, {
    headers: {
      'X-MAL-CLIENT-ID': process.env.malClientId,
    }
  })
    .then(response => {
      // console.log(response.data.data);
      res.send(response.data.data);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});


app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});