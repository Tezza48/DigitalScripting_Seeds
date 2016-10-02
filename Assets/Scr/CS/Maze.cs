using UnityEngine;
using System.Collections.Generic;

public class Maze
{
    #region Fields Private
    //private int seed;
    private int width, height;
    private Cell[,] cells;
    private Vector2 spawn;
    private Vector2 terminal;
    private List<Vector2> fragmentSpawns;

    #endregion

    #region Getters
    public Cell[,] Cells { get { return cells; } }
    #endregion

    #region Constructors
    public Maze()
    {
        //seed = 0;
        //width = 0;
        //height = 0; ;
        fragmentSpawns = new List<Vector2>();
    }
    #endregion

    #region Methods

    public void Generate (int _width, int _height)
    {
        cells = new Cell[_width, _height];
        Cell.Direction availableDir;
        Cell.Direction clearDir;
        for (int y = 0; y < _height; y++)
        {
            for (int x = 0; x < _width; x++)
            {
                cells[x, y] = new Cell();
                availableDir = Cell.Direction.NONE;
                /*  Checks N, W
                    Pick way
                    add exits to and from   */

                // Can i go either North or East of this Cell?
                if (y > 0) availableDir |= Cell.Direction.North;
                if (x > 0) availableDir |= Cell.Direction.West;

                // Pick what Direction to connect this cell to
                clearDir = PickDirection(availableDir);
                
                // Add Exit To next cell and back
                AddExits(clearDir, y, x);

                // Add Player and Terminal

                // Add Fragments
            }
        }
    }

    private void AddExits(Cell.Direction clearDir, int y, int x)
    {
        switch (clearDir)
        {
            case Cell.Direction.North:
                cells[x, y].Exits |= Cell.Direction.North;
                cells[x, y - 1].Exits |= Cell.Direction.South;
                break;
            case Cell.Direction.West:
                cells[x, y].Exits |= Cell.Direction.West;
                cells[x - 1, y].Exits |= Cell.Direction.East;
                break;
            case Cell.Direction.NONE:
            default:
                break;
        }
    }

    private static Cell.Direction PickDirection(Cell.Direction availableDir)
    {
        Cell.Direction clearDir;
        switch (availableDir)
        {
            case Cell.Direction.North:
                clearDir = Cell.Direction.North;
                break;
            case Cell.Direction.West:
                clearDir = Cell.Direction.West;
                break;
            case Cell.Direction.North | Cell.Direction.West:
                clearDir = Random.Range(0, 2) == 1 ? Cell.Direction.North : Cell.Direction.West;
                break;
            default:
                clearDir = Cell.Direction.NONE;
                break;
        }
        return clearDir;
    }

    #endregion
}
