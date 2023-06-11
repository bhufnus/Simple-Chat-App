import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentWord } from "../store/slices/game";

function Words() {
  const dispatch = useDispatch();
  const { words } = useSelector((state) => state.game);
  const { currentLevelIndex } = useSelector((state) => state.game);
  const [selectedWord, setSelectedWord] = useState(null);

  let currentWords = words[currentLevelIndex];

  const handleWordClick = (word) => {
    console.log(`You clicked: ${word}`);
    dispatch(setCurrentWord(word));
    setSelectedWord(word);
  };

  return (
    <div>
      {currentWords &&
        currentWords.map((word, index) => {
          const isSelected = word === selectedWord;
          const wordStyle = isSelected ? { backgroundColor: "green" } : {};

          return (
            <span
              className="word-select"
              key={index}
              onClick={() => handleWordClick(word)}
              style={{ cursor: "pointer", ...wordStyle }}
            >
              {word}
            </span>
          );
        })}
    </div>
  );
}

export default Words;
