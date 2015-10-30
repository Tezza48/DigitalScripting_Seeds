#pragma strict

public class Game extends MonoBehaviour {

      private var width : int = 10;
      private var height : int = 10;
      public var tileSize : int;

      private var generator : MazeGenerator;
      private var parser : MazeParser;
      private var cells : Cell[,];

      function Start () {
            generator = GetComponent(MazeGenerator);
            parser = GetComponent(MazeParser);

            cells = generator.GenerateMaze(width, height);
            parser.Parse(cells, width, height, 4);
      }
}
