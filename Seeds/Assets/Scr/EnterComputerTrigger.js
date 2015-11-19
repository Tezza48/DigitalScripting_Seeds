#pragma strict

public var computerMenu : UnityEngine.UI.Image;

function Start () {
  computerMenu = GameObject.FindGameObjectWithTag("Terminal Menu").GetComponent.<UnityEngine.UI.Image>();
  computerMenu.gameObject.SetActive(false);
}

function OnTriggerEnter (other : Collider) {
  if (other.tag == "Terminal"){
    computerMenu.gameObject.SetActive(true);
    Time.timeScale = 0;
  }
}
