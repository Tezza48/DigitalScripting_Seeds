#pragma strict

public class Game extends MonoBehaviour {
	//@Range(5, 15)
	public var width : int = 10;
	// @Range(5, 15)
	public var height : int = 10;
	public var tileSize : int;
	public var seed : int;
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
	    // player = GameObject.FindGameObjectWithTag("Player");
		
		// generate the maze cells
		cells = generator.GenerateMaze(width, height, seed);
		// create the maze from tile gameobjects using the data stored in the cells
		parser.Parse(cells, width, height, tileSize);
	}
	// start the level again with the new seed;
	function TerminalSubmit(seed : int) {
		// set the seed to the value submitted
		this.seed = seed;
		// reload the level
		Application.LoadLevel(Application.loadedLevel);
		// run the StartLevel again
		StartLevel();
	}
}
