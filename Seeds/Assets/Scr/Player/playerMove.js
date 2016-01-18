#pragma strict

private var rigid : Rigidbody;
private var walkForce : float = 10f;
private var maxSpeed : float = 10f;
private var jumpForce : float = 10f;
private var jumpCheckOrigin : Transform;

function Start () {
	rigid = GetComponent.<Rigidbody>();
	jumpCheckOrigin = transform.Find("JumpCheck");
}

function FixedUpdate () {

	var xInput = Input.GetAxisRaw("Horizontal");
	var yInput = Input.GetAxisRaw("Vertical");

	var targetDirection = (transform.forward * yInput + transform.right * xInput) * walkForce;

	rigid.AddForce(targetDirection);
	if (rigid.velocity.magnitude > maxSpeed){
		rigid.AddForce(-rigid.velocity);
	}

	Jump();
}

function Jump (){
	var isGrounded = GroundedCheck();
	if(isGrounded && Input.GetButton("Jump")){
		rigid.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
	}
}

function GroundedCheck () : boolean{
	var ray : RaycastHit;
	if (Physics.Raycast(jumpCheckOrigin.position, -Vector3.up, 0.1)){
		return true;
	}
	else{
		return false;
	}
}
