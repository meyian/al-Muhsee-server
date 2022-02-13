/*

Todo:

* Web interface
  - flip between translations
* Share
  - reddit: webdev, islam
  - hackernews

*/

const request = require("request");
const fs = require("fs");
const path = require("path");

const defaultOptions = {
  method: "GET",
  url: "http://api.quran.com/api/v3/search",
  qs: { language: "en", page: "0", size: "50", q: "love" },
  body: "{}",
};

const searchTerms = [, /* "love", "heaven", "paradise", "sign" */ "soul"];

const makeRequest = (options) => {
  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) reject(error);

      resolve(body);
    });
  });
};

const makeQuranAPIRequest = async (searchTerm, page) => {
  const qs = { language: "en", page, size: "50", q: searchTerm };
  const options = { ...defaultOptions, qs };

  console.log(options);

  const result = await makeRequest(options);
  const data = JSON.parse(result);

  return data;
};

const getNumberOfPages = async (searchTerm) => {
  const data = await makeQuranAPIRequest(searchTerm, 1);
  return data.search.total_pages;
};

const getThenSaveResultsToFile = async (searchTerm) => {
  const numPages = await getNumberOfPages(searchTerm);
  const searchResults = [];

  for (let page = 1; page <= numPages; page++) {
    const data = await makeQuranAPIRequest(searchTerm, page);
    data.search.results.forEach((element) => {
      searchResults.push({
        verse_key: element.verse_key,
        translation: element.translations[0].text,
      });
    });
  }

  const filePath = path.join(__dirname, "text", `${searchTerm}.txt`);
  fs.writeFileSync(filePath, JSON.stringify(searchResults, null, 2));
  // console.log(searchResults);
};

const main = async () => {
  searchTerms.forEach(async (searchTerm) => {
    await getThenSaveResultsToFile(searchTerm);
  });

  // makeRequest(defaultOptions).then((data) => console.log(data));
};

main();
