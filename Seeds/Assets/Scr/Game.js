#pragma strict

public class Game extends MonoBehaviour
{
  @Range(5 ,15)
  public var mazeWidth : int;
  @Range(5, 15)
  public var mazeHeight : int;

  private var MazeBinaryTree : MazeBinaryTree;

  function Start () {
    MazeBinaryTree.GenerateMaze(mazeWidth, mazeHeight);
  }

  function Update () {

  }
}
