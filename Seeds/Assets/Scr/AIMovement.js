#pragma strict

public var heightLimit :float;
public var lowLimit :float;
public var leftLimit :float;
public var rightLimit :float;
public var moveUpAndDown :boolean;
public var moveLeftAndRight :boolean;
public var moveUp :boolean = false;
public var moveDown :boolean = false;
public var moveLeft :boolean = false;
public var moveRight :boolean = false;
public var speed :float;

function Update ()
{
 	if (moveLeftAndRight) // Horizontal movement
 		{
  		if (transform.localPosition.x <= leftLimit)
  		{
   		moveLeft = false;
  		moveRight = true;
  	}
  		else if (transform.localPosition.x >= rightLimit)
  	{
  		moveLeft = true;
   		moveRight = false;
  	}
  		//Move platform back and forth
  	if (moveRight)
   	transform.localPosition.x += speed * Time.deltaTime;
  	else if (moveLeft)
   	transform.localPosition.x -= speed * Time.deltaTime;
  
 	}
 	if (moveUpAndDown) // Vertical movement
 	{
  	if (transform.localPosition.y <= lowLimit)
  	{
   		moveUp = true;
   		moveDown = false;
  	}
  	else if (transform.localPosition.y >= heightLimit)
  	{
   		moveDown = true;
   		moveUp = false;
  	}
  		// Move platform Up and Down
  		if (moveUp)
   	transform.localPosition.y += speed * Time.deltaTime;
  		if (moveDown)
   	transform.localPosition.y -= speed * Time.deltaTime;
 	}
}