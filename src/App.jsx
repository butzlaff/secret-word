//CSS
import './App.css';

//React
import { useCallback, useEffect, useState } from 'react';

//Data
import { wordsList } from './data/words';

//Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' },
];

function App() {
  //change quantity quesses
  const guessesQuantity = 5;

  const [playersName, setPlayersName] = useState('');

  const handleGetName = (player) => {
    setPlayersName(player);
  };

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState([guessesQuantity]);
  const [score, setScore] = useState([0]);

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);

  const startGame = useCallback(() => {
    //clear letters
    clearLettersState();
    // choose a word
    const { word, category } = pickWordAndCategory();
    console.log(word);
    let wordLetters = word.split('');

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // console.log(category, word);

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
    setGuesses(guessesQuantity);
  }, [pickWordAndCategory]);

  const verifyLetter = (letter) => {
    console.log(letter);
    const normalizeLetter = letter.toLowerCase();

    //checa se a letra já foi utilizada

    if (
      guessedLetters.includes(normalizeLetter) ||
      wrongLetters.includes(normalizeLetter)
    ) {
      return;
    }

    if (letters.includes(normalizeLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizeLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizeLetter,
      ]);
      setGuesses(guesses - 1);
    }
  };

  const clearLettersState = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses === 0) {
      setGameStage(stages[2].name);
      clearLettersState();
    }
  }, [guesses]);

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    if (
      guessedLetters.length === uniqueLetters.length &&
      guessedLetters.length > 0
    ) {
      setScore((actualScore) => +actualScore + 1000);

      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  const retry = () => {
    setGuesses(guessesQuantity);
    setScore(0);
    setGameStage(stages[0].name);
  };

  return (
    <div className='App'>
      {gameStage === 'start' && (
        <StartScreen
          startGame={startGame}
          handleGetName={handleGetName}
        />
      )}
      {gameStage === 'game' && (
        <Game
          // playersName={playersName}
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
          playersName={playersName}
        />
      )}
      {gameStage === 'end' && (
        <GameOver
          retry={retry}
          score={score}
        />
      )}
    </div>
  );
}

export default App;
