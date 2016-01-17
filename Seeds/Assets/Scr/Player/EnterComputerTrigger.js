#pragma strict

public var computerMenu : UnityEngine.UI.Image;

function Start () {
	// find the terminal ui menu and disable it
	computerMenu = GameObject.FindGameObjectWithTag("Terminal Menu").GetComponent.<UnityEngine.UI.Image>();
	computerMenu.gameObject.SetActive(false);
}

function OnTriggerEnter (other : Collider) {
	if (other.tag == "Terminal"){
		// activate the terminal ui
		computerMenu.gameObject.SetActive(true);
	}
}

function OnTriggerExit (other : Collider) {
	if (other.tag == "Terminal"){
		// deactivate the terminal ui
		computerMenu.gameObject.SetActive(false);
	}
}
