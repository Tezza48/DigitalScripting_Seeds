using System;
using System.Collections;
using UnityEngine;

public enum Interaction
{
None,
Terminal,
Number,
Collectable
}

public class PlayerController : MonoBehaviour
{
    private Game _Game;
    private Interaction interaction = Interaction.None;
    private Rigidbody _Rigidbody;
    //private Vector3 velocity;
    private bool canMove = true;

    public Transform cameraT;

    public const float accel = 100f;
    public const float interactMaxDist = 3f;
    public const float lookSpeed = 10;
    public const float maxSpeed = 20f;

    public Interaction Interaction
    {
        get
        {
            return interaction;
        }
    }

    // Use this for initialization
    void Start()
    {
        _Rigidbody = GetComponent<Rigidbody>();
    }

    public void Init(Game _game)
    {
        _Game = _game;
        _Game.PlayerController = this;
    }

    public void Update()
    {
        Look();
    }

    public void FixedUpdate()
    {
        Move();
        InteractionRay();
    }

    private void InteractionRay()
    {
        RaycastHit ray;
        if (Physics.Raycast(cameraT.position, cameraT.forward, out ray, interactMaxDist, (int)Mathf.Pow(2, 8)))
        {
            Debug.DrawLine(cameraT.position, ray.point, Color.yellow, 0f, true);
            interaction = FindInteraction(ray);
            if (Input.GetButtonUp("Use"))
            {
                switch (interaction)
                {
                    case Interaction.Terminal:
                        Terminal terminal = ray.collider.GetComponent<Terminal>();
                        terminal.Use();
                        break;
                    case Interaction.Number:
                        Fragment fragment = ray.collider.GetComponent<Fragment>();
                        _Game.CollectNumber(fragment.Use());
                        break;
                    case Interaction.Collectable:
                        //break;
                    default:
                        break;
                }
            }
        }
        else
        {
            interaction = Interaction.None;
        }
    }

    private Interaction FindInteraction(RaycastHit ray)
    {
        switch (ray.collider.tag)
        {
            case "Terminal":
                return Interaction.Terminal;
            case "Number":
            default:
                return Interaction.None;
        }
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
        // create the acceleration vector
        Vector3 newDir = transform.forward * Input.GetAxisRaw("Vertical") + transform.right * Input.GetAxisRaw("Horizontal");
        newDir.Normalize();
        Vector3 currentV = _Rigidbody.velocity;
        if (newDir != Vector3.zero)
            _Rigidbody.velocity = MoveGround(newDir, currentV);
        else
            _Rigidbody.velocity /= 2;
    }

    private Vector3 MoveGround(Vector3 direction, Vector3 currentV)
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
