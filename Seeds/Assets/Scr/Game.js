#pragma strict

public class Game extends MonoBehaviour {
	//@Range(5, 15)
      public var width : int = 10;
     // @Range(5, 15)
      public var height : int = 10;
      public var tileSize : int;
      public static var seed : int = 1;
      private var generator : MazeGenerator;
      private var parser : MazeParser;
      private var cells : Cell[,];

      function Start () {
            generator = GetComponent(MazeGenerator);
            parser = GetComponent(MazeParser);

            cells = generator.GenerateMaze(width, height, seed);
            parser.Parse(cells, width, height, 4);
      }
}
