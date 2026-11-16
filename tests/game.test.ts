import { describe, expect, it } from "vitest";
import { createEmptyBoard, getGameResult, getNextPlayer, type Board } from "../lib/game";

describe("Tic-Tac-Toe game rules", () => {
  it("creates a fresh 3×3 board", () => {
    expect(createEmptyBoard()).toEqual(Array(9).fill(null));
  });

  it.each([
    [["X", "X", "X", null, null, null, null, null, null], [0, 1, 2]],
    [["O", null, null, "O", null, null, "O", null, null], [0, 3, 6]],
    [["X", null, null, null, "X", null, null, null, "X"], [0, 4, 8]],
  ] as const)("detects a winning line", (board, line) => {
    expect(getGameResult([...board] as Board)).toEqual({
      status: "won",
      winner: board[line[0]],
      line,
    });
  });

  it("detects a full-board draw", () => {
    const board: Board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
    expect(getGameResult(board)).toEqual({ status: "draw" });
  });

  it("keeps an unfinished game in progress", () => {
    const board: Board = ["X", "O", null, null, "X", null, null, null, null];
    expect(getGameResult(board)).toEqual({ status: "playing" });
  });

  it("alternates players", () => {
    expect(getNextPlayer("X")).toBe("O");
    expect(getNextPlayer("O")).toBe("X");
  });
});
