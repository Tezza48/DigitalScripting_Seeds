#pragma strict

public class Tiles extends MonoBehaviour {
      public var tileObjs : GameObject[];
      // tile     index exits
      // deadEnd  0     1
      // corner   1     2
      // junction 3     3
      // cross    4     4
      // hallway  2     2
      function Awake () {
            for (var i = 0; i < tileObjs; i++) {
                  if (i == 1) tiles[i] = new Tile();
            }
      }

}
