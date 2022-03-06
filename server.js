const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getQuranTerms } = require("./quran_controller");

const app = express();

//required middlware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3333;

app.get("/v1/verses", (req, res) => {
  const { term } = req.query;

  (async () => {
    const termData = await getQuranTerms(term);

    console.log(termData);
    res.send(termData);
  })();
});

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Server listening on port ${PORT}`);
});
