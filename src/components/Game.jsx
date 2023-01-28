import { useState, useRef } from 'react';
import './Game.css';

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
  playersName,
}) => {
  const [letter, setLetter] = useState([]);

  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letter);
    setLetter('');

    letterInputRef.current.focus();
  };

  return (
    <div className='game'>
      {
        <p>
          Seja bem vindo <span>{playersName}</span>
        </p>
      }
      <p className='points'>
        <span>Sua pontuação atualmente é {score}</span>
      </p>
      <h1>Descubra a palavra</h1>
      <h3 className='tip'>
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas</p>
      <div className='wordContainer'>
        {letters.map((letter, index) =>
          guessedLetters.includes(letter) ? (
            <span
              className='letter'
              key={index}
            >
              {letter}
            </span>
          ) : (
            <span
              className='blankSquare'
              key={index}
            ></span>
          )
        )}
      </div>
      <div className='letterContainer'>
        <p>Tente adivinhar a letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            maxLength='1'
            name='letter'
            onChange={(e) => setLetter(e.target.value)}
            required
            value={letter}
            ref={letterInputRef}
            autoFocus
          ></input>
          <button>Jogar</button>
        </form>
      </div>
      <div className='wrongLettersContainer'>
        <p>Letras utilizadas: </p>
        {wrongLetters.map((letter, index) => (
          <span key={index}>{letter}, </span>
        ))}
      </div>
    </div>
  );
};

export default Game;
