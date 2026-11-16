"use client";

import Image from "next/image";
import { useMemo, useState, type CSSProperties } from "react";
import {
  createEmptyBoard,
  getGameResult,
  getNextPlayer,
  type Board,
  type Player,
} from "@/lib/game";

type Scores = Record<Player, number> & { draws: number };

const INITIAL_SCORES: Scores = { X: 0, O: 0, draws: 0 };
const CONFETTI = Array.from({ length: 18 }, (_, index) => index);
const PLAYER_NAMES: Record<Player, string> = { X: "Sword", O: "Shield" };

export function TicTacToe() {
  const [board, setBoard] = useState<Board>(createEmptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [scores, setScores] = useState<Scores>(INITIAL_SCORES);
  const [round, setRound] = useState(1);

  const result = useMemo(() => getGameResult(board), [board]);
  const winningCells = result.status === "won" ? result.line : [];

  const status =
    result.status === "won"
      ? `${PLAYER_NAMES[result.winner]} wins!`
      : result.status === "draw"
        ? "It's a draw!"
        : `${PLAYER_NAMES[currentPlayer]}'s turn`;

  function playCell(index: number) {
    if (board[index] || result.status !== "playing") return;

    const nextBoard = [...board];
    nextBoard[index] = currentPlayer;
    const nextResult = getGameResult(nextBoard);

    setBoard(nextBoard);

    if (nextResult.status === "won") {
      setScores((previous) => ({
        ...previous,
        [nextResult.winner]: previous[nextResult.winner] + 1,
      }));
      return;
    }

    if (nextResult.status === "draw") {
      setScores((previous) => ({ ...previous, draws: previous.draws + 1 }));
      return;
    }

    setCurrentPlayer(getNextPlayer(currentPlayer));
  }

  function startNewGame() {
    setBoard(createEmptyBoard());
    setCurrentPlayer("X");
    setRound((previous) => previous + 1);
  }

  function resetMatch() {
    setScores(INITIAL_SCORES);
    setRound(1);
    setBoard(createEmptyBoard());
    setCurrentPlayer("X");
  }

  return (
    <section className="game-card" id="game" aria-label="Tic-Tac-Toe game">
      {result.status === "won" && (
        <div className="confetti" aria-hidden="true">
          {CONFETTI.map((piece) => (
            <i key={piece} style={{ "--piece": piece } as CSSProperties} />
          ))}
        </div>
      )}

      <div className="game-topline">
        <p>Round {String(round).padStart(2, "0")}</p>
        <p>First to three in a row</p>
      </div>

      <div className={`status-panel status-${result.status}`} aria-live="polite">
        <span className="status-kicker">
          {result.status === "playing" ? "Now playing" : "Round complete"}
        </span>
        <strong>{status}</strong>
      </div>

      <div className="board" role="grid" aria-label="Tic-Tac-Toe board">
        {board.map((cell, index) => {
          const row = Math.floor(index / 3) + 1;
          const column = (index % 3) + 1;
          const isWinningCell = winningCells.includes(index);

          return (
            <button
              className={`cell ${cell ? `cell-${cell.toLowerCase()}` : ""} ${isWinningCell ? "cell-winning" : ""}`}
              disabled={Boolean(cell) || result.status !== "playing"}
              key={index}
              onClick={() => playCell(index)}
              role="gridcell"
              aria-label={`Row ${row}, column ${column}: ${cell ? PLAYER_NAMES[cell] : "empty"}`}
            >
              <span aria-hidden="true">{cell && <PlayerMark player={cell} />}</span>
            </button>
          );
        })}
      </div>

      <div className="scoreboard" aria-label="Match scoreboard">
        <Score label="Sword" score={scores.X} tone="x" />
        <Score label="Draws" score={scores.draws} tone="draw" />
        <Score label="Shield" score={scores.O} tone="o" />
      </div>

      <div className="game-actions">
        <button className="new-game-button" onClick={startNewGame} type="button">
          <span>New game</span>
          <span aria-hidden="true">↗</span>
        </button>
        <button className="reset-button" onClick={resetMatch} type="button">
          Reset score
        </button>
      </div>
    </section>
  );
}

function PlayerMark({ player, compact = false }: { player: Player; compact?: boolean }) {
  return (
    <Image
      alt=""
      className={`mark-icon mark-${player === "X" ? "sword" : "shield"}`}
      draggable={false}
      height={player === "X" ? 1254 : 1199}
      sizes={compact ? "22px" : "(max-width: 640px) 24vw, 160px"}
      src={player === "X" ? "/marks/sword-wide.png" : "/marks/shield.png"}
      width={player === "X" ? 1254 : 1312}
    />
  );
}

function Score({ label, score, tone }: { label: string; score: number; tone: "x" | "o" | "draw" }) {
  const player = tone === "x" ? "X" : tone === "o" ? "O" : null;

  return (
    <div className={`score score-${tone}`}>
      <span className="score-label">
        {player && (
          <i className="score-mini-mark" aria-hidden="true">
            <PlayerMark compact player={player} />
          </i>
        )}
        {label}
      </span>
      <strong>{String(score).padStart(2, "0")}</strong>
    </div>
  );
}
