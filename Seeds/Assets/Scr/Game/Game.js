#pragma strict

import System.DateTime;

public class Game extends MonoBehaviour {
	//@Range(5, 15)
	private var width : int = 4;
	// @Range(5, 15)
	private var height : int = 4;
	private var tileSize : int = 8;
	public var collectedNumbers : int;
	public var levelCounter : int = 1;
	public var totalScore : int;
	public var isRunning : boolean; // is the game running? set to false when the time runs out.
	
    // private var player : GameObject;
	private var generator : MazeGenerator;
	private var parser : MazeParser;
	private var cells : Cell[,];
	private var _LevelTimer : LevelTimer;
	private var player : GameObject;

	function Start () {
		isRunning = true;
		generator = GetComponent(MazeGenerator);
		parser = GetComponent(MazeParser);
		_LevelTimer = GetComponent.<LevelTimer>();
		player = GameObject.FindGameObjectWithTag("Player");
		
    	GenerateLevel(UtcNow.TimeOfDay.TotalMilliseconds);
	}

	function GenerateLevel (newSeed : int) {
		print ("Game Seed: " + newSeed);
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
		// activate the player and move it to the start position
		player.SetActive(true);
		player.transform.position = parser.playerPosition;
		
	}

	function Update () {
		// set whether the player can move and look
		player.GetComponent.<PlayerLook>().canLook = isRunning;
		player.GetComponent.<PlayerMove>().canMove = isRunning;
	}
	
	// start the level again with the new seed
	function TerminalSubmit(seed : int) {
		// set the seed to the value submitted
		if (seed == collectedNumbers){
			// add to the score for each number in the seed
			totalScore += GetDigits(seed) * levelCounter;
			// incriment the level counter
			levelCounter++;
			Destroy(parser.maze);
			// generate a new maze
			GenerateLevel(seed);
			// set the cursor preferances again
			Cursor.lockState = CursorLockMode.Locked;
			Cursor.visible = false;
		}
		else {
			// deduct the time penalty
			_LevelTimer.TimePenalty();
		}
	}

	function NoTimeLeft(){
		Debug.Log("No Time Left!");
		isRunning = false;
	}

	function CollectNumber (number : int){
		collectedNumbers *= 10;
		collectedNumbers += number;
	}
	
	function GetDigits(number : int) : int{
		// return the number of digits in the int
		var log10 = Mathf.Log10(number);
		var digits = Mathf.Floor(log10) + 1;
		return digits;
	}
}
