# AWS bootstrap

Creates the GitHub OIDC provider, a role trusted by this repository's `main` branch, and a private S3 bucket for future application Terraform state. The role has no AWS resource permissions yet. The bucket has versioning and public access blocked. Amazon S3 encrypts new objects by default.

The bootstrap itself still uses local Terraform state. Back up `infra/bootstrap/terraform.tfstate` outside Git before applying changes. From the repository root in PowerShell, using the intended AWS CLI profile:

```powershell
aws sts get-caller-identity
Set-Location infra/bootstrap
terraform init
terraform plan -out bootstrap.tfplan
terraform apply bootstrap.tfplan
terraform output -raw github_main_role_arn
terraform output -raw terraform_state_bucket_name
```

Check the account ID and review the plan before applying. The bucket name includes that account ID. In GitHub, set **Settings → Secrets and variables → Actions → Variables → Repository variables → `AWS_ROLE_ARN`** to the **entire** role ARN output. After this workflow reaches `main`, **Verify AWS OIDC** checks that GitHub can assume the role.

Keep the local bootstrap state safe and out of Git. The application will use a separate state object in this bucket when its Terraform root is added. That root will enable S3 lockfiles so two runs cannot update the same state at once. We currently plan one AWS application stack and local development, not separate cloud development and production stacks.
