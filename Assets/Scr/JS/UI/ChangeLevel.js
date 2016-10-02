#pragma strict

public class ChangeLevel extends MonoBehaviour
{
public var levelName : String;

	function LoadLevel ()
	{
		Application.LoadLevel(levelName);
	}
}
