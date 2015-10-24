#pragma strict
public class Cell {
      public var numExits : int;

      private var n : boolean;
      private var e : boolean;
      private var s : boolean;
      private var w : boolean;

      public function Cell () {
            numExits = NumExits();

      }
      // How many exits does the cell have
      function NumExits () : int {
            var i = 0;
            i += (n) ? 1 : 0;
            i += (e) ? 1 : 0;
            i += (s) ? 1 : 0;
            i += (w) ? 1 : 0;
            return i;
      }

      function N () {
        n = true;
      }
      function E () {
        e = true;
      }
      function S () {
        s = true;
      }
      function W () {
        w = true;
      }



      // function GetLength (array : Cell[]) : int {
      //       var i : int;
      //       while (i < array.length) i++;
      //       return i;
      // }
      //
      // function GetLength (array : Cell[,]) : int {
      //       var i : int;
      //       while (i < array[0].length) i++;
      //       return i;
      // }
}
