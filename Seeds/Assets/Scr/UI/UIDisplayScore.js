#pragma strict

import UnityEngine.UI;

public var menuButtonAnim : Animator;

private var _Game : Game;
private var _Text : Text;
private var _Anim : Animator;
private var isDown : boolean;

function Start () {
	_Game = GameObject.Find("Game").GetComponent.<Game>();
	_Text = GetComponent.<Text>();
	_Anim = GetComponent.<Animator>();
}

function Update () {
	_Text.text = "Seed Fragment Score: " + _Game.totalScore;
	if (!isDown && !_Game.isRunning){
		isDown = true;
		_Anim.SetTrigger("Fly In");
		menuButtonAnim.SetTrigger("Fly In");
	}
}