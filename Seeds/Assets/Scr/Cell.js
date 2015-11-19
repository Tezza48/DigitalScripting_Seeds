#pragma strict

public class Cell{
      // north, east, south, west
      private var exits : boolean[] = new boolean[4];
      // does this cell have a number/seed fragment in it?
      // private var hasNumber : boolean = false;
      // private var number : int = 10;

      // is this cell the player start?
      // private var isStart : boolean = false;
      // is this cell the exit?
      // private var isFinish : boolean = false;
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
      // public function SetNumber (number : int) {
      //       hasNumber = true;
      //       this.number = number;
      // }

      // return number of exits
      public function GetNumExits () : int {
            var n : int = 0;
            for (var i = 0; i < exits.length; i++) {
                  if (exits[i]) n++;
            }
            return n;
      }
      // public function HasNumber () : boolean {
      //       return hasNumber;
      // }
      // public function GetNumber () : int {
      //       return number;
      // }
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
      // is this cell a halway? only call if the cell has two exits.
      public function IsHallway () : boolean {
      	if (GetFirstExit() >= 2) {
      		return false;
  		} else {
            return exits[GetFirstExit() + 2];
        }
      }
}
