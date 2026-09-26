# Project permissions

Every project read and write checks membership on the server. These are the initial rules; update this table when an operation is implemented.

| Operation | Owner | Admin | Member |
| --- | --- | --- | --- |
| View project, milestones, tasks, and members | Yes | Yes | Yes |
| Edit project details | Yes | Yes | No |
| Send or revoke invitations | Yes | Yes | No |
| Remove a member | Yes | Yes | No |
| Change roles or transfer ownership | Yes | No | No |
| Delete project | Yes | No | No |
| Create and edit milestones and tasks | Yes | Yes | Yes |
| Complete or reopen a task | Yes | Yes | Only when assigned |

An admin cannot remove the owner. The owner must transfer ownership before leaving. Task assignment requires active membership. The member-removal and deletion flows will specify how to handle existing tasks before those operations are built.
