import { initialBoard } from "../constants/inititialBoard";
import { calcTranslate } from "../utils/chessboard";

const modifySquare = (chessboard, pos, newProps) => ({
    ...chessboard, [pos]: { ...chessboard[pos], ...newProps }
})

export const changeOrientAction = state => ({
    ...state, orient: state.orient === "white" ? "black" : "white"
})

export const resetBoardAction = state => ({ ...state, chessboard: initialBoard })

export const animateMoveAction = (from: any, to: any, duration: any) => state => {
    const [translateX, translateY] = calcTranslate(from, to, state.orient, state.size)
    return {
        ...state,
        locked: true,
        chessboard: modifySquare(state.chessboard, from, {
            translateX: translateX,
            translateY: translateY,
            transitionDuration: duration
        })
    }
}

export const movePieceAction = (from: any, to: any) => state => ({
    ...state,
    chessboard:
        modifySquare(
            modifySquare(state.chessboard, from, {
                transitionDuration: null,
                translateX: null,
                translateY: null,
                opacity: null,
                faction: null,
                piece: null
            })
            , to, {
            transitionDuration: null,
            translateX: null,
            translateY: null,
            opacity: null,
            faction: state.chessboard[from].faction,
            piece: state.chessboard[from].piece
        })
})

export const addPieceAction = (pos: any, piece: any, faction: any) => state => ({
    ...state,
    chessboard: modifySquare(state.chessboard, pos, {
        piece: piece, faction: faction
    })
})

export const removePieceAction = (pos: any) => state => ({
    ...state,
    chessboard: modifySquare(state.chessboard, pos, { piece: null, faction: null })
})

export const fadePieceAction = (pos: any, duration: any) => state => ({
    ...state,
    locked: true,
    chessboard: modifySquare(state.chessboard, pos, {
        transitionDuration: duration,
        opacity: "0%"
    })
})

export const animationDoneAction = state => ({
    ...state,
    locked: false
})

export const setDragging = isDragging => state => ({
    ...state,
    isDragging: isDragging
})

export const mouseAction = (eventType, pos) => ({
    type: "SQUARE_MOUSE",
    props: {
        mouseEventType: eventType,
        pos: pos
    }
})

export const setCurrentSelection = (pos) => state => ({ ...state, currentSelection: pos })