#pragma strict

import System.DateTime;

public class Game extends MonoBehaviour {
	//@Range(5, 15)
	private var width : int = 4;
	// @Range(5, 15)
	private var height : int = 4;
	private var tileSize : int = 8;
	public var collectedNumbers : int;
	public var levelCounter : int = 0;

    // private var player : GameObject;
	private var generator : MazeGenerator;
	private var parser : MazeParser;
	private var cells : Cell[,];

	public static var instance:Game;

	function Start () {
		// make this object a singleton
		
		generator = GetComponent(MazeGenerator);
		parser = GetComponent(MazeParser);
		
		
    	GenerateLevel(UtcNow.TimeOfDay.TotalMilliseconds);
	}

	function GenerateLevel (newSeed : int) {
		print ("Game Seed: " + newSeed);
	
	    Time.timeScale = 1;
		collectedNumbers = 0;
	    
	    // width and height of the level should be incrimented with the level counter
	    // makes the game harder as the player progresses
		var currentWidth = width + levelCounter;
		if (levelCounter % 2 == 0)
			var currentHeight = height + levelCounter;
		else
			currentHeight = height + levelCounter - 1;
		
		// generate the maze cells
		cells = generator.GenerateMaze(currentWidth, currentHeight, newSeed);
		// create the maze from tile gameobjects using the data stored in the cells
		parser.Parse(cells, currentWidth, currentHeight, tileSize);
		
	}
	
	// start the level again with the new seed
	function TerminalSubmit(seed : int) {
		// set the seed to the value submitted
		if (seed == collectedNumbers){
		// incriment the level counter
			levelCounter++;
			Destroy(parser.maze);
			// generate a new maze
			GenerateLevel(seed);
		}
	}

	function NoTimeLeft(){
		Time.timeScale = 0;
		Debug.Log("No Time Left!");
	}

	function CollectNumber (number : int){
		collectedNumbers *= 10;
		collectedNumbers += number;
	}
}
