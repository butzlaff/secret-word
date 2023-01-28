import { useRef, useState } from 'react';
import './StartScreen.css';

const StartScreen = ({ startGame, handleGetName }) => {
  const playerNameRef = useRef();
  const [playerName, setPlayerName] = useState('');
  const [player, setPlayer] = useState('');

  const handlePlayerName = (e) => {
    e.preventDefault();
    setPlayerName(playerNameRef.current.value);
    setPlayer(playerName);
    handleGetName(playerName);
  };

  let playerHasName;

  if (!player) {
    playerHasName = (
      <form onSubmit={handlePlayerName}>
        <p>
          Player's name:
          <span>
            <input
              className='playerName'
              maxLength={15}
              min={5}
              size={15}
              required
              onChange={(e) => setPlayerName(e.target.value)}
              value={playerName}
              ref={playerNameRef}
            />
          </span>
          <button className='btn-name'>Confirm name</button>
        </p>
      </form>
    );
  } else {
    playerHasName = <p>Bem vindo {player}</p>;
  }

  return (
    <div className='start'>
      <h1>Secret Word</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      {playerHasName}
      <button onClick={startGame}>Começar o jogo</button>
    </div>
  );
};

export default StartScreen;
