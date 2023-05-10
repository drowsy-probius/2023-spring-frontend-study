import { useState } from "react";
import style from "./ttt.module.css";

interface SquareProps {
  value: string;
  onClick: () => void;
}
function Square(props: SquareProps) {
  const { value = "", onClick } = props;

  return (
    <button type="button" className={style.square} onClick={onClick}>
      {value}
    </button>
  );
}

type boardValue = "" | "O" | "X";
interface Log {
  idx: number;
  lastUser: boolean;
  status: boardValue[];
}
function Board() {
  const [board, setBoard] = useState<boardValue[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [log, setLog] = useState<Log[]>([]);

  const getCurrentPlayer = (currentPlayer: boolean) => currentPlayer ? "O" : "X";

  function isGameSet(board: boardValue[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      [0, 4, 8],
      [2, 4, 6],
    ];

    return lines.some((oneLine) =>
      board
        .filter((_, i) => oneLine.includes(i))
        .every((v) => v === (currentPlayer ? "O" : "X"))
    );
  }

  function copyLog(logs: Log[]) {}

  function onClickSquare(index: number) {
    return () => {
      if (isDone) return;
      if (board[index] !== "") return;

      const newBoard = board.map((b, i) =>
        i === index ? getCurrentPlayer(currentPlayer) : b
      );

      const oldLog = log.map((l) => {
        return { ...l };
      });
      setLog([
        ...oldLog,
        {
          idx: log.length,
          lastUser: currentPlayer,
          status: board,
        },
      ]);
      setBoard(newBoard);
      setCurrentPlayer(!currentPlayer);
      setIsDone(isGameSet(newBoard));
    };
  }

  function revertToLog(targetLog: Log) {
    return () => {
      setCurrentPlayer(targetLog.lastUser);
      setBoard(targetLog.status);
      setLog(log.slice(0, targetLog.idx));
      setIsDone(false);
    };
  }

  return (
    <>
      <div className={style["board-row"]}>
        <Square value={board[0]} onClick={onClickSquare(0)} />
        <Square value={board[1]} onClick={onClickSquare(1)} />
        <Square value={board[2]} onClick={onClickSquare(2)} />
      </div>
      <div className={style["board-row"]}>
        <Square value={board[3]} onClick={onClickSquare(3)} />
        <Square value={board[4]} onClick={onClickSquare(4)} />
        <Square value={board[5]} onClick={onClickSquare(5)} />
      </div>
      <div className={style["board-row"]}>
        <Square value={board[6]} onClick={onClickSquare(6)} />
        <Square value={board[7]} onClick={onClickSquare(7)} />
        <Square value={board[8]} onClick={onClickSquare(8)} />
      </div>
      {log.length > 0 && (
        <div>
          {log.map((targetLog, idx) => (
            <div key={idx + 1}>
              <button
                type="button"
                onClick={revertToLog(targetLog)}
              >{`go to #${idx}`}</button>
            </div>
          ))}
        </div>
      )}
      <div>
        {isDone
          ? `게임 끝. ${getCurrentPlayer(!currentPlayer)} 우승`
          : `현재 차례: ${getCurrentPlayer(currentPlayer)}`}
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
