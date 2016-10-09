using UnityEngine;
using System.Collections.Generic;
//using System;

[System.Serializable]
public class Maze
{
    #region Fields Private
    //private int seed;
    //private int width, height;

    private Cell[,] cells;
    private Vector2 playerSpawn;
    private Vector2 terminalSpawn;
    private Dictionary<int, List<Vector2>> fragmentSpawns;

    #endregion

    #region Getters
    public Cell[,] Cells { get { return cells; } }

    public Vector2 TerminalSpawn { get { return terminalSpawn; } }

    public Vector2 PlayerSpawn { get { return playerSpawn; }}

    public Dictionary<int, List<Vector2>> FragmentSpawns { get { return fragmentSpawns; } } 
    #endregion

    #region Constructors
    public Maze(int maxFragmentValue)
    {
        //seed = 0;
        //width = 0;
        //height = 0; ;
        fragmentSpawns = new Dictionary<int, List<Vector2>>();
        for (int i = 0; i < maxFragmentValue; i++)
        {
            fragmentSpawns.Add(i, new List<Vector2>());
        }
    }
    #endregion

    #region Methods

    public void Generate (int _width, int _height, Vector2 fragmentGenRange)
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


            }
        }
        // Add Player and Terminal
        playerSpawn = PickCartesian(_width, _height);
        terminalSpawn = PickCartesian(_width, _height, playerSpawn);

        // Add Fragments
        int fragsToSpawn = (int)Random.Range(fragmentGenRange.x, fragmentGenRange.y);
        int newFragment;
        for (int i = 0; i < fragsToSpawn; i++)
        {
            newFragment = Random.Range(0, 10);
            fragmentSpawns[i].Add(PickCartesian(_width, _height, fragmentSpawns.Values));
        }
    }

    private Cell.Direction PickDirection(Cell.Direction availableDir)
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

    #region Pick Cartesian
    private Vector2 PickCartesian(int _width, int _height)
    {
        return new Vector2(Random.Range(0, _width), Random.Range(0, _height));
    }

    private Vector2 PickCartesian(int _width, int _height, Vector2 check)
    {
        Vector2 newPos = Vector2.zero;
        bool isValid = true;
        do
        {
            newPos = PickCartesian(_width, _height);
            // Check this vector against other points to make sure it's not overlapping an existing position
            isValid = !newPos.Equals(check);
        }
        while (!isValid);
        return newPos;
    }

    private Vector2 PickCartesian(int _width, int _height, Dictionary<int, List<Vector2>>.ValueCollection exclude)
    {
        Vector2 newPos = Vector2.zero;
        bool isValid = true;
        do
        {
            newPos = PickCartesian(_width, _height);
            // Check this vector against other points to make sure it's not overlapping an existing positionforeach (Vector2 checkVec in pair.Value)
            foreach(List<Vector2> checkList in exclude)
                foreach(Vector2 checkVec in checkList)
                {
                    isValid = !newPos.Equals(checkVec);
                }
        }
        while (!isValid);
        return newPos;
    }
    #endregion

    #endregion
}
