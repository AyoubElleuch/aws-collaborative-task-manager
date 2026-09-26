# API contract

## GET /health

Reports that the API can respond. This is a public endpoint: no
authentication, request body, or query parameters are required.

Successful response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"status":"ok"}
```

The response is a JSON object with one field, `status`, whose value is the string
`"ok"`. This endpoint does not check database connectivity or other external
services.
