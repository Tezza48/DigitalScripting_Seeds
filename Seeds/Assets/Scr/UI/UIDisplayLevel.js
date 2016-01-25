#pragma strict

import UnityEngine.UI;

// display the current level on the text object

private var _Game : Game;
private var _Text : Text;

function Start () {
	_Game = GameObject.Find("Game").GetComponent.<Game>();
	_Text = GetComponent.<Text>();
}

function Update () {
	_Text.text = "Level: " + _Game.levelCounter;
}