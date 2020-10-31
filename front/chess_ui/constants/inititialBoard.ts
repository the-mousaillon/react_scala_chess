const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

const blackSide = {
  A8: {
    key: "A8",
    pos: "A8",
    color: "white",
    faction: "black",
    marked: false,
    piece: "black rook"
  },
  B8: {
    key: "B8",
    pos: "B8",
    color: "black",
    faction: "black",
    marked: false,
    piece: "black knight"
  },
  C8: {
    key: "C8",
    pos: "C8",
    color: "white",
    faction: "black",
    marked: false,
    piece: "black bishop"
  },
  D8: {
    key: "D8",
    pos: "D8",
    color: "black",
    faction: "black",
    marked: false,
    piece: "black queen"
  },
  E8: {
    key: "E8",
    pos: "E8",
    color: "white",
    faction: "black",
    marked: false,
    piece: "black king"
  },
  F8: {
    key: "F8",
    pos: "F8",
    color: "black",
    faction: "black",
    marked: false,
    piece: "black bishop"
  },
  G8: {
    key: "G8",
    pos: "G8",
    color: "white",
    faction: "black",
    marked: false,
    piece: "black knight"
  },
  H8: {
    key: "H8",
    pos: "H8",
    color: "black",
    faction: "black",
    marked: false,
    piece: "black rook"
  }
};

const whiteSide = {
  A1: {
    key: "A1",
    pos: "A1",
    color: "black",
    faction: "white",
    marked: false,
    piece: "white rook"
  },
  B1: {
    key: "B1",
    pos: "B1",
    color: "white",
    faction: "white",
    marked: false,
    piece: "white knight"
  },
  C1: {
    key: "C1",
    pos: "C1",
    color: "black",
    faction: "white",
    marked: false,
    piece: "white bishop"
  },
  D1: {
    key: "D1",
    pos: "D1",
    color: "white",
    faction: "white",
    marked: false,
    piece: "white queen"
  },
  E1: {
    key: "E1",
    pos: "E1",
    color: "black",
    faction: "white",
    marked: false,
    piece: "white king"
  },
  F1: {
    key: "F1",
    pos: "F1",
    color: "white",
    faction: "white",
    marked: false,
    piece: "white bishop"
  },
  G1: {
    key: "G1",
    pos: "G1",
    color: "black",
    faction: "white",
    marked: false,
    piece: "white knight"
  },
  H1: {
    key: "H1",
    pos: "H1",
    color: "white",
    faction: "white",
    marked: false,
    piece: "white rook"
  }
};

const balckPawns = Object.fromEntries(
  letters.map((l, i) => [
    `${l}7`,
    {
      key: `${l}7`,
      pos: `${l}7`,
      marked: false,
      color: i % 2 === 1 ? "white" : "black",
      faction: "black",
      piece: "black pawn"
    }
  ])
);

const whitePawns = Object.fromEntries(
  letters.map((l, i) => [
    `${l}2`,
    {
      key: `${l}2`,
      pos: `${l}2`,
      marked: false,
      color: i % 2 === 0 ? "white" : "black",
      faction: "white",
      piece: "white pawn"
    }
  ])
);

const emptyCells = Object.fromEntries(
  [6, 5, 4, 3]
    .map((n, i) =>
      letters.map((l, j) => [
        `${l}${n}`,
        {
          key: `${l}${n}`,
          pos: `${l}${n}`,
          marked: false,
          color: (i + j) % 2 === 1 ? "black" : "white",
          faction: null,
          piece: null
        }
      ])
    )
    .flat()
);

export const initialBoard = {
  ...blackSide,
  ...balckPawns,
  ...emptyCells,
  ...whitePawns,
  ...whiteSide
};
