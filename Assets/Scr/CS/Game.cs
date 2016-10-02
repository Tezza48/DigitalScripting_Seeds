using UnityEngine;
using System.Collections.Generic;
using System;

public enum MazeTiles
{
    Deadend,
    Corner,
    Hallway,
    Juntion,
    Cross,
    NULL
}

public class Game : MonoBehaviour
{
    private int level = 4;

    private Maze maze;
    private GameObject mazeParent;
    //private List<GameObject> spawnedTiles;

    #region Maze Tile Prefabs
    [Header("Maze Tiles")]
    public GameObject corner;
    public GameObject cross;
    public GameObject deadend;
    public GameObject hallway;
    public GameObject junction;
    #endregion

    #region Generate Settings
    private int tileSize = 8;
    #endregion

    // Use this for initialization
    void Start ()
    {
        GenerateLevel(0);
        mazeParent = new GameObject("Maze Holder");
        //spawnedTiles = new List<GameObject>();
	}
	
	// Update is called once per frame
	void Update ()
    {
	
	}

    public void GenerateLevel(int _seed)
    {
        maze = new Maze();
        maze.Generate(level, level);
        InstantiateMaze(maze, level, level);
    }

    private void InstantiateMaze(Maze maze, int width, int height)
    {
        MazeTiles newTile = MazeTiles.NULL;
        int rotationMulti = 0;
        for (int y = 0; y < height; y++)
        {
            for (int x = 0; x < width; x++)
            {
                switch(maze.Cells[x, y].Exits)
                {
                    #region Deadends
                    case Cell.Direction.North:
                        newTile = MazeTiles.Deadend;
                        rotationMulti = 0;
                        break;
                    case Cell.Direction.East:
                        newTile = MazeTiles.Deadend;
                        rotationMulti = 1;
                        break;
                    case Cell.Direction.South:
                        newTile = MazeTiles.Deadend;
                        rotationMulti = 2;
                        break;
                    case Cell.Direction.West:
                        newTile = MazeTiles.Deadend;
                        rotationMulti = 3;
                        break;
                    #endregion
                    #region Corners
                    case Cell.Direction.North | Cell.Direction.East:
                        newTile = MazeTiles.Corner;
                        rotationMulti = 0;
                        break;
                    case Cell.Direction.East | Cell.Direction.South:
                        newTile = MazeTiles.Corner;
                        rotationMulti = 1;
                        break;
                    case Cell.Direction.South | Cell.Direction.West:
                        newTile = MazeTiles.Corner;
                        rotationMulti = 2;
                        break;
                    case Cell.Direction.West | Cell.Direction.North:
                        newTile = MazeTiles.Corner;
                        rotationMulti = 3;
                        break;
                    #endregion
                    #region Hallways
                    case Cell.Direction.North | Cell.Direction.South:
                        newTile = MazeTiles.Hallway;
                        rotationMulti = 0;
                        break;
                    case Cell.Direction.East | Cell.Direction.West:
                        newTile = MazeTiles.Hallway;
                        rotationMulti = 1;
                        break;
                    #endregion
                    #region Junctions
                    case Cell.Direction.North | Cell.Direction.East | Cell.Direction.South:
                        newTile = MazeTiles.Juntion;
                        rotationMulti = 0;
                        break;
                    case Cell.Direction.East | Cell.Direction.South | Cell.Direction.West:
                        newTile = MazeTiles.Juntion;
                        rotationMulti = 1;
                        break;
                    case Cell.Direction.South | Cell.Direction.West | Cell.Direction.North:
                        newTile = MazeTiles.Juntion;
                        rotationMulti = 2;
                        break;
                    case Cell.Direction.West | Cell.Direction.North | Cell.Direction.East:
                        newTile = MazeTiles.Juntion;
                        rotationMulti = 3;
                        break;
                    #endregion
                    #region Crossroads
                    case Cell.Direction.ALL:
                        newTile = MazeTiles.Cross;
                        rotationMulti = 0;
                        break;
                    #endregion
                    case Cell.Direction.NONE:
                    default:
                        break;
                }
                switch (newTile)
                {
                    case MazeTiles.Deadend:
                        Instantiate(deadend, new Vector3(x, 0f, -y) * tileSize, Quaternion.Euler(0f, 90f * rotationMulti, 0f));
                        break;
                    case MazeTiles.Corner:
                        Instantiate(corner, new Vector3(x, 0f, -y) * tileSize, Quaternion.Euler(0f, 90f * rotationMulti, 0f));
                        break;
                    case MazeTiles.Hallway:
                        Instantiate(hallway, new Vector3(x, 0f, -y) * tileSize, Quaternion.Euler(0f, 90f * rotationMulti, 0f));
                        break;
                    case MazeTiles.Juntion:
                        Instantiate(junction, new Vector3(x, 0f, -y) * tileSize, Quaternion.Euler(0f, 90f * rotationMulti, 0f));
                        break;
                    case MazeTiles.Cross:
                        Instantiate(cross, new Vector3(x, 0f, -y) * tileSize, Quaternion.Euler(0f, 90f * rotationMulti, 0f));
                        break;
                    case MazeTiles.NULL:
                    default:
                        break;
                }
            }
        }
    }

    //public void TerminalSubmit(int _seed)
    //{

    //}

    //public void NoTimeLeft()
    //{

    //}

    //public void CollectNumber()
    //{

    //}

    //public void GetDigits()
    //{

    //}
}
