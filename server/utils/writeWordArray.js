const { easyWords, hardWords } = require("../words");
const fs = require("fs");
let lowercase = [];

// purely for dev purposes
hardWords.forEach((word) => {
  lowercase.push(word.toLowerCase());
});

fs.writeFile("lowercaseWords.js", JSON.stringify(lowercase, null, 2), (err) => {
  if (err) {
    console.error("Something went wrong:", err);
    return;
  }
  console.log("File has been created");
});
