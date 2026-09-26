# AWS Collaborative Task Manager

Project layout:

- `frontend/` — React and TypeScript app
- `backend/` — TypeScript Lambda health handler and tests
- `infra/bootstrap/` — GitHub to AWS OIDC setup and Terraform state bucket
- `infra/app/` — application S3 backend; app resources are not defined yet

Both Terraform roots use separate state files in S3 with locking. See [bootstrap setup and state migration](infra/bootstrap/README.md). To initialize the application root, run `terraform init`, `terraform validate`, and `terraform plan` from `infra/app` in an authenticated shell. Until app resources are added, the plan should report no changes.

## Run the frontend

```sh
npm ci --prefix frontend
npm run dev
```

From the repository root, `npm run lint`, `npm test`, and `npm run build` check the frontend.

## Work on the backend

Use Node.js 22, matching CI. Run these commands from the repository root:

```sh
npm ci --prefix backend
npm run lint --prefix backend
npm test --prefix backend
npm run build --prefix backend
```

The backend has its own package and dependencies. Its build compiles TypeScript
from `backend/src` into JavaScript in `backend/dist`. Tests live separately in
`backend/tests` and run directly against the source using Vitest. CI checks both
the frontend and backend on pull requests and pushes to `dev` and `main`.

After building, invoke the compiled handler locally:

```sh
node --input-type=module -e "import { handler } from './backend/dist/main.js'; console.log(await handler())"
```

This prints a response with status code `200`, a JSON content-type header, and
the body `'{"status":"ok"}'`. It calls the function directly; it does not start an
HTTP server or require AWS credentials.

Start reading with the [health API contract](docs/api.md), then the
[handler](backend/src/main.ts) and its [tests](backend/tests/main.test.ts).
The API Gateway route, Lambda deployment, and application infrastructure are the
next step; no public health URL exists yet.
