#pragma strict

public var timeDiferance : float;
public var startTime : float = 90;

private var timeLeft : float;
private var levelTime : float;
private var _Game : Game;

function Start () {
	_Game = GetComponent.<Game>();
	timeLeft = startTime;
}

function Update () {
	levelTime = Time.timeSinceLevelLoad;
	timeDiferance = timeLeft - levelTime;
	if (timeDiferance <= 0)
		_Game.NoTimeLeft();
}

function AddTime (timeToAdd : float){
	timeLeft += timeToAdd;
}