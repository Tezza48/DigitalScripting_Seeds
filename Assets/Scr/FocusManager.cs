using UnityEngine;
using System.Collections;

public class FocusManager : MonoBehaviour
{
	// Update is called once per frame
	void Update () {
        if (Input.GetMouseButton(0))
        {
            Cursor.lockState = CursorLockMode.Locked;
            Cursor.visible = false;
        }
        if (Input.GetKeyUp(KeyCode.F1) /*&& (Input.GetKey(KeyCode.LeftShift) || Input.GetKey(KeyCode.RightShift))*/)
        {
            Cursor.lockState = CursorLockMode.None;
            Cursor.visible = true;
        }
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            Application.Quit();
#if UNITY_EDITOR
            UnityEditor.EditorApplication.isPlaying = false;
#endif
        }
	}
}
