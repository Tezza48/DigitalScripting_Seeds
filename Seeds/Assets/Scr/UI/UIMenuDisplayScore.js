#pragma strict

import UnityEngine.UI;

public var topScore : boolean;

private var _Text : Text;


function Start () {
	_Text = GetComponent.<Text>();
}

function Update () {
	if (topScore) {
		_Text.text = "Top\n" + PlayerPrefs.GetInt("topScore");
	}
	else {
		_Text.text = "Last\n" + PlayerPrefs.GetInt("lastScore");
	}
}