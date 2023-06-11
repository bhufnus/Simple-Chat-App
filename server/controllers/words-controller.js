const { easyWords, hardWords } = require("../words");

// Choose 15 words
// Make sure they aren't duplicates
// Return in sets of 3 (to choose from)

// TODO: word sizes are arbitrary, make them into constants

const buildWordSet = () => {
  const wordSet = new Set();

  while (wordSet.size < 15) {
    wordSet.add(chooseRandomWordEasy());
  }
  let wordArray = Array.from(wordSet);
  let wordGroups = [];

  for (let i = 0; i < 5; i++) {
    let group = [];
    for (let j = 0; j < 3; j++) {
      group.push(...wordArray.splice(0, 1));
    }
    wordGroups.push(group);
  }

  console.log(JSON.stringify(wordGroups));
  return wordGroups;
};

const chooseRandomWordEasy = () => {
  return easyWords[Math.floor(Math.random() * easyWords.length)];
};

// export default buildWordSet;

module.exports = { buildWordSet };
