# World Monitor Security Laboratory

## Reference Datasets / Inspiration
This academic project is conceptually inspired by the World Monitor application. The following references serve as the architectural and feature datasets for this laboratory:
- **Reference Application**: [https://www.worldmonitor.app](https://www.worldmonitor.app)
- **Reference Source Code**: [https://github.com/koala73/worldmonitor](https://github.com/koala73/worldmonitor)

## Project Overview
This is a self-contained, academic cybersecurity laboratory designed to simulate and remediate common web application vulnerabilities (like Broken Auth, IDOR, and XSS). 

**IMPORTANT SAFETY BOUNDARY**: This lab is 100% local. It contains synthetic data and mock endpoints. It does not attack, scan, or interact with any real-world production systems, including the reference datasets listed above.

## Architecture
- **Vulnerable App**: An Express.js server running on port `3001` that intentionally implements unsafe patterns.
- **Secure App**: An Express.js server running on port `3002` that demonstrates proper defensive programming and remediation.

## Installation & Requirements
- Node.js (v14+)
- npm

## How to Run
Open a terminal (PowerShell) in this directory and run the automated demo script:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\demo.ps1
```

Or manually:
```bash
npm install
npm run start-vuln &
npm run start-secure &
npm run test
```

## Reproducing Findings
The `security-tests/run-tests.js` script acts as the automated test harness. It demonstrates exactly how the vulnerable application fails security checks, and how the secure application successfully blocks the same attacks.

## Reports
Documentation is available in the `docs/` and `reports/` directories, including:
- Architecture
- Threat Model
- OWASP Mapping
- Vulnerability Reports (VULN-XXX)
- Final Security Assessment
