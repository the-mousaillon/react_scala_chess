import { initialBoard } from "../constants/inititialBoard"
import { calcTranslate } from "../utils/chessboard"
import playReducer from "./playReducer"


const chessboardReducer = (state: any, action: any) => {
  return action(state)
}

export default chessboardReducer
