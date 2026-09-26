# AWS bootstrap

Manages the GitHub OIDC provider, a role trusted by this repository's `main` branch, and the private Terraform state bucket. The role has no AWS resource permissions yet. The bucket has versioning and public access blocked.

Both Terraform roots use the existing bucket `aws-collaborative-task-manager-state-242668367599` in `us-east-1`, with separate keys and S3 state locking:

- Bootstrap: `bootstrap/terraform.tfstate`
- Application: `app/terraform.tfstate`

## Migrate existing bootstrap state

The bucket must already exist. On the computer holding the existing bootstrap state, keep the previous state backup and run from the repository root in your authenticated PowerShell:

```powershell
cd infra/bootstrap
terraform init -migrate-state
terraform plan
```

Answer `yes` when Terraform asks to copy the existing state to the new backend. The plan should report no changes. If it proposes recreating existing resources, stop; do not apply. Confirm the uploaded file exists:

```powershell
aws s3 ls s3://aws-collaborative-task-manager-state-242668367599/bootstrap/terraform.tfstate
```

## Subsequent use

From the repository root in an authenticated PowerShell:

```powershell
cd infra/bootstrap
terraform init
terraform plan
```

For intended resource changes, review the plan before running `terraform apply`. Use `terraform output -raw github_main_role_arn` to obtain the entire ARN for the GitHub Actions repository variable `AWS_ROLE_ARN`. **Verify AWS OIDC** checks that GitHub can assume the role.

Keep state files, backups, and plans out of Git. The bucket was originally created using local bootstrap state; a fresh setup cannot initialize this S3 backend before the bucket exists. We use one AWS application stack with local development.
