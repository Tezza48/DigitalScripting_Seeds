#pragma strict

private var _Game : Game;

function Start (){
	_Game = GameObject.Find("Game").GetComponent.<Game>();
}

function OnTriggerEnter (other : Collider){
      if (other.tag == "Number"){
            var othersNumber : NumberItem = other.GetComponent.<NumberItem>();
            _Game.CollectNumber(othersNumber.number);
            othersNumber.Explode();
      }
}
