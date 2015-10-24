#pragma strict

public class Game extends MonoBehaviour {
      @Range(5 ,15)
      public var mazeWidth : int;
      @Range(5, 15)
      public var mazeHeight : int;
      public var seed : int;

      private var mazeGenerator : MazeBinaryTree;
      private var mazeParser : MazeParser;
      private var cells : Cell[,];

      // private var Cell : Cell;
      // private var MazeBinaryTree : MazeBinaryTree;
      // private var MazeParser : MazeParser;
      // private var Tiles : Tiles;
      // private var Tile : Tile;

      // function Awake () {
	// 	DontDestroyOnLoad (transform.gameObject);
	// }
      function Start () {
            mazeGenerator = new MazeBinaryTree();
            mazeParser = new MazeParser();

            cells = mazeGenerator.GenerateMaze(mazeWidth, mazeHeight, seed);


      }

      function Update () {

      }
}
