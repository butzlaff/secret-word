import "./GameOver.css";

const GameOver = ({ retry, score }) => {
  return (
    <div>
      <h1>Game over</h1>
      <h2>
        A sua Pontuação foi: <span>{score}</span>
      </h2>
      <p>Clique no botão para reiniciar o jogo</p>
      <button onClick={retry}>Reiniciar jogo</button>
    </div>
  );
};

export default GameOver;
