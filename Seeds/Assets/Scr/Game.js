#pragma strict

public class Game extends MonoBehaviour {

      public var width : int = 5;
      public var height : int = 5;
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
