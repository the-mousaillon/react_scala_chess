import * as React from "react";
import dynamic from "next/dynamic";
import Piece from "./Piece";
import { changeOrientAction, resetBoardAction, animationDoneAction, animateMoveAction, mouseAction, fadePieceAction, removePieceAction, addPieceAction, movePieceAction, setCurrentSelection } from "../actions/chessboardActions"
import chessboardReducer from "../reducers/chessboardReducer"
import playReducer from "../reducers/playReducer"
import { keyToCoord, calcBorder } from "../utils/chessboard"
import { initialBoard } from "../constants/inititialBoard";

const Draggable = dynamic(() => import("./Daggable"), { ssr: false });

const Square = (props: any) => {
  const [rowNb, colNb] = keyToCoord(props.pos, props.orient);
  const backgroundColor = props.color === "black" ? "lightblue" : "white";
  const backGroudCapture = props.capture
    ? "radial-gradient(transparent 0%, transparent 80%, rgba(20,85,0,0.3) 80%)"
    : "";
  const backgroundMarked = props.marked
    ? "radial-gradient(rgba(20,85,30,0.5) 19%, rgba(0,0,0,0) 20%)"
    : "";
  const adjustedsize = Math.round(props.boardSize / 8);
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        background: `${backgroundColor} ${backGroudCapture} ${backgroundMarked}`,
        transitionDuration: "1s",
        gridRow: rowNb,
        gridColumn: colNb,
        ...calcBorder(rowNb, colNb, "2px solid black")
      }}
      onMouseDown={() => props.playDispacher(mouseAction("down", props.pos))}
      onMouseUp={() => {
        console.log("mouseup on square --> ", props.pos)
        props.playDispacher(mouseAction("up", props.pos))
      }
    }
    >
      <Draggable
        centeringX={adjustedsize / 2}
        centeringY={adjustedsize / 2}
        resetTranslate={true}
        pos={props.pos}
      >
        <div
          style={{
            pointerEvents: "none",
            transitionDuration: props.transitionDuration || "0s",
            opacity: props.opacity || "100%",
            transform: `translate(
            ${props.translateX || 0}px, 
            ${props.translateY || 0}px)`
          }}
        >
          <Piece name={props.piece} />
        </div>
      </Draggable>
    </div>
  );
};

const movePieceAnimated = (from: any, to: any, dispatch: any) => {
  return new Promise((done) => {
    dispatch(animateMoveAction(from, to, "0.5s"));
    setTimeout(() => dispatch(fadePieceAction(to, "0.2s")), 300)
    setTimeout(() => {
      dispatch(movePieceAction(from, to))
      done();
    }, 500);
  });
};

const movePiece = (from: any, to: any, dispatch: any) => dispatch(movePieceAction(from, to))

const basicPlayFn = dispatch => (play: {from: any, to: any}, animate: boolean) => {
  console.log("dispatched", animate, play)
  if (play.from.faction !== null && play.from.pos !== play.to.pos){
    if (animate){
      movePieceAnimated(play.from.pos, play.to.pos, dispatch).then(
        () => dispatch(state => animationDoneAction(setCurrentSelection(null)(state))))
    }
    else {
      console.log("shold play --> ", play)
      movePiece(play.from.pos, play.to.pos, dispatch)
      dispatch(setCurrentSelection(null))
    }
  }
  else {
      dispatch(setCurrentSelection(play.to))
  }
}

const testSequence = (dispatch: any) => {
  // G1 -> F3 | D7 -> D5 | F3 -> D5
  movePieceAnimated("G1", "F3", dispatch).then(() =>
  movePieceAnimated("E7", "E5", dispatch).then(() => movePieceAnimated("F3", "E5", dispatch))
  );
};

const Chessboard = (props: any) => {
  const [state, dispatch] = React.useReducer(chessboardReducer, {
    chessboard: props.initialChessboard,
    size: props.initialSize,
    orient: props.initialOrient,
    isDragging: false,
    locked: false
  });
  React.useEffect(
    () => console.log(state.locked)
  , [state.locked])
  const playDispacher = playReducer(dispatch, state, basicPlayFn)
  const adjustedsize = Math.round(state.size / 8);
  return (
    <div>
      <div
        style={{
          height: adjustedsize * 8,
          width: adjustedsize * 8,
          display: "grid",
          transitionDuration: "1s",
          gridTemplateColumns: `repeat(8, ${adjustedsize}px)`,
          gridTemplateRows: `repeat(8, ${adjustedsize}px)`,
          boxSizing: "border-box"
        }}
      >
        {Object.entries(state.chessboard).map(([key, squareProps]) => (
          <Square
            {...squareProps}
            orient={state.orient}
            boardSize={state.size}
            playDispacher={playDispacher}
            key={key}
          />
        ))}
      </div>
      <div style={{
        marginTop: "50px"
      }}>

        <button onClick={() => dispatch(changeOrientAction)}>
          change orient !!!
      </button>
        <button
          onClick={() => dispatch(addPieceAction("D4", "black rook", "black"))}
        >
          add black rook to D4 !!!
      </button>
        <button onClick={() => dispatch(removePieceAction("E1"))}>
          remove white king !!!
      </button>
        <button onClick={() => dispatch(animateMoveAction("G1", "F3", "0.5s"))}>
          tarnslate white knight to F3!!!
      </button>
        <button onClick={() => dispatch(fadePieceAction("B1", "0.2s"))}>
          fade B1!!!
      </button>
        <button onClick={() => dispatch(resetBoardAction)}>
          reset the board!!!
      </button>
        <button onClick={() => testSequence(dispatch)}>TEST SEQUENCE !!!</button>
      </div>
    </div>
  );
};

export default Chessboard;
