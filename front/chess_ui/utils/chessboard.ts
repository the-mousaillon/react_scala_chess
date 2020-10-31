export const keyToCoord = (pos: string, orient = "white") => {
    const shiftRow = orient === "white" ? 8 : -1;
    const shiftCol = orient === "white" ? -1 : 8;
    const [col, row] = pos;
    const colNb = Math.abs(shiftCol - (col.charCodeAt(0) - 65));
    const rowNb = Math.abs(shiftRow - (parseInt(row, 10) - 1));
    return [rowNb, colNb];
};

export const calcTranslate = (from: any, to: any, orient: any, boardSize: any) => {
    const [fromCoord, toCoord] = [from, to].map((pos) =>
        keyToCoord(pos, orient).map((x) => x * Math.round(boardSize / 8))
    );
    console.log(fromCoord, toCoord);
    const translateX = toCoord[1] - fromCoord[1];
    const translateY = toCoord[0] - fromCoord[0];
    return [translateX, translateY];
};

export const calcBorder = (rowNb: number, colNb: number, border: string) => {
    const [t, b, l, r] = [
      rowNb === 1,
      rowNb === 8,
      colNb === 1,
      colNb === 8
    ]
    return {
      borderTop: t ? border : null,
      borderBottom: b ? border : null,
      borderLeft: l ? border : null,
      borderRight: r ? border : null
    }
  }