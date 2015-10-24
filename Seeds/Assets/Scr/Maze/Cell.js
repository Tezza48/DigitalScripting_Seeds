#pragma strict
public class Cell {
      public function Cell(north : boolean) {
            if (north) north = true;
            if (!north) west = true;
      }
      public var numExits : int;

      private var north : boolean;
      private var east : boolean;
      private var south : boolean;
      private var west : boolean;

      public function Cell () {
            numExits = NumExits();
      }
      // How many exits does the cell have
      function NumExits () : int {
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
}
