#pragma strict

import UnityEngine.UI;

public var computerPrompt : GameObject;

function Start () {
	computerPrompt = GameObject.Find("Use Terminal");
	// find the terminal ui menu and disable it
	computerPrompt.SetActive(false);
}

function OnTriggerEnter (other : Collider) {
	if (other.tag == "Terminal"){
		// activate the terminal ui
		computerPrompt.SetActive(true);
	}
}

function OnTriggerExit (other : Collider) {
	if (other.tag == "Terminal"){
		// deactivate the terminal ui
		computerPrompt.SetActive(false);
	}
}

function OnTriggerStay (other : Collider) {
	if (other.tag == "Terminal"){
		if (Input.GetButtonDown("Use")){
			var terminalCamera = other.transform.parent.Find("Camera");
			terminalCamera.gameObject.SetActive(true);
			computerPrompt.SetActive(false);
			gameObject.SetActive(false);
			Cursor.lockState = CursorLockMode.None;
			Cursor.visible = true;
		}
	}
}
