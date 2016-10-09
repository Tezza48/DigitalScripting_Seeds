using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;

public class CanvasController : MonoBehaviour {

    public Text interactText;

    private const string s_use = "Press E to use";
    private const string s_take = "Press E to take this";

    private const string s_terminal = "Terminal";
    private const string s_number = "Number";

    // Use this for initialization
    void Start ()
    {
	    
	}
	
	// Update is called once per frame
	void Update ()
    {
	
	}

    public void SetInteractText(Interaction _inte)
    {
        interactText.text = makeStringFor(_inte);
    }

    private string makeStringFor(Interaction _inte)
    {
        switch (_inte)
        {
            case Interaction.Terminal:
                return s_use + " " + s_terminal;
            case Interaction.Number:
                return s_take + " " + s_number;
            case Interaction.Collectable:
            case Interaction.None:
                return "";
            default:
                return "";
        }
    }
}
