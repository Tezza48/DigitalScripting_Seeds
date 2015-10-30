#pragma strict

public class Cell{
      // north, east, south, west
      private var exits : boolean[] = new boolean[4];
      // construct new cell with either north or west exit
      public function Cell (isNorth : boolean) {
            if (isNorth) {
                  exits[0] = true;
            } else if (!isNorth) {
                  exits[3] = true;
            }
      }
      public function Cell (){

      }

      // set east and south exits
      public function SetEast (isEast : boolean) {
            exits[1] = isEast;
      }
      public function SetSouth (isSouth : boolean) {
            exits[2] = isSouth;
      }

      // return number of exits
      public function GetNumExits () : int {
            var n : int = 0;
            for (var isExit in exits) {
                  if (isExit) n++;
            }
            return n;
      }
      // get first exit for orienting the tile
      public function GetFirstExit () : int {
            var n : int = 0;
            for (var i = 0; i < exits.length; i++) {
                  if (exits[i]) {
                        n = i;
                        break;
                  }
            }
            return n;
      }

      public function IsHallway () : boolean {
            
      }
}
