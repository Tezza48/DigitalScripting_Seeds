using UnityEngine;
using System.Collections;
using System;

public class PlayerController : MonoBehaviour
{
    Vector3 velocity;
    float accel = 100f;
    float maxSpeed = 20f;
    Rigidbody _Rigidbody;

    float lookSpeed = 10;

    public Transform cameraT;

    // Use this for initialization
    void Start()
    {
        _Rigidbody = GetComponent<Rigidbody>();
    }

    public void Update()
    {
        Look();

    }

    // Update is called once per frame
    void FixedUpdate()
    {
        Move();
    }

    private void Look()
    {
        Vector2 mouseDelta = new Vector2(-Input.GetAxisRaw("Mouse Y"), Input.GetAxisRaw("Mouse X"));
        mouseDelta = Vector2.Scale(mouseDelta, Vector2.one * lookSpeed * Time.deltaTime);
        cameraT.localRotation = Quaternion.Euler(mouseDelta.x + cameraT.localRotation.eulerAngles.x, 0, 0);
        transform.localRotation *= Quaternion.Euler(0, mouseDelta.y, 0);
    }

    private void Move()
    {
        //Vector3 newDir = transform.forward * Input.GetAxisRaw("Vertical") + transform.right * Input.GetAxisRaw("Horizontal");
        //if (newDir != Vector3.zero)
        //{
        //    newDir.Normalize();
        //    velocity += newDir * accel;
        //    if (velocity.magnitude >= maxSpeed)
        //    {
        //        velocity = newDir * maxSpeed;
        //    }
        //}
        //else
        //{
        //    velocity += -velocity.normalized * accel;
        //}
        //_Rigidbody.MovePosition(transform.position + velocity);


        // create the acceleration vector
        Vector3 newDir = transform.forward * Input.GetAxisRaw("Vertical") + transform.right * Input.GetAxisRaw("Horizontal");
        newDir.Normalize();
        Vector3 currentV = _Rigidbody.velocity;
        if (newDir != Vector3.zero)
            _Rigidbody.velocity = MoveGround(newDir, currentV);
        else
            _Rigidbody.velocity /= 2;


    }

    Vector3 MoveGround(Vector3 direction, Vector3 currentV)
    {
        Vector3 newVelocity = currentV + direction * accel * Time.deltaTime;
        // check that the new velocity isn't greater than the maximum speed
        if (newVelocity.magnitude > maxSpeed)
        {
            var delta = maxSpeed / newVelocity.magnitude;
            newVelocity.x *= delta;
            newVelocity.z *= delta;
        }
        return newVelocity;
    }
}
