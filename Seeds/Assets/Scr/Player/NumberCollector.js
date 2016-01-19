#pragma strict

function Start (){
}

function OnTriggerEnter (other : Collider){
      if (other.tag == "Number"){
            var othersNumber : NumberItem = other.GetComponent.<NumberItem>();
            Game.instance.CollectNumber(othersNumber.number);
            other.gameObject.SetActive(false);
      }
}
