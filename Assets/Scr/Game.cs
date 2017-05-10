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
    #region Gameplay Variables
    private int level = 1;
    private uint collectedSeed;
    #endregion

    private Maze maze;
    //private CanvasController canvas;
    private PlayerController playerController;

    #region Object Pools
    //private List<Transform> spawnedTiles;
    private List<GameFragment> spawnedFragments;
    #endregion

    #region Transform Holders
    private GameObject mazeParent;
    private GameObject playerObject;
    private GameObject terminalObject;
    #endregion
    
    #region Prefabs

    #region Maze Tile Prefabs

    [Header("Maze Tiles")]
    public GameObject corner;
    public GameObject cross;
    public GameObject deadend;
    public GameObject hallway;
    public GameObject junction;

    #endregion

    [Header("Spawn Prefabs")]
    public GameObject playerPrefab;
    public GameObject terminalPrefab;
    public GameFragment fragmentPrefab;
    [SerializeField]
    private Mesh[] fragmentMeshes;

    #endregion

    #region Generate Settings
    private int tileSize = 8;
    #endregion

    public PlayerController PlayerController { get { return playerController; } set { playerController = value; } }

    // Use this for initialization
    void Start ()
    {
        maze = new Maze();

        mazeParent = new GameObject("Maze");

        // spawnedTiles = new List<Transform>();
        spawnedFragments = new List<GameFragment>();

        // canvas = FindObjectOfType<CanvasController>();
        
        UnityEngine.Random.InitState(System.DateTime.UtcNow.TimeOfDay.Seconds);

        GenerateLevel((uint)UnityEngine.Random.Range(int.MinValue, int.MaxValue));
	}
	
	// Update is called once per frame
	void Update ()
    {
        //canvas.SetInteractText(playerController.Interaction);
        //if (Input.GetButtonDown("Submit"))
        //    TerminalSubmit((uint)UnityEngine.Random.Range(int.MinValue, int.MaxValue));
	}

    public void GenerateLevel(uint _seed)
    {
        maze.Generate(SizeFromLevel(level), SizeFromLevel(level), FragmentGenRange(SizeFromLevel(level)), _seed);
        InstantiateMaze(maze, SizeFromLevel(level), SizeFromLevel(level));
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
                SetTileForCell(maze, ref newTile, ref rotationMulti, y, x);
                // Instantiate the tile
                InstantiateTile(newTile, rotationMulti, y, x);
            }
        }

        // Instantiate Player Prefab
        if(playerObject == null)
        {
            playerObject = (GameObject)Instantiate(playerPrefab, 
                getVec3xz(maze.PlayerSpawn) * tileSize, 
                Quaternion.AngleAxis(UnityEngine.Random.Range(0, 360), 
                Vector3.up));
            playerObject.GetComponent<PlayerController>().Init(this);
        }
        else
        {
            playerObject.transform.position = getVec3xz(maze.PlayerSpawn) * tileSize;
            playerObject.transform.rotation = Quaternion.AngleAxis(UnityEngine.Random.Range(0, 360), Vector3.up);
        }

        // Instantiate Terminal Prefab
        if (terminalObject == null)
        {
            terminalObject = (GameObject)Instantiate(terminalPrefab, getVec3xz(maze.TerminalSpawn) * tileSize, Quaternion.AngleAxis(UnityEngine.Random.Range(0, 360), Vector3.up));
        }
        else
        {
            terminalObject.transform.position = getVec3xz(maze.TerminalSpawn) * tileSize;
            terminalObject.transform.rotation = Quaternion.AngleAxis(UnityEngine.Random.Range(0, 360), Vector3.up);
        }

        // Instantiate Fragments
        foreach (Fragment currentFrag in maze.FragmentSpawns)
        {
            InstantiatePooledFragment(currentFrag);
        }
    }

    private void InstantiatePooledFragment(Fragment currentFrag)
    {
        /*
        Create the requested fragment but check to see if there is a pooled one
        already would like to use a dictionary in the future for speed's sake
         */

        // See if there's already a pooled Fragment with this number
        for (int i = 0; i < spawnedFragments.Count; i++)
        {
            // is this frag invisible
            if (!spawnedFragments[i].gameObject.activeSelf)
            {
                // has it got the right number mesh on it (nope, gotta do it now)
                bool isSameNumber = spawnedFragments[i].Number == currentFrag.Number;
                if (isSameNumber)
                {
                    // reactivate it
                    spawnedFragments[i].gameObject.SetActive(true);
                    // Move it to the right position
                    spawnedFragments[i].transform.position = (getVec3xz(currentFrag.Pos) * tileSize) + (Vector3.up * 3);
                    // return as we're finished
                    return;
                }
            }
        }

        // If we've gotten here there isnt so we will instantiate a new one
        GameFragment newFrag = (GameFragment)Instantiate(fragmentPrefab,(getVec3xz(currentFrag.Pos) * tileSize) + (Vector3.up * 2), Quaternion.identity);

        // init it with the right number, this sets the frag's number and assigns the right mesh
        newFrag.Init(currentFrag.Number, fragmentMeshes[currentFrag.Number - 1]);

        // Name it for debugging purposes
        newFrag.name = "Fragment: " + currentFrag.Number;
        // Add the new frag to the pool
        spawnedFragments.Add(newFrag);
        return;
    }

    private static void SetTileForCell(Maze maze, ref MazeTiles newTile, ref int rotationMulti, int y, int x)
    {
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
    }

    private void InstantiateTile(MazeTiles newTile, int rotationMulti, int y, int x)
    {
        switch (newTile)
        {
            case MazeTiles.Deadend:
                InstantiatePooledTile(newTile, deadend, new Vector3(x, 0f, -y) * tileSize, Quaternion.Euler(0f, 90f * rotationMulti, 0f));
                //Instantiate(deadend, new Vector3(x, 0f, -y) * tileSize, Quaternion.Euler(0f, 90f * rotationMulti, 0f), mazeParent);
                break;
            case MazeTiles.Corner:
                InstantiatePooledTile(newTile, corner, new Vector3(x, 0f, -y) * tileSize, Quaternion.Euler(0f, 90f * rotationMulti, 0f));
                break;
            case MazeTiles.Hallway:
                InstantiatePooledTile(newTile, hallway, new Vector3(x, 0f, -y) * tileSize, Quaternion.Euler(0f, 90f * rotationMulti, 0f));
                break;
            case MazeTiles.Juntion:
                InstantiatePooledTile(newTile, junction, new Vector3(x, 0f, -y) * tileSize, Quaternion.Euler(0f, 90f * rotationMulti, 0f));
                break;
            case MazeTiles.Cross:
                InstantiatePooledTile(newTile, cross, new Vector3(x, 0f, -y) * tileSize, Quaternion.Euler(0f, 90f * rotationMulti, 0f));
                break;
            case MazeTiles.NULL:
            default:
                break;
        }
    }

    /*TODO: Make lookup table to link MazeTiles enum with corresponding Prefabs*/
    private void InstantiatePooledTile(MazeTiles tileType, GameObject tile, Vector3 position, Quaternion rotation)
    {
        //check to see if we can use a tile with the right mesh from the 
        for (int i = 0; i < mazeParent.transform.childCount; i++)
        {
            if (!mazeParent.transform.GetChild(i).gameObject.activeSelf && 
                mazeParent.transform.GetChild(i).GetComponent<GameTile>().MazeTile == tileType)
            {
                mazeParent.transform.GetChild(i).gameObject.SetActive(true);
                mazeParent.transform.GetChild(i).position = position;
                mazeParent.transform.GetChild(i).rotation = rotation;
                return;
            }
        }
        Transform T_newTile = (
            (GameObject)Instantiate(tile, position, rotation, mazeParent.transform)
            ).GetComponent<Transform>();
        T_newTile.GetComponent<GameTile>().MazeTile = tileType;
    }

    #region Helper Methods
    private int SizeFromLevel(int _level)
    {
        return _level + 4;
    }

    private Vector2 FragmentGenRange(int level)
    {
        return new Vector2(level, Mathf.Pow(level, 2) / 2);
    }

    Vector3 getVec3xz(Vector2 xzVec)
    {
        return new Vector3(xzVec.x, 0, -xzVec.y);
    }
    #endregion

    public void TerminalSubmit(uint _seed)
    {
        if (_seed == collectedSeed || true)
        {
            collectedSeed = 0;
            //setting tiles and fragments to inactive states
            for(int i = 0; i < mazeParent.transform.childCount; i++)
            {
                mazeParent.transform.GetChild(i).gameObject.SetActive(false);
            }

            for (int u = 0; u < spawnedFragments.Count; u++)
            {
                if (spawnedFragments[u].gameObject.activeSelf)
                {
                    spawnedFragments[u].GetComponent<Animator>().SetTrigger("Reset");
                }
                spawnedFragments[u].gameObject.SetActive(false);
            }

            maze.Generate(SizeFromLevel(level), SizeFromLevel(level), FragmentGenRange(SizeFromLevel(level)), _seed);
            InstantiateMaze(maze, SizeFromLevel(level), SizeFromLevel(level));
        }
    }

    public void CollectNumber(int _number)
    {
        collectedSeed *= 10;
        collectedSeed += (uint)_number;
        Debug.Log("Seed = " + collectedSeed.ToString());
    }

}
