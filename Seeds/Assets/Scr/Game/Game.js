#pragma strict

public class Game extends MonoBehaviour {
	//@Range(5, 15)
	private var width : int = 4;
	// @Range(5, 15)
	private var height : int = 4;
	public var tileSize : int;
	public var seed : int;
	public var collectedNumbers : int;
	public var levelCounter : int = 0;

    // private var player : GameObject;
	private var generator : MazeGenerator;
	private var parser : MazeParser;
	private var cells : Cell[,];

	public static var instance:Game;

	function Start () {

		// make this object a singleton
		if ( instance == null ){
			instance = this;
			DontDestroyOnLoad(gameObject);
		} else {
			Destroy(gameObject);
		}
		// set the seed for the first level to be random
		seed = Random.Range(0, 1000);

		generator = GetComponent(MazeGenerator);
		parser = GetComponent(MazeParser);

    	StartLevel();
	}

	function StartLevel () {
		var currentWidth = width + levelCounter;
		var currentHeight = height + levelCounter;

		collectedNumbers = 0;
	    // player = GameObject.FindGameObjectWithTag("Player");
	    Time.timeScale = 1;
		// generate the maze cells
		cells = generator.GenerateMaze(currentWidth, currentHeight, seed);
		// create the maze from tile gameobjects using the data stored in the cells
		parser.Parse(cells, currentWidth, currentHeight, tileSize);
	}
	// start the level again with the new seed;
	function TerminalSubmit(seed : int) {
		// set the seed to the value submitted
		if (seed == collectedNumbers){
			levelCounter++;
			this.seed = seed;
			// reload the level
			Application.LoadLevel(Application.loadedLevel);
			// run the StartLevel again
			StartLevel();
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
