export type Player = "X" | "O";
export type Cell = Player | null;
export type Board = Cell[];

export const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

export type GameResult =
  | { status: "playing" }
  | { status: "draw" }
  | { status: "won"; winner: Player; line: readonly number[] };

export function createEmptyBoard(): Board {
  return Array<Cell>(9).fill(null);
}

export function getGameResult(board: Board): GameResult {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    const mark = board[a];

    if (mark && mark === board[b] && mark === board[c]) {
      return { status: "won", winner: mark, line };
    }
  }

  return board.every(Boolean) ? { status: "draw" } : { status: "playing" };
}

export function getNextPlayer(player: Player): Player {
  return player === "X" ? "O" : "X";
}
