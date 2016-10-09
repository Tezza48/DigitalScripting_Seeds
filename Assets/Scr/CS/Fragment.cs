using UnityEngine;
using System.Collections;

public class Fragment : MonoBehaviour
{
    int number;
    Animator _Animator;

    //public int Number { get { return number; } set { number = value; } }

    public void Start()
    {
        _Animator = GetComponent<Animator>();
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
