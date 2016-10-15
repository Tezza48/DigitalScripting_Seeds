using UnityEngine;
using System.Collections;

public struct Fragment
{
    Vector2 pos;
    int value;

    public Vector2 Pos { get { return pos; } set { pos = value; } }

    public int Value { get { return value; } set { this.value = value; } }

    public Fragment(Vector2 _pos, int _value)
    {
        pos = _pos;
        value = _value;
    }
}

public class GameFragment : MonoBehaviour
{
    private int number;
    private Animator _Animator;
    private MeshFilter _MeshFilter;

    public int Number { get { return number; } }

    //public int Number { get { return number; } set { number = value; } }

    public void Start()
    {
        _Animator = GetComponent<Animator>();
    }

    public void Init (int _number, Mesh fragMesh)
    {
        number = _number;
        _MeshFilter = GetComponent<MeshFilter>();
        _MeshFilter.mesh = fragMesh;
    }

    public int Use()
    {
        _Animator.SetTrigger("Explode");
        return number;
    }

    public void Reset()
    {
        _Animator.SetTrigger("Reset");
    }
}
