# Product scope

This is a collaborative task manager for small teams. We will update this document as each feature is built.

## Core journey

1. A person signs up with email and password, verifies their email, and chooses a unique username and full name before using the app.
2. They create a project and invite teammates by email or existing username. An invite joins the project only after the recipient signs in with the matching verified email.
3. Project members create milestones and tasks, assign tasks to members, and mark their assigned tasks done. A milestone with tasks is done when all of its tasks are done; an empty milestone is open.
4. If someone edits stale data, the app shows the latest saved version and lets them review their change before trying again.

## Stable decisions

- Cognito `sub` identifies a user. Usernames are unique without regard to case and cannot be changed in the first version.
- The frontend uses Cognito authorization code with PKCE. AWS deployment identity is separate from user sign-in.
- Develop and test locally, then deploy one AWS application stack from `main`. Add a separate cloud test stack only if the project needs one later.
- Writes use a version precondition. The API returns `428` when it is missing, `412` when it is stale, and `409` for a business conflict.

Details such as field limits, deletion behavior, and invitation expiry belong in the feature change that implements them.
