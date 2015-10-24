#pragma strict
public class Tile extends Game{
      public var tile : GameObject;
      public var orientation : int;

      // public function Tile(tile : GameObject, orientation : int) {
      //       this.tile = tile;
      //       this.orientation = orientation;
      // }

      public function Tile (tile : GameObject) {
            this.tile = tile;
      }

      public function SetOrientation (orientation : int) {
            this.orientation = orientation;
      }

}
