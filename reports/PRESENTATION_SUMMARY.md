# WORLD MONITOR SECURITY ASSESSMENT LAB
**Academic Presentation Summary**

## LIVE DEMONSTRATION

Follow these steps to demonstrate VULN-002 (Insecure Direct Object Reference) locally during the presentation:

**Step 1**: Start the application. 
Open a terminal and run: `powershell -ExecutionPolicy Bypass -File .\scripts\run-demo.ps1` to start both APIs and the dashboard.

**Step 2**: Create/use synthetic User A (ID: 2) and User B (ID: 3). These exist in the mock database.

**Step 3**: Show User B's legitimate alert. Alert ID 2 belongs to User B.

**Step 4**: Show the vulnerable behavior in the isolated vulnerable application. 
Execute an unauthenticated GET request (or simulate logging in as User A) to `http://localhost:3001/api/alerts/2`. The API will return the alert contents without verifying ownership.

**Step 5**: Explain the security impact. 
Because the application did not verify if the requester was `ownerId: 3`, User A successfully extracted private information belonging to User B. This is horizontal privilege escalation.

**Step 6**: Switch to `secure-app`. 
The secure app runs on `http://localhost:3002`.

**Step 7**: Repeat the same test. 
Send a GET request to `http://localhost:3002/api/alerts/2` passing User A's session cookie (`Cookie: session=2`).

**Step 8**: Show that authorization now prevents the behavior. 
The API correctly returns `403 Forbidden: You do not own this resource`.

**Step 9**: Run the automated regression test. 
Show the terminal output from `node security-tests/run-tests.js`.

**Step 10**: Show PASS. 
Point to `[SEC-TEST-002-SECURE] Result: PASS (Remediation confirmed)` in the test logs and dashboard.

*(Do not demonstrate this against World Monitor production.)*
