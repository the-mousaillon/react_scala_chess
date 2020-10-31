import React from "react";
import { Bb, Bkn, Bk, Bp, Bq, Br, Wb, Wk, Wkn, Wp, Wq, Wr } from "./BasePieces";

const Piece = (props: any) => {
  switch (props.name) {
    case "black king":
      return <Bk />;
    case "white king":
      return <Wk />;

    case "black queen":
      return <Bq />;
    case "white queen":
      return <Wq />;

    case "black knight":
      return <Bkn />;
    case "white knight":
      return <Wkn />;

    case "black bishop":
      return <Bb />;
    case "white bishop":
      return <Wb />;

    case "black rook":
      return <Br />;
    case "white rook":
      return <Wr />;

    case "black pawn":
      return <Bp />;
    case "white pawn":
      return <Wp />;

    default:
      return null;
  }
};

export default Piece;
