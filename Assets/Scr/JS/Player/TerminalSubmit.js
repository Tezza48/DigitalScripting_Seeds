#pragma strict

import UnityEngine.UI;

public class TerminalSubmit extends MonoBehaviour
{
	private var _Game : Game;

	function Start ()
	{
		_Game = GameObject.Find("Game").GetComponent.<Game>();
	}

	function Submit ()
	{
		// submit the seed to Game
		var givenSeed = parseInt(GetComponent.<InputField>().text);
		if(givenSeed != 0)
			_Game.TerminalSubmit(givenSeed);
	}
}
