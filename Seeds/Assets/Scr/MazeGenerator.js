#pragma strict

public class MazeGenerator extends MonoBehaviour {
	
	public var cube : GameObject;
	
	// public static var seed = 1;
	private var useSeed : boolean = true;
	private var rand : Random = new Random();

	function GenerateMaze (width : int, height : int, seed : int) : Cell[,]{
		rand.seed = seed;
		var grid : Cell[,] = new Cell[width, height];
		for (var y = 0; y < height; y++){
			for (var x = 0; x < width; x++){
				grid[x,y] = new Cell();
			}
		}
		Divide (grid, 0, 0, width, height, PickDirection(width, height));
		return grid;
	}
	
	function PickDirection (width : int, height : int) : boolean{
		// pick between splitting horizontally or vertically
		// returns a value of isHorizontal
		if (width < height) return true;
		else if (height < width) return false;
		else{
			return (rand.value < 0.5);
		}
	}
	
	function Divide (grid : Cell[,], x : int, y : int, width : int, height : int, isHorizontal : boolean) {
		// return if the the "room" is too small
		if (width < 2 || height < 2) return;
		
		// get positions to make the wall
		var wallX : int = isHorizontal ? x : x + rand.Range(0f, width - 2);
		var wallY : int = isHorizontal ? y + rand.Range(0f, height - 2) : y;
		
		// get a position to make the passage
		var passageX : int = isHorizontal ?	wallX + rand.Range(0f, width): wallX;
		var passageY : int = isHorizontal ? wallY : wallY + rand.Range(0f, height);
		
		// get the length to make the wall
		var length = isHorizontal ? width : height;
		
		// make walls at those positions
		for (var i = 0; i < length; i++) {
			if (isHorizontal) {
				grid[wallX, wallY + i].WallEast();
				grid[wallX + i, wallY + 1].WallWest();
			} else {
				grid[wallX + i, wallY].WallSouth();
				grid[wallX + 1, wallY + i].WallNorth();
			}
		}
		
		// make the passages
		if (isHorizontal) {
			grid[passageX, passageY].PassageSouth();
			grid[passageX, passageY + 1].PassageNorth();
		} else {
			grid[passageX, passageY].PassageEast();
			grid[passageX + 1, passageY].PassageWest();
		}
		
		// divide one side
		var newX = x;
		var newY = y;
		
		var newW = isHorizontal ? width : wallX - x + 1;
		var newH = isHorizontal ? wallY - y + 1 : height;
		
		//Divide(grid, newX, newY, newW, newH, PickDirection(newW, newH));
		
		// divide the other
		newX = isHorizontal ? x : wallX + 1;
		newY = isHorizontal ? wallY + 1 : y;
		
		newW = isHorizontal ? width : x + width - wallX - 1;
		newH = isHorizontal ? y + height - wallY - 1 : height;
		
		//Divide(grid, newX, newY, newW, newH, PickDirection(newW, newH));
	}
}