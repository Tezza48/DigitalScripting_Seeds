#pragma strict

public var cameraLocked : boolean = false;
private var lookClampX : float = 90f;
private var lookSensitivity : float = 75;
private var _Camera : Transform;
private var mouseDelta : Vector2;

function Start () {
	
	_Camera = transform.FindChild("Camera").GetComponent.<Transform>();
	Cursor.lockState = CursorLockMode.Locked;
	Cursor.visible = false;
}

function Update () {
	
	mouseDelta = new Vector2(-Input.GetAxisRaw("Mouse Y"), Input.GetAxisRaw("Mouse X"));
	
	mouseDelta = Vector2.Scale(mouseDelta, Vector2.one * lookSensitivity * Time.deltaTime);
	
	var cameraLocal = _Camera.localRotation.eulerAngles;
	if (!cameraLocked){
		_Camera.localRotation = Quaternion.Euler(mouseDelta.x + cameraLocal.x, 0, 0);
		transform.localRotation *= Quaternion.Euler(0, mouseDelta.y, 0);
	}
}