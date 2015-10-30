#pragma strict

public class MazeGenerator extends MonoBehaviour {
      function GenerateMaze (width : int, height : int) : Cell[,]{
            var cells = new Cell[width,height];
            var goNorth : boolean;
            for (var x : int = 0; x < width; x++) {
                  for (var y : int = 0; y < height; y++) {
                        if (x + y == 0) {
                              cells[x,y] = new Cell();
                        } else if (x == 0) {
                              cells[x,y] = new Cell(true);// add west exit
                              if (y < height )cells[x,y-1].SetSouth(true);
                        } else if (y == 0) {
                              cells[x,y] = new Cell(false);
                              if (x < width) cells[x-1,y].SetEast(true);
                        } else {
                              goNorth = Random.Range(0f, 1f) > 0.5 ? true : false;
                              if (goNorth) {
                                    cells[x,y] = new Cell(true);
                                    cells[x,y-1].SetSouth(true);
                              }
                              if (!goNorth) {
                                    cells[x,y] = new Cell(false);
                                    cells[x-1,y].SetEast(true);
                              }
                        }
                  }
            }
            return cells;
      }
}
