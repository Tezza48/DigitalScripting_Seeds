#pragma strict

public class Game extends MonoBehaviour {
      @Range(5 ,15)
      public var mazeWidth : int;
      @Range(5, 15)
      public var mazeHeight : int;
      public var seed : int;
      public var tileSize : int = 5; //size of the tiles for placing tiles

      private var mazeGenerator : MazeBinaryTree;
      private var mazeParser : MazeParser;
      private var cells : Cell[,];
      private var tiles : Tiles;

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
            tiles = GetComponent(Tiles);
            mazeParser = GetComponent(MazeParser);

            cells = mazeGenerator.GenerateMaze(mazeWidth, mazeHeight, seed);

            mazeParser.ParseMaze(cells, tiles, mazeWidth, mazeHeight, tileSize);


      }

      function Update () {

      }
}
