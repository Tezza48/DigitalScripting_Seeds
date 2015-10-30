#pragma strict

public class MazeParser extends MonoBehaviour {
      public var tiles : GameObject[];

      private var numExits : int;
      private var firstExit : int;
      private var position : Vector3;
      private var tile : GameObject;
      public function Parse (cells : Cell[,], width : int, height : int, tileSize : int) {
            for (var x = 0; x < width; x++) {
                  for (var y = 0; y < height; y++) {
                        var numExits = cells[x,y].GetNumExits();
                        if (numExits > 2) {
                        	Debug.LogWarning("cell has " + numExits + " exits!");
                        }
                        firstExit = cells[x,y].GetFirstExit();
                        position = new Vector2(x * tileSize, -y * tileSize);
                        var currentCell = cells[x,y];
                        if (numExits == 2) {
                        var isHallway = cells[x,y].IsHallway();
                              if (isHallway) {
                                    tile = Instantiate(tiles[4], position, Quaternion.Euler(Vector3(0, 0, -90 * firstExit)));
                                    tile.name += "(" + x + ", " + y + ")";
                              } else {
                                    tile = Instantiate(tiles[numExits - 1], position, Quaternion.Euler(Vector3(0, 0, -90 * firstExit)));
                                    tile.name += "(" + x + ", " + y + ")";
                              }
                        } else {
                              tile = Instantiate(tiles[numExits - 1], position, Quaternion.Euler(Vector3(0, 0, -90 * firstExit)));
                              tile.name += "(" + x + ", " + y + ")";
                        }
                  }
            }
      }
}
