# ARCHITECTURE

This represents the architecture of the local security lab, simulating the World Monitor application.

```mermaid
graph TD
    User([User])
    Frontend[Frontend (Mocked)]
    API[API (Express)]
    Auth[Authentication Middleware]
    Authz[Authorization Middleware]
    BusinessLogic[Business Logic]
    DB[(Database - In Memory SQLite mock)]
    
    User -->|HTTP Requests| Frontend
    Frontend -->|REST/JSON| API
    API --> Auth
    Auth --> Authz
    Authz --> BusinessLogic
    BusinessLogic --> DB
```

## Components
- **API**: Serves endpoints on localhost:3001 (Vulnerable) and localhost:3002 (Secure).
- **Database**: Mock in-memory objects to simulate user profiles, alerts, and events safely without exposing real data.
