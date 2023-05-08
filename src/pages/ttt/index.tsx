import style from "./ttt.module.css";

interface SquareProps {
  text?: string;
}
function Square(props: SquareProps) {
  const { text = "" } = props;

  return (
    <button type="button" className={style.square}>
      {text}
    </button>
  );
}

function Board() {
  return (
    <>
      <div className={style["board-row"]}>
        <Square text="1" />
        <Square text="2" />
        <Square text="3" />
      </div>
      <div className={style["board-row"]}>
        <Square text="4" />
        <Square text="5" />
        <Square text="6" />
      </div>
      <div className={style["board-row"]}>
        <Square text="7" />
        <Square text="8" />
        <Square text="9" />
      </div>
    </>
  );
}

export default function TicTacToe() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info"></div>
    </div>
  );
}
