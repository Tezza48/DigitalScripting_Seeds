#pragma strict

public var jumpCheckCentre : Transform;
public var jumpCheckF : Transform;
public var jumpCheckB : Transform;
public var jumpCheckL : Transform;
public var jumpCheckR : Transform;
public var isGrounded : boolean;

private var rigid : Rigidbody;
private var walkAccel : float = 10f;
private var airAccel : float = 10f;
private var maxSpeed : float = 5f;
private var jumpForce : float = 1f;

function Start () {
	rigid = GetComponent.<Rigidbody>();
	isGrounded = GroundedCheck();
	jumpCheckCentre = transform.Find("JumpCheck");
	jumpCheckF = transform.Find("JumpCheckF");
	jumpCheckB = transform.Find("JumpCheckB");
	jumpCheckL = transform.Find("JumpCheckL");
	jumpCheckR = transform.Find("JumpCheckR");
}

function FixedUpdate () {

	var xInput = Input.GetAxisRaw("Horizontal");
	var yInput = Input.GetAxisRaw("Vertical");
	var direction = (xInput * transform.right + yInput * transform.forward).normalized;
	var currentV = rigid.velocity;
	if (isGrounded){
		rigid.velocity = MoveGround(direction, currentV);
		Jump();
	}
	else {
		rigid.velocity = MoveAir(direction, currentV);
	}

	isGrounded = GroundedCheck();
}

function MoveGround (direction : Vector3, currentV : Vector3) : Vector3{
	return Accelerate(direction, currentV, walkAccel, maxSpeed);
}

function MoveAir (direction : Vector3, currentV : Vector3) : Vector3{
	return Accelerate(direction, currentV, airAccel, 50f);
}

function Accelerate(direction : Vector3, currentV : Vector3, accel : float, maxSpeed : float) : Vector3{
	var newSpeed = Vector3.Dot(currentV, direction);
	var accelSpeed = accel * Time.deltaTime;
	if (newSpeed + accelSpeed > maxSpeed){
		accelSpeed = maxSpeed - newSpeed;
	}
	return currentV + direction * accelSpeed;
}

function Jump (){
	if(Input.GetButton("Jump")){
		rigid.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
	}
}

function GroundedCheck () : boolean{
	var down : Vector3 = -transform.up;
	
	var centreCheck : boolean = Physics.Raycast(jumpCheckCentre.position, down, 0.1f);
	var fwdCheck : boolean = Physics.Raycast(jumpCheckF.position, down, 0.1f);
	var backCheck : boolean = Physics.Raycast(jumpCheckB.position, down, 0.1f);
	var leftCheck : boolean = Physics.Raycast(jumpCheckL.position, down, 0.1f);
	var rightCheck : boolean = Physics.Raycast(jumpCheckR.position, down, 0.1f);
	
	return (fwdCheck || backCheck || leftCheck || rightCheck || centreCheck)? true : false;
}
