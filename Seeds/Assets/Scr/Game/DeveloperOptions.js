#pragma strict

	
public var devMenu : GameObject;
public var devMap : GameObject;

private var devMode : boolean = true;

function Awake () {
	devMenu = GameObject.Find("DevMenu");
	devMap = GameObject.Find("DevMap");
}

function Update () {
	devMenu.SetActive(devMenu);
	devMap.SetActive(devMenu);
	
	if (Input.GetKeyDown(KeyCode.Break)) devMode = !devMode;
	
}
