#pragma strict

public class PlayerMove extends MonoBehaviour
{
	public var canMove : boolean;

	private var rigid : Rigidbody;
	private var walkAccel : float = 50f;
	private var maxSpeed : float = 10f;

	function Start () {
		rigid = GetComponent.<Rigidbody>();
	}

	function FixedUpdate () {
		if (canMove) {
			var xInput = Input.GetAxisRaw("Horizontal");
			var yInput = Input.GetAxisRaw("Vertical");
			// create the acceleration vector
			var direction = (xInput * transform.right + yInput * transform.forward).normalized;
			var currentV = rigid.velocity;
			if (direction != Vector3.zero)
				// move
				rigid.velocity = MoveGround(direction, currentV);
			else
				// slow down
				rigid.velocity /= 2;
		}
		else {
			rigid.velocity = Vector3.zero;
		}
	}

	function MoveGround (direction : Vector3, currentV : Vector3) : Vector3
	{
		var newVelocity = currentV + direction * walkAccel * Time.deltaTime;
		// check that the new velocity isn't greater than the maximum speed
		if (newVelocity.magnitude > maxSpeed)
		{
			var delta = maxSpeed / newVelocity.magnitude;
			newVelocity.x *= delta;
			newVelocity.z *= delta;
		}
		return newVelocity;
	}
}
