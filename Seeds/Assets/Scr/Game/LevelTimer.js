#pragma strict

public var timeDiferance : float;
public var startTime : float = 90;
public var timePenalty : float = 30;

private var timeLeft : float;
private var levelTime : float;
private var _Game : Game;
private var running : boolean = true;

function Start () {
	_Game = GetComponent.<Game>();
	timeLeft = startTime;
}

function Update () {
	levelTime = Time.timeSinceLevelLoad;
	timeDiferance = timeLeft - levelTime;
	if (timeDiferance <= 0 && running){
		_Game.NoTimeLeft();
		running = false;
	}
}

function AddTime (timeToAdd : float){
	timeLeft += timeToAdd;
}

function TimePenalty (){
	timeLeft -= timePenalty;
}