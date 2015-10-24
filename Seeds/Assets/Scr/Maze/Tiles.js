#pragma strict

public class Tiles extends Game {
      public var tileRef : GameObject[];
      public var tiles : Tile[];

      // tile     index exits
      // deadEnd  0     1
      // corner   1     2
      // hallway  2     2
      // junction 3     3
      // cross    4     4

      function Awake () {
            tiles = new Tile[tileRef.length];
            for (var i = 0 ; i < tileRef.length; i++) {
                  //tiles[i].tile = new Tile.tile(tileRef[i]);
            }
      }
}
