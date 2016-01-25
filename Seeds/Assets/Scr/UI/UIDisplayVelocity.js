#pragma strict

import UnityEngine.UI;

// dev class for showing the velovity

public var rigid : Rigidbody;
public var _text : Text;

function Start () {
	//_text = GetComponent.<Text>();
}

function Update () {
	if (rigid != null) {
		_text.text = "Vel: " + rigid.velocity.magnitude.ToString("N2");
	} else {
		rigid = GameObject.FindGameObjectWithTag("Player").GetComponent.<Rigidbody>();
	}
}