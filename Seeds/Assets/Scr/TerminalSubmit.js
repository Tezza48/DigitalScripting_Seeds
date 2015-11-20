#pragma strict

import UnityEngine.UI;
function Start () {
}

function Submit () {
	// disable the mouse look
	GameObject.FindGameObjectWithTag("Player").GetComponent.<UnityStandardAssets.Characters.FirstPerson.FirstPersonController>().DisableLook = false;
	
	// submit the seed to Game
	Game.instance.TerminalSubmit(parseInt(GetComponent.<InputField>().text));
}
