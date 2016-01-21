#pragma strict

import UnityEngine.UI;

private var _LevelTimer : LevelTimer;
private var _Text : Text;

function Start () {
	_LevelTimer = GameObject.Find("Game").GetComponent.<LevelTimer>();
	_Text = GetComponent.<Text>();
}

function Update () {
	if (_LevelTimer.timeDiferance > 0){
		var hours  : int = _LevelTimer.timeDiferance / 3600;
		var minutes : int = (_LevelTimer.timeDiferance - hours * 3600) / 60;
		var seconds : int = _LevelTimer.timeDiferance - (hours * 3600) - (minutes * 60);
		if (hours >= 1)
			_Text.text = hours.ToString() + ":" + minutes.ToString() + ":" + seconds.ToString();
		else if (minutes >= 1)
			_Text.text = minutes.ToString() + ":" + seconds.ToString();
		else
			_Text.text = seconds.ToString();
	}
	else{
		_Text.text = "Out of Time!";
	}
}