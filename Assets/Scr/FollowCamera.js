#pragma strict

function Start () {

}

function Update () {
		transform.position = Camera.current.GetComponent.<Transform>().position;
}