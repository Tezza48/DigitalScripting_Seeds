using UnityEngine;
using UnityEngine.UI;
using System.Collections.Generic;
using System;

public class TerminalBash : MonoBehaviour {

    /*
        output buffer to TerminalOutput
        take in simple novel commands: help, man, ls
        take in command seed [uint]
        send command to Game and display apropriate output

        input field should display ":>  " in front of entered text
    */

    enum Commands
    {
        help,
        man,
        ls,
        seed,
        INVALID
    }

    private Dictionary<string, Commands> commandPairs = new Dictionary<string, Commands>
    {
        { "help", Commands.help },
        { "man", Commands.man },
        { "ls", Commands.ls },
        { "seed", Commands.seed }
    };

    private string[] outBuffer;
    private Game game;

    private const string lineBeginning = ":>    ";

    public Text output;
    public InputField input;

	// Use this for initialization
	void Start ()
    {
        game = FindObjectOfType<Game>();
        initOutBuffer(out outBuffer);
        input.text = lineBeginning;
    }

    private void initOutBuffer(out string[] buffer, int size = 32)
    {
        buffer = new string[size];

        for (int i = 0; i < buffer.Length; i++)
            buffer[i] = "";

        buffer[5] = lineBeginning + "\"Gibson\" was not found... did you mean \"Mess with the best\"?";
        buffer[4] = "die with the rest...";
        buffer[3] = lineBeginning + 1;
        buffer[2] = lineBeginning+2;
        buffer[1] = lineBeginning+3;
        buffer[0] = lineBeginning+4;
    }

    // Update is called once per frame
    void Update ()
    {
        input.textComponent.text = lineBeginning + input.text;
        DrawOutput();
	}

    void DrawOutput()
    {
        output.text = "";
        for (int i = outBuffer.Length - 1; i >= 0; i--)
        {
            output.text += outBuffer[i] + ((i > 0)? "\n" : "");
        }
    }

    public void Parse()
    {
        string manipulateInput = input.text.Remove(0, lineBeginning.Length);
        string[] inStrings = manipulateInput.Split(' ');
        Commands command = commandPairs.ContainsKey(inStrings[0]) ? commandPairs[ inStrings[0] ] : Commands.INVALID;

        // write the entered string to the output buffer
        BufferAddFirst(ref outBuffer, lineBeginning + manipulateInput);

        switch (command)
        {
            case Commands.seed:
                break;
            case Commands.help:
                //break;
            case Commands.man:
                //break;
            case Commands.ls:
            //break;
            case Commands.INVALID:
            default:
                BufferAddFirst(ref outBuffer, "");
                BufferAddFirst(ref outBuffer, "\"" + inStrings[0] + "\" is not a recobnised command");
                break;
        }
        input.text = lineBeginning;
    }

    private void BufferAddFirst(ref string[] outBuffer, string v)
    {
        for (int i = outBuffer.Length - 1; i > 0; i--)
        {
            outBuffer[i] = outBuffer[i - 1];
        }
        outBuffer[0] = v;
    }
}
