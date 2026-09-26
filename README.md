# AWS Collaborative Task Manager

React and TypeScript frontend with a TypeScript Lambda health API.

## Project layout

- `frontend/` — frontend page and tests
- `backend/` — health handler, local HTTP server, and tests
- `infra/bootstrap/` — GitHub OIDC role and Terraform state bucket
- `infra/app/` — Lambda, API Gateway, logging, S3, and CloudFront
- `docs/api.md` — API contract

## Local development

Use Node.js 22. Run commands from the repository root.

Install dependencies:

```sh
npm ci --prefix frontend
npm ci --prefix backend
```

Create `frontend/.env.development.local` containing:

```dotenv
VITE_HEALTH_URL=/health
```

Start the backend in one terminal:

```sh
npm run dev --prefix backend
```

Start the frontend in another terminal:

```sh
npm run dev
```

Open http://localhost:3000 and click **Check connection**.

Vite forwards `/health` to the backend at http://127.0.0.1:3001.
Local development does not require AWS credentials.

Restart the backend after changing its code. Restart the frontend
after changing its environment file.

## Checks

Frontend:

```sh
npm run lint
npm test
npm run build
```

Backend:

```sh
npm run lint --prefix backend
npm test --prefix backend
npm run build --prefix backend
```

Automated tests do not require running servers or AWS access.

## Infrastructure

Terraform defines the health API and frontend hosting. Both Terraform
roots store state in S3 using separate keys with locking.

See [bootstrap setup](infra/bootstrap/README.md) for state and identity
configuration.

To review application infrastructure, use an authenticated shell.
Build the backend first because Terraform packages the compiled handler:

```sh
npm run build --prefix backend
cd infra/app
terraform init
terraform validate
terraform plan
```

A plan previews changes without applying them.

The application exposes these Terraform outputs:

- `health_url`
- `frontend_bucket_name`
- `website_url`
- `frontend_distribution_id`

Deployment automation is not configured yet. The frontend deployment
build will need `VITE_HEALTH_URL` set to the `health_url` output.
