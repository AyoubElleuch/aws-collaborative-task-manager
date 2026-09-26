data "archive_file" "health" {
  type                    = "zip"
  source_content          = file("${path.module}/../../backend/dist/main.js")
  source_content_filename = "main.mjs"
  output_path             = "${path.module}/../../backend/dist/health.zip"
  output_file_mode        = "0644"
}
