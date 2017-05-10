//using System;

[System.Serializable]
public class Cell
{
    [System.Flags][System.Serializable]
    public enum Direction
    {
        NONE = 0,
        North = 1,
        East = 2,
        South = 4,
        West = 8,
        ALL = 15
    }
    //[Flags]
    //public enum Opposite
    //{
    //    NONE = 15,
    //    North = 4,
    //    East = 8,
    //    South = 1,
    //    West = 2
    //}
    
    private Direction exits;

    public Direction Exits { get { return exits; } set { exits = value; } }

    public Cell ()
    {
        exits = Direction.NONE;
    }
}
