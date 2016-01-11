#pragma strict

public class Cell{
	// north, east, south, west
	private var exits : boolean[] = new boolean[4];
	// does this cell have a number/seed fragment in it?
	// private var hasNumber : boolean = false;
	// private var number : int = 10;

	// is this cell the player start?
	// private var isStart : boolean = false;
	// is this cell the exit?
	// private var isFinish : boolean = false;
	// construct new cell with either north or west exit

	public function Cell (){
		for (var i in exits) i = true;
	}
	
	// cerate passages in the cells
	public function PassageNorth () {
		exits[0] = true;
	}
	public function PassageEast () {
		exits[1] = true;
	}
	public function PassageSouth () {
		exits[2] = true;
	}
	public function PassageWest () {
		exits[3] = true;
	}
	
	// block passages in the cells
	public function WallNorth () {
		exits[0] = false;
	}
	public function WallEast () {
		exits[1] = false;
	}
	public function WallSouth () {
		exits[2] = false;
	}
	public function WallWest () {
		exits[3] = false;
	}
	
	// return number of exits
	public function GetNumExits () : int {
	    var n : int = 0;
	    for (var i = 0; i < exits.length; i++) {
			if (exits[i]) n++;
	    }
	    return n;
	}

	// get first exit for orienting the tile
	public function GetFirstExit () : int {
		var n : int = 0;
		for (var i = 0; i < exits.length; i++) {
			if (exits[i]) {
				n = i;
				break;
			}
		}
		return n;
	}
	// is this cell a halway? only call if the cell has two exits.
	public function IsHallway () : boolean {
		if (GetFirstExit() >= 2) {
			return false;
		} else {
			return exits[GetFirstExit() + 2];
		}
	}
}
