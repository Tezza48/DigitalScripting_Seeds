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

[RequireComponent(typeof(CharacterController))]
public class PlayerController : MonoBehaviour
{
    private Game mGameRef;
    private CharacterController mCharacterController;
    private Interaction mInteraction = Interaction.None;

    [SerializeField]
    private Transform mCameraTransform;

    private const float mInteractDist_Max = 3f;

    //private const float mAccel = 100f;
    private const float mLookSpeed = 15f;
    private const float mMaxSpeed = 20f;

    private bool mCanMove = true;

    public Interaction Interaction
    {
        get
        {
            return mInteraction;
        }
    }

    // Use this for initialization
    void Start()
    {
        mCharacterController = GetComponent<CharacterController>();
    }

    public void Init(Game _game)
    {
        mGameRef = _game;
        mGameRef.PlayerController = this;
    }

    public void Update()
    {
        Move();
        Look();
    }

    public void FixedUpdate()
    {
        InteractionRay();
    }

    private void InteractionRay()
    {
        RaycastHit ray;
        if (Physics.Raycast(mCameraTransform.position, mCameraTransform.forward, out ray, mInteractDist_Max, (int)Mathf.Pow(2, 8)))
        {
            Debug.DrawLine(mCameraTransform.position, ray.point, Color.yellow, 0f, true);
            mInteraction = FindInteraction(ray);
            if (Input.GetButtonUp("Use"))
            {
                switch (mInteraction)
                {
                    case Interaction.Terminal:
                        Terminal terminal = ray.collider.GetComponent<Terminal>();
                        terminal.Use();
                        break;
                    case Interaction.Number:
                        GameFragment fragment = ray.collider.GetComponent<GameFragment>();
                        mGameRef.CollectNumber(fragment.Use());
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
            mInteraction = Interaction.None;
        }
    }

    private Interaction FindInteraction(RaycastHit ray)
    {
        switch (ray.collider.tag)
        {
            case "Terminal":
                return Interaction.Terminal;
            case "Number":
                return Interaction.Number;
            default:
                return Interaction.None;
        }
    }

    private void Look()
    {
        if (!Cursor.visible)
        {
            Vector2 mouseDelta = new Vector2(-Input.GetAxisRaw("Mouse Y"), Input.GetAxisRaw("Mouse X"));

            mouseDelta = Vector2.Scale(mouseDelta, Vector2.one * mLookSpeed * Time.deltaTime);

            mCameraTransform.localRotation = Quaternion.Euler(mouseDelta.x + mCameraTransform.localRotation.eulerAngles.x, 0, 0);
            transform.localRotation *= Quaternion.Euler(0, mouseDelta.y, 0);
        }
    }

    private void Move()
    {
        // create the acceleration vector
        Vector3 newDir = transform.forward * Input.GetAxisRaw("Vertical") + transform.right * Input.GetAxisRaw("Horizontal");
        newDir.Normalize();

        mCharacterController.Move(newDir * mMaxSpeed * Time.deltaTime);
    }

    //private Vector3 MoveGround(Vector3 direction, Vector3 currentV)
    //{
    //    Vector3 newVelocity = currentV + direction * mAccel * Time.deltaTime;
    //    // check that the new velocity isn't greater than the maximum speed
    //    if (newVelocity.magnitude > mMaxSpeed)
    //    {
    //        var delta = mMaxSpeed / newVelocity.magnitude;
    //        newVelocity.x *= delta;
    //        newVelocity.z *= delta;
    //    }
    //    return newVelocity;
    //}
}
