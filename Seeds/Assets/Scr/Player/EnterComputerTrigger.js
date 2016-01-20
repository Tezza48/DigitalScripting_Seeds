#pragma strict

public var computerPrompt : UnityEngine.UI.Text;

function Start () {
	// find the terminal ui menu and disable it
	computerPrompt.gameObject.SetActive(false);
}

function OnTriggerEnter (other : Collider) {
	if (other.tag == "Terminal"){
		// activate the terminal ui
		computerPrompt.gameObject.SetActive(true);
	}
}

function OnTriggerExit (other : Collider) {
	if (other.tag == "Terminal"){
		// deactivate the terminal ui
		computerPrompt.gameObject.SetActive(false);
	}
}
