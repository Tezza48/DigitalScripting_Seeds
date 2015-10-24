#pragma strict

public class Tiles extends MonoBehaviour {
      public var tileObjs : GameObject[];
      // tile     index exits
      // deadEnd  0     1
      // corner   1     2
      // junction 2     3
      // cross    3     4
      // hallway  4     2

      // Hallway is 5 so that the parser can just skip out index 1 and assign
      // either 1 or 5 for a 2 exit tile
}
