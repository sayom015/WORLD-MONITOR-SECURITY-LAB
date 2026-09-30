# VULN-001 — Broken Authentication

## Description
The application accepts user IDs directly from the client and logs the user in without validating a password or secret.

## Affected Component
`/api/login` endpoint (vulnerable-app)

## Vulnerability Category
OWASP A07: Identification and Authentication Failures

## Root Cause
Trusting client-provided user ID without verifying a credential.

## Safe Local Proof of Concept
```http
POST /api/login HTTP/1.1
Host: localhost:3001
Content-Type: application/json

{"userId": 1}
```

## Expected Behavior
The application should reject the request because no valid credential was supplied.

## Actual Behavior
The application returns a session cookie and JWT for the requested user ID.

## Severity
High

## CVSS v3.1
Score: 8.1
Vector: CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N

## Remediation
Enforce password validation, use secure password hashes, and issue secure (HttpOnly, SameSite, Secure) cookies.
