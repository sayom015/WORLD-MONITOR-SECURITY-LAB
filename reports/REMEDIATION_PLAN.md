# REMEDIATION PLAN

## VULN-001 (Broken Authentication)
**Root Cause**: Trusting client-supplied user ID without a password validation.
**Recommended Fix**: Validate user credentials (password check) and issue HttpOnly, Secure, SameSite cookies.
**Status**: Implemented in `secure-app`.

## VULN-002 (Insecure Direct Object Reference)
**Root Cause**: Server fails to check object ownership.
**Recommended Fix**: Validate `resource.ownerId === req.user.id` or check if user is `admin`.
**Status**: Implemented in `secure-app`.

## VULN-003 (Missing Function-Level Auth)
**Root Cause**: Admin endpoints missing authorization middleware.
**Recommended Fix**: Apply a `requireAdmin` middleware checking `req.user.role === 'admin'`.
**Status**: Implemented in `secure-app`.
