#pragma strict

public var number : int;

public function Explode (){
	var thisParticles : ParticleSystem = transform.Find("Particle System").GetComponent.<ParticleSystem>();
	thisParticles.Play();
	thisParticles.transform.parent = GameObject.Find("Maze").transform;
	Destroy(gameObject);
}