#pragma strict

import UnityEngine.UI;
function Start () {
}

function Submit () {
	Game.instance.TerminalSubmit(parseInt(GetComponent.<InputField>().text));
}
