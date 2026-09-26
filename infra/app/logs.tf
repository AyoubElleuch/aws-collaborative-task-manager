resource "aws_cloudwatch_log_group" "health" {
  name              = "/aws/lambda/aws-collaborative-task-manager-health"
  retention_in_days = 14
}
