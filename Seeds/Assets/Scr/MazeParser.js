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
                        numExits = cells[x,y].GetNumExits();
                        firstExit = cells[x,y].GetFirstExit();
                        position = new Vector3(x * tileSize, 0, y * tileSize);
                        if (numExits == 2) {
                              // tile = Instantiate
                        }
                  }
            }
      }
}
