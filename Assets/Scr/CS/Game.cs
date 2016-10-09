//#define SERIALIZE_FIELDS

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

#if SERIALIZE_FIELDS
    [SerializeField]
#endif
    private Maze maze;
    private CanvasController canvas;
    private PlayerController playerController;

    #region Object Pools
    private Dictionary<MazeTiles, List<Transform>> spawnedTiles;
    private Dictionary<int, List<Transform>> spawnedFragments;
    #endregion

    #region Transform Holders
    private Transform mazeParent;
    private Transform playerTransform;
    private Transform terminalTransform;
    #endregion

    #region Maze Tile Prefabs
    [Header("Maze Tiles")]
    public GameObject corner;
    public GameObject cross;
    public GameObject deadend;
    public GameObject hallway;
    public GameObject junction;
    #endregion

    #region Prefabs
    [Header("Spawn Prefabs")]
    public GameObject playerPrefab;
    public GameObject terminalPrefab;
    public List<GameObject> fragmentPrefabs;
    #endregion

    #region Generate Settings
    private int tileSize = 8;

    public PlayerController PlayerController
    {
        get
        {
            return playerController;
        }

        set
        {
            playerController = value;
        }
    }
    #endregion

    // Use this for initialization
    void Start ()
    {
        mazeParent = (new GameObject("Maze")).GetComponent<Transform>();

        spawnedTiles = new Dictionary<MazeTiles, List<Transform>>();
        spawnedFragments = new Dictionary<int, List<Transform>>();

        canvas = FindObjectOfType<CanvasController>();

        #region Init Dictionaries
        foreach (MazeTiles currentTile in Enum.GetValues(typeof(MazeTiles)))
        {
            spawnedTiles.Add(currentTile, new List<Transform>());
        }

        for (int i = 0; i < fragmentPrefabs.Count; i++)
        {
            spawnedFragments.Add(i, new List<Transform>());
        }
        #endregion
        
        UnityEngine.Random.InitState(System.DateTime.UtcNow.TimeOfDay.Seconds);

        GenerateLevel(0);
	}
	
	// Update is called once per frame
	void Update ()
    {
        canvas.SetInteractText(playerController.Interaction);
	}

    public void GenerateLevel(int _seed)
    {
        maze = new Maze(fragmentPrefabs.Count);
        maze.Generate(level, level, new Vector2(level, Mathf.Pow(level, 2)/2));
        InstantiateMaze(maze, level, level);
    }
    

    private void InstantiateMaze(Maze maze, int width, int height)
    {
        // type of tile to use for the next
        MazeTiles newTile = MazeTiles.NULL;
        // * this by 90 to get the desired location
        int rotationMulti = 0;
        for (int y = 0; y < height; y++)
        {
            for (int x = 0; x < width; x++)
            {
                // Figure out which tile you need to match the current cell
                switch (maze.Cells[x, y].Exits)
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
                // Instantiate the tile
                InstantiateTile(newTile, rotationMulti, y, x);
            }
        }

        // Instantiate Player Prefab
        playerTransform = ((GameObject)Instantiate(playerPrefab, getVec3xz(maze.PlayerSpawn) * tileSize, Quaternion.AngleAxis(UnityEngine.Random.Range(0, 360), Vector3.up))).GetComponent<Transform>();
        playerTransform.GetComponent<PlayerController>().Init(this);

        // Instantiate Terminal Prefab
        terminalTransform = ((GameObject)Instantiate(terminalPrefab, getVec3xz(maze.TerminalSpawn) * tileSize, Quaternion.AngleAxis(UnityEngine.Random.Range(0, 360), Vector3.up))).GetComponent<Transform>();

        // Instantiate Fragments
        foreach (KeyValuePair<int, List<Vector2>> item in maze.FragmentSpawns)
        {
            foreach (Vector2 currentPos in item.Value)
            {

                Transform newFrag = ((GameObject)Instantiate(
                    fragmentPrefabs[item.Key], 
                    (getVec3xz(currentPos) * tileSize) + (Vector3.up * 3), 
                    Quaternion.identity)
                ).GetComponent<Transform>();

                spawnedFragments[item.Key].Add(newFrag);
            }
        }
    }

    private void InstantiateTile(MazeTiles newTile, int rotationMulti, int y, int x)
    {
        switch (newTile)
        {
            case MazeTiles.Deadend:
                Instantiate(deadend, new Vector3(x, 0f, -y) * tileSize, Quaternion.Euler(0f, 90f * rotationMulti, 0f), mazeParent);
                break;
            case MazeTiles.Corner:
                Instantiate(corner, new Vector3(x, 0f, -y) * tileSize, Quaternion.Euler(0f, 90f * rotationMulti, 0f), mazeParent);
                break;
            case MazeTiles.Hallway:
                Instantiate(hallway, new Vector3(x, 0f, -y) * tileSize, Quaternion.Euler(0f, 90f * rotationMulti, 0f), mazeParent);
                break;
            case MazeTiles.Juntion:
                Instantiate(junction, new Vector3(x, 0f, -y) * tileSize, Quaternion.Euler(0f, 90f * rotationMulti, 0f), mazeParent);
                break;
            case MazeTiles.Cross:
                Instantiate(cross, new Vector3(x, 0f, -y) * tileSize, Quaternion.Euler(0f, 90f * rotationMulti, 0f), mazeParent);
                break;
            case MazeTiles.NULL:
            default:
                break;
        }
    }


    #region Helper Methods
    Vector3 getVec3xz(Vector2 xzVec)
    {
        return new Vector3(xzVec.x, 0, -xzVec.y);
    }
    #endregion

    //public void TerminalSubmit(int _seed)
    //{

    //}

    //public void NoTimeLeft()
    //{

    //}

    public void CollectNumber(int _number)
    {

    }

    //public void GetDigits()
    //{

    //}
}
