#pragma strict

public class MazeGenerator extends MonoBehaviour {
	// public static var seed = 1;
	private var useSeed : boolean = true;

	public var playerSpawn : Vector2;
	public var terminalSpawn : Vector2;
	// private var maxNumberSpawn : int = 20;

	function GenerateMaze (width : int, height : int, seed : int) : Cell[,]{
		print("Width: " + width + "Height " + height);
		// generate coordinates that will spawn seed fragments
		// GenerateNumberCoords(width, height);

		playerSpawn = new Vector2(Random.Range(0, width), Random.Range(0, height));
		do {
			terminalSpawn = new Vector2(Random.Range(0, width), Random.Range(0, height));
		} while (terminalSpawn == playerSpawn);

		// do i want to spawn this maze using a seed
		if (useSeed) Random.seed = seed;
		// create an array of cell objects
		var cells = new Cell[width,height];
		var goNorth : boolean;
		for (var x : int = 0; x < width; x++) {
			for (var y : int = 0; y < height; y++) {
				if (x + y == 0) {// if we are at the origin, create an empty cell
					cells[x,y] = new Cell();
				} else if (x == 0) {// on the boundaries, go in the only valid direction
					cells[x,y] = new Cell(true);// add west exit
					if (y < height )cells[x,y-1].SetSouth(true);
				} else if (y == 0) {
					cells[x,y] = new Cell(false);
					if (x < width) cells[x-1,y].SetEast(true);
				} else {// pick randomly whether to go north or east
						goNorth = Random.Range(0f, 1f) > 0.5 ? true : false;
					if (goNorth) {
						cells[x,y] = new Cell(true);// set the exit of this cell
						cells[x,y-1].SetSouth(true);// set the exit of the other cell facing this
					}
					if (!goNorth) {
						cells[x,y] = new Cell(false);
						cells[x-1,y].SetEast(true);
					}
				}
			}
		}

		cells[playerSpawn.x, playerSpawn.y].SetIsStart(true);
		cells[terminalSpawn.x, terminalSpawn.y].SetIsTerminal(true);

		AddNumbers(cells, width, height, width);

		return cells;
	}

	function AddNumbers (cells : Cell[,], width : int, height : int, maxNumbers : int) {
		var numbersToSpawn = Random.Range(1, maxNumbers);

		for (var i = 0; i < numbersToSpawn; i++){
			var isValid = false;

			while (!isValid){
				var x : int = Random.Range(0, width);
				var y : int = Random.Range(0, height);
				if (cells[x, y].GetNumber() == 0){
					cells[x, y].SetNumber(Random.Range(1, 9));
					isValid = true;
				} else {
					isValid = false;
				}
			}
		}
	}
}
