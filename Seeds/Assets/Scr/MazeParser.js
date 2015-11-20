#pragma strict
/*    *     *     *     *     *     *     *     *     *     *     *     *     *     *
            Instatiate Maze tiles on the grid and add seed fragments
 *    *     *     *     *     *     *     *     *     *     *     *     *     *     */
public class MazeParser extends MonoBehaviour {
      public var tiles : GameObject[];

      public var numbers : GameObject[] = new GameObject[10];

      private var numExits : int;
      private var firstExit : int;
      private var position : Vector3;
      private var rotation : Vector3;
      private var tile : GameObject;
      public function Parse (cells : Cell[,], width : int, height : int, tileSize : int) {
            // Create a parent object to contain all of the maze tiles
            var maze = Instantiate(new GameObject("Maze"), transform.position, Quaternion.identity);
            maze.AddComponent(Maze);
            maze.GetComponent(Maze).maze = new GameObject[width, height];
            for (var x = 0; x < width; x++) {
                  for (var y = 0; y < height; y++) {
                  
                        // get the number of exits the cell has
                        var numExits = cells[x,y].GetNumExits();
                        
                        // find the orientation of the cell
                        firstExit = cells[x,y].GetFirstExit();
                        
                        // where to instantiate the tile
                        position = new Vector3(x * tileSize, 0, -y * tileSize);
                        
                        // what rotation to instantiate it at
                        rotation = new Vector3(0, 90 * firstExit, 0);
                        
                        // if 2 exits use check if it's a hallway or a corner
                        if (numExits == 2) {
                              var isHallway = cells[x,y].IsHallway();
                              if (isHallway) {
                                    tile = Instantiate(tiles[4], position, Quaternion.Euler(rotation));
                                    tile.name += "(" + x + ", " + y + ")";
                              } else {
                                    tile = Instantiate(tiles[numExits - 1], position, Quaternion.Euler(rotation));
                                    tile.name += "(" + x + ", " + y + ")";
                              }
                        } else {
                              // spawn a tile from the tile array depending on how many exits it has
                              tile = Instantiate(tiles[numExits - 1], position, Quaternion.Euler(rotation));
                              tile.name += "(" + x + ", " + y + ")";
                        }
                        
                        // to be used when placing numbers
                        
                        // if (cells[x,y].HasNumber) {
                        //       // if the cell is meant to spawn a number/seed fragment, spawn it
                        //       Instantiate(numbers[cells[x,y].GetNumber()], position, Quaternion.identity);
                        // }
                        
                        // make the current time a chilg of the maze gameobject to keef the hierachy clean
                        maze.GetComponent(Maze).maze[x,y] = tile;
                        tile.transform.parent = maze.transform;
                  }
            }
      }
}
