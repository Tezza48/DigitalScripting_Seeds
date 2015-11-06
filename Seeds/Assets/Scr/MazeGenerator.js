#pragma strict

public class MazeGenerator extends MonoBehaviour {
      public static var seed = 1;
      public var useSeed : boolean = false;
      private var numberCoordinates : int [] = new int[30];

      // generate the coordinates to spawn the seed fragments
      private function GenerateNumberCoords (width : int, height : int) {
            var isDiscreet : boolean;
            var tries = 0;
            for (var i = 0; i < 30; i+=3) {
                  // generate coordinate until this coordiante is discreet
                  do {
                        isDiscreet = true;
                        // set random x value
                        numberCoordinates[i] = Random.Range(0, width);
                        // set random y value
                        numberCoordinates[i + 1] = Random.Range(0, height);
                        // set tthe number to spawn at this coordinate to the index/3 (0 to 9)
                        numberCoordinates[i + 2] = i/3;
                        // check that these coordiantes are discreet (unique)
                        for (var j = 0; j < i; j+=2) {
                              if (numberCoordinates[i] == numberCoordinates[j]) isDiscreet = false;
                              if (numberCoordinates[i+1] == numberCoordinates[j+1]) isDiscreet = false;
                        }
                        if (isDiscreet)
                              print(numberCoordinates[i] + ", " + numberCoordinates[i+1]  + " = " +  numberCoordinates[i+2]);
                        else print("not discreet");
                        tries++;
                  } while (!isDiscreet && tries < 10000);
            }
      }

      function GenerateMaze (width : int, height : int) : Cell[,]{
            // generate coordinates that will spawn seed fragments
            GenerateNumberCoords(width, height);
            // do i want to spawn this maze using a seed
            if (useSeed) Random.seed = this.seed;
            // create an array of cell objects
            var cells = new Cell[width,height];
            var goNorth : boolean;
            for (var x : int = 0; x < width; x++) {
                  for (var y : int = 0; y < height; y++) {
                        if (x + y == 0) {// if we are at the origin, create an empty cell
                              cells[x,y] = new Cell();
                        } else if (x == 0) {// on the boundaries, go in the only valid direction
                              cells[x,y] = new Cell(true);// add west exit
                              if (y < height )cells[x,y-1].SetSouth(true);
                        } else if (y == 0) {
                              cells[x,y] = new Cell(false);
                              if (x < width) cells[x-1,y].SetEast(true);
                        } else {// pick randomly whether to go north or east
                              goNorth = Random.Range(0f, 1f) > 0.5 ? true : false;
                              if (goNorth) {
                                    cells[x,y] = new Cell(true);// set the exit of this cell
                                    cells[x,y-1].SetSouth(true);// set the exit of the other cell facing this
                              }
                              if (!goNorth) {
                                    cells[x,y] = new Cell(false);
                                    cells[x-1,y].SetEast(true);
                              }
                        }
                        for (var i = 0; i < 30; i+=3) {
                              if (x == numberCoordinates[i] && y == numberCoordinates[i+1]) {
                                    cells[x,y].SetNumber(numberCoordinates[i+2]);
                              }
                        }
                  }
            }
            return cells;
      }
}
/*
generate 10 coordinates







*/
