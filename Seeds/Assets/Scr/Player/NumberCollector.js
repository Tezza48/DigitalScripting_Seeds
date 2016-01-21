#pragma strict

private var _Game : Game;
private var _LevelTimer : LevelTimer;

private var pickupBonus : float = 5;

function Start (){
	_Game = GameObject.Find("Game").GetComponent.<Game>();
	_LevelTimer = _Game.GetComponent.<LevelTimer>();
}

function OnTriggerEnter (other : Collider){
      if (other.tag == "Number"){
            var othersNumber : NumberItem = other.GetComponent.<NumberItem>();
            _Game.CollectNumber(othersNumber.number);
            othersNumber.Explode();
            _LevelTimer.AddTime(pickupBonus);
      }
}
