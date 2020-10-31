import { stat } from "fs"
import { setCurrentSelection, setDragging } from "../actions/chessboardActions"

const playReducer = (dispatch: any, state: any, playFn) => (action: any) => {
    if (state.locked) {
        return
    }
    else {
        const from = state.currentSelection
        const to = action.props.pos && state.chessboard[action.props.pos]
        const play = { from: from, to: to }
        switch (action.props.mouseEventType) {
            case "down":
                dispatch(setDragging(true))
                if (from) {
                    playFn(dispatch)(play, true)
                }
                else {
                    dispatch(setCurrentSelection(to))
                }
                break;

            case "up":
                console.log("is dragging -> ", state.isDragging)
                if (from && state.isDragging) {
                    console.log("dispatching dragevent -> ")
                    dispatch(setDragging(false))
                    playFn(dispatch)(play, false)
                }
                break;
        }
    }

}

export default playReducer