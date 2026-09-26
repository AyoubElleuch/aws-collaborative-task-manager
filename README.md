# AWS Collaborative Task Manager

Project layout:

- `frontend/` — React and TypeScript app
- `backend/` — backend placeholder
- `infra/bootstrap/` — GitHub to AWS OIDC setup and Terraform state bucket
- `infra/app/` — application S3 backend; app resources are not defined yet

Both Terraform roots use separate state files in S3 with locking. See [bootstrap setup and state migration](infra/bootstrap/README.md). To initialize the application root, run `terraform init`, `terraform validate`, and `terraform plan` from `infra/app` in an authenticated shell. Until app resources are added, the plan should report no changes.

## Run the frontend

```sh
npm ci --prefix frontend
npm run dev
```

From the repository root, `npm run lint`, `npm test`, and `npm run build` check the frontend. The backend and app infrastructure are not implemented yet.
