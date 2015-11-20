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
		if ( instance == null ){
			instance = this;
			DontDestroyOnLoad(gameObject);
		} else {
			Destroy(gameObject);
		}
		
		seed = Random.Range(0, 1000);
    	StartLevel();
	}

	function StartLevel () {
		Time.timeScale = 1;
	    // player = GameObject.FindGameObjectWithTag("Player");
		generator = GetComponent(MazeGenerator);
		parser = GetComponent(MazeParser);

		cells = generator.GenerateMaze(width, height, seed);
		parser.Parse(cells, width, height, 4);
	}
	// start the level again with the new seed;
	function TerminalSubmit(seed : int) {
		this.seed = seed;
		Application.LoadLevel(Application.loadedLevel);
		StartLevel();
	}

}
