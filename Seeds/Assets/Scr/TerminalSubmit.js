#pragma strict

import UnityEngine.UI;
function Start () {
}

function Submit () {
	GameObject.FindGameObjectWithTag("Player").GetComponent.<UnityStandardAssets.Characters.FirstPerson.FirstPersonController>().DisableLook = false;
	Game.instance.TerminalSubmit(parseInt(GetComponent.<InputField>().text));
}
