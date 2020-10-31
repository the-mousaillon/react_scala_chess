import Chessboard from "../components/Chessboard";
import { initialBoard } from "../constants/inititialBoard";

export default function ChessPage(){
    return(
      <div style={{
        marginLeft: "400px",
        marginTop: "100px"
      }}>
        <Chessboard
        initialSize={600}
        initialChessboard={initialBoard}
        initialOrient={"white"}
      />
      </div>
    )
}