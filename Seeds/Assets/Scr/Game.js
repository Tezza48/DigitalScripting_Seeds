#pragma strict

public class Game extends MonoBehaviour {
      @Range(5 ,15)
      public var mazeWidth : int;
      @Range(5, 15)
      public var mazeHeight : int;
      public var seed : int;


      private var Cell : Cell;
      private var MazeBinaryTree : MazeBinaryTree;
      private var MazeParser : MazeParser;
      private var Tiles : Tiles;
      private var Tile : Tile;

      function Start () {
            //MazeBinaryTree.GenerateMaze(mazeWidth, mazeHeight);
      }

      function Update () {

      }
}
