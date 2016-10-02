#pragma strict

import UnityEngine.UI;

// display the score variables on the main menu
// unused

public var topScore : boolean;

private var _Text : Text;
private var ppTopScore : int;
private var ppLastScore : int;

function Start () {
	_Text = GetComponent.<Text>();
	ppTopScore = PlayerPrefs.GetInt("lastScore");
	ppLastScore = PlayerPrefs.GetInt("topScore");
	
	ppLastScore = (ppLastScore >= 0) ? ppLastScore : 0;
	ppTopScore = (ppTopScore >= 0) ? ppTopScore : 0;
}

function Update () {
	if (topScore) {
		_Text.text = "Top\n" + ppTopScore.ToString("N0");
	}
	else {
		_Text.text = "Last\n" + ppLastScore.ToString("N0");
	}
}