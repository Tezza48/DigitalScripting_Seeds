#pragma strict
public class MazeParser extends Game {
      private var maze : Tile[,];
      private var mazeTile : GameObject;
      private var mazeHolder : GameObject;

      public function ParseMaze(cells : Cell[,], tiles : Tiles/*, mazeWidth : int, mazeHeight : int*/, tileSize : int) {
            maze = new Tile[cells.length, cells.length]; // needs to get height properly must fix
            mazeHolder = Instantiate(new GameObject("Maze Holder"), new Vector2(0, 0), Quaternion.identity);

            for (var y = 0; y < mazeHeight; y++) {
                  for (var x = 0; x < mazeWidth; x++) {
                        // if numExits == 1 use tileObjs 0
                        if (cells[x, y] != 1) { // maze tile = tile with same number of exits as cell and same orientation
                              maze[x, y] = new Tile(tiles.tileObjs[cells[x, y].GetNumExits() - 1], cells[x, y].GetAntiClockwiseExit());
                        }
                        if (cells[x, y] == 1) {//if hallway use hallway else corner
                              maze [x, y] = new Tile(cells[x, y].IsHallway() ? tiles.tileObjs[4] : tiles.tileObjs[1], cells[x, y].GetAntiClockwiseExit());
                        }
                        mazeTile = Instantiate(maze[x, y].GetTile(), transform.localPosition + Vector2(x * tileSize, y * tileSize), Quaternion.identity);
                  }
            }
      }
}
