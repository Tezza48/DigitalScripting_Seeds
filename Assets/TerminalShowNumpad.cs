using UnityEngine;
using System.Collections;
using System;

public class TerminalShowNumpad : MonoBehaviour {

    public GameObject mDisplayedObject;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    private void OnCollisionEnter(Collision other)
    {
        if (other.gameObject.tag == "Player")
        {
            ShowNumpad();
        }
    }

    private void OnCollisionExit(Collision other)
    {
        if (other.gameObject.tag == "Player")
        {
            HideNumpad();
        }
    }

    private void HideNumpad()
    {
        mDisplayedObject.SetActive(false);
    }

    private void ShowNumpad()
    {
        mDisplayedObject.SetActive(false);
    }


}
