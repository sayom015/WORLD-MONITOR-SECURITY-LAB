# OWASP MAPPING

This document maps the vulnerabilities demonstrated in the local security lab to the OWASP Top 10 (2021).

| Lab ID | Vulnerability | OWASP Category | Remediation Implemented |
|--------|---------------|----------------|--------------------------|
| VULN-001 | Broken Authentication | A07:2021 - Identification and Authentication Failures | Enforced password validation and Secure cookies. |
| VULN-002 | Insecure Direct Object Reference (IDOR) | A01:2021 - Broken Access Control | Added `ownerId` checks against the authenticated `req.user.id`. |
| VULN-003 | Missing Function-Level Auth | A01:2021 - Broken Access Control | Added `requireAdmin` middleware. |
| VULN-005 | Reflected XSS | A03:2021 - Injection | Implemented strict HTML context output encoding. |
| VULN-007 | Sensitive Data Exposure | A04:2021 - Insecure Design / A01 | Created a `sanitizeUser` DTO to filter internal fields. |
| VULN-010 | Security Header Misconfiguration | A05:2021 - Security Misconfiguration | Integrated `helmet` middleware. |
