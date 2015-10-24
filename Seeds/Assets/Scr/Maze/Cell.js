#pragma strict
public class Cell {
      public function Cell(north : boolean) {
            if (north) north = true;
            if (!north) west = true;
      }

      private var numExits : int;
      private var north : boolean;
      private var east : boolean;
      private var south : boolean;
      private var west : boolean;

      public function Cell () {
            numExits = SetNumExits();
      }
      // How many exits does the cell have
      function SetNumExits () : int {
            var i = 0;
            i += (north) ? 1 : 0;
            i += (east) ? 1 : 0;
            i += (south) ? 1 : 0;
            i += (west) ? 1 : 0;
            return i;
      }

      function SetE () {
        east = true;
      }
      function SetS () {
        south = true;
      }

      function GetNumExits () : int{
            return this.numExits;
      }

      function GetAntiClockwiseExit () : int {
            if (north) return 0;
            else if (east) return 1;
            else if (south) return 2;
            else if (west) return 3;
      }
}
