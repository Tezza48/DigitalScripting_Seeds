#pragma strict

public class Cell{
	// north, east, south, west
	private var exits : boolean[] = new boolean[4];

	// does this cell have a number/seed fragment in it?
	private var number : int = 0;

	// is this cell the player start?
	private var isStart : boolean = false;

	// is this cell the exit?
	private var isTerminal : boolean = false;

	// construct new cell with either north or west exit
	public function Cell (isNorth : boolean) {
		if (isNorth) {
			exits[0] = true;
		} else if (!isNorth) {
			exits[3] = true;
		}
	}
	public function Cell (){

	}

	// set east and south exits
	public function SetEast (isEast : boolean) {
		exits[1] = isEast;
	}
	public function SetSouth (isSouth : boolean) {
		exits[2] = isSouth;
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
	
	// makeshift getters and setters for start, terminal and number
	public function SetIsStart (isStart : boolean){
		this.isStart = isStart;
	}
	public function GetIsStart () : boolean{
		return isStart;
	}
	
	public function SetIsTerminal (isTerminal : boolean){
		this.isTerminal = isTerminal;
	}
	public function GetIsTerminal () : boolean{
		return isTerminal;
	}
	
	public function SetNumber (number : int){
		this.number = number;
	}
	public function GetNumber () : int{
		return number;
	}
}
