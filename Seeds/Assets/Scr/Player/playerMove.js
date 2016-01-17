#pragma strict

private var rigid : Rigidbody;
private var speed : float = 10f;

function Start () {
	rigid = GetComponent.<Rigidbody>();
}

function Update () {
	
	var xInput = Input.GetAxisRaw("Horizontal");
	var yInput = Input.GetAxis("Vertical");
	
	var targetDirection = (transform.forward * yInput + transform.right * xInput) * speed;
	
	rigid.velocity = targetDirection;
}