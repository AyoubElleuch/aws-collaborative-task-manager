# AWS OIDC bootstrap

Creates the GitHub OIDC provider and a role trusted by this repository's `main` branch. The role has no AWS resource permissions yet.

From the repository root in PowerShell, using the intended AWS CLI profile:

```powershell
aws sts get-caller-identity
Set-Location infra/bootstrap
terraform init
terraform plan -out bootstrap.tfplan
terraform apply bootstrap.tfplan
terraform output -raw github_main_role_arn
```

Check the account ID and review the plan before applying. In GitHub, set **Settings → Secrets and variables → Actions → Variables → Repository variables → `AWS_ROLE_ARN`** to the **entire** ARN printed by the last command. After this workflow reaches `main`, **Verify AWS OIDC** checks that GitHub can assume the role.

Keep `infra/bootstrap/terraform.tfstate` safe and out of Git: this bootstrap uses local state. Keep the Terraform files while the role is in use.
