#pragma strict
public class MazeParser extends Game {
      //    *     *  ask chris what a constructor is/how to use it   *     *
      public var maze : Tile[,];
      public function ParseMaze(cells : Cell[,]) : GameObject[,] {
            var tiles : GameObject[,] = new GameObject[mazeWidth, mazeHeight];
            for (var y = 0; y < mazeHeight; y++) {
                  for (var x = 0; x < mazeWidth; x++) {
                        //work out how many exits the cell has
                        //work out the orientation and

                  }
            }
      }
}
