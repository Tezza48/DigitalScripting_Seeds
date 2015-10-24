#pragma strict

public class MazeBinaryTree extends Game {
      public function GenerateMaze (width : int, height : int) : Cell[,] {

            var cells = new Cell[width,height];

            //for height
            for (var y = 1; y < mazeHeight; y++){
            //for width
            for (var x = 1; x < mazeWidth; x++){
                  var dirA : boolean[] = new boolean[2];
                  var north : boolean;//true = north, false = west
                  var dirCount : int = 0;
                  //can i go north
                  dirA[1] = (y > 0) ? true : false;
                  //can i go west
                  dirA[0] = (x > 0) ? true : false;
                  //pick from avilable directions
                  for (var i in dirA){
                    dirCount += i ? 1 : 0;
                  }
                  if (dirCount == 2) {
                    north = (Random.Range(0, 1) > 0.5) ? true : false;
                  } else if (dirCount == 1) {
                    if (dirA[1]) {
                      north = true;//north
                    }
                    if (dirA[0]) {
                      north = false;//west
                    }
                  }
                  //if north
                  if (north) {
                  //  cells[x, y].N()
                    cells[x, y].N();
                  //  cells[x, y-1].S()
                    cells[x, y-1].S();
                  }

                  //if west
                  if (!north) {
                  //  cells[x, y].W()
                    cells[x, y].W();
                  //  cells [x-1, y].E()
                    cells[x-1, y].E();
                  }
                  }
            }
            return cells;
      }
}
