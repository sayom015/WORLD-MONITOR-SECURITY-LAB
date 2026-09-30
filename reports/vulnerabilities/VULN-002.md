# VULN-002 — Insecure Direct Object Reference (IDOR)

## Description
The application fetches alert records based on the ID provided in the URL without checking if the currently authenticated user is the owner of that alert.

## Affected Component
`GET /api/alerts/:id` (vulnerable-app)

## Vulnerability Category
OWASP A01: Broken Access Control

## Root Cause
Lack of server-side ownership validation before returning requested resources.

## Safe Local Proof of Concept
```http
GET /api/alerts/2 HTTP/1.1
Host: localhost:3001
# Requesting an alert belonging to User B (ID: 3)
```

## Expected Behavior
The API should return a 403 Forbidden or 404 Not Found if the requester is not User B.

## Actual Behavior
The API returns the alert content belonging to User B, leading to horizontal privilege escalation.

## Severity
Medium

## CVSS v3.1
Score: 6.5
Vector: CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N

## Remediation
Check the `ownerId` of the requested resource against the `id` of the authenticated session.
