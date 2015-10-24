#pragma strict
public class MazeParser extends Game {
      public var maze : Tile[,];



      public function ParseMaze(cells : Cell[,], tiles : Tiles) : GameObject[,] {
            for (var y = 0; y < mazeHeight; y++) {
                  for (var x = 0; x < mazeWidth; x++) {
                        // if numExits == 1 use tileObjs 0
                        if (cells[x, y] != 1) { // maze tile = tile with same number of exits as cell and same orientation
                              maze[x, y] = new Tile(tiles.tileObjs[cells[x, y].GetNumExits()-1], cells[x, y].GetAntiClockwiseExit());
                        }
                        if (cells[x, y] == 1) {//if hallway use hallway else corner
                              maze [x, y] = new Tile(cells[x, y].isHallway() ? tiles.tileObjs[4] : tiles.tileObjs[1], cells[x, y].GetAntiClockwiseExit());
                        }
                  }
            }
      }
}
