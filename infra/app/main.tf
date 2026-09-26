terraform {
  required_version = ">= 1.10.0, < 2.0.0"

  backend "s3" {
    bucket       = "aws-collaborative-task-manager-state-242668367599"
    key          = "app/terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true
  }
}
