# ESG SaaS MVP Blueprint

## Product frame

This MVP is a multi-tenant ESG SaaS platform for enterprise customers that need to collect ESG evidence, manage logistics and material data, and prepare compliance-facing reports with executive drill-down.

## Personas

- Store manager: uses a mobile browser to upload photos of materials, log weight and material type, and add location notes from a store or facility.
- ESG administrator: uses the desktop portal to review evidence, input logistics records, validate data quality, and generate ESG reporting output.
- Executive: uses the dashboard to monitor carbon footprint by supply-chain component, drill into evidence, and inspect supplier certificates or qualifications.

## Core MVP workflows

### 1. Store evidence capture

- Select tenant and authenticated store context.
- Capture photo evidence from a mobile browser camera flow.
- Enter material type, weight, store zone, and notes.
- Upload the record into the tenant data store with timestamp and actor metadata.

### 2. Admin operations and reporting

- Review the latest store submissions and evidence freshness.
- Add logistics data such as lane, transport mode, distance, and load.
- See KPI cards for reporting completeness, supplier coverage, and evidence counts.
- Generate an ESG draft report that pulls from the uploaded evidence and logistics data.

### 3. Executive supply-chain drill-down

- View supply-chain components or suppliers with carbon contribution and coverage.
- Drill into a supplier or node to see emissions, evidence items, and certificates.
- Use evidence and credentials to challenge or validate the reported ESG story.

## Suggested data model

- `Tenant`: company account, reporting cycle, branding, access policy
- `User`: role, tenant membership, store or corporate scope
- `Store`: location metadata and manager ownership
- `EvidenceItem`: photo, material type, weight, store zone, note, timestamp
- `LogisticsRecord`: lane, mode, load, distance, modeled emissions
- `Supplier`: region, category, carbon contribution, coverage status
- `SupplierCertificate`: title, issuer, expiry date, file attachment
- `ESGReport`: reporting period, draft narrative, review status, published version

## Architecture recommendation for the next phase

- Frontend: responsive React web app with role-based routes and mobile-friendly forms
- Backend: FastAPI or similar API layer with tenant-aware auth and audit logging
- Database: PostgreSQL with tenant scoping and attachment metadata
- Storage: object storage for evidence photos and certificate files
- Reporting: structured report generation service with human approval before export

## What the prototype in `app/` proves

- The information architecture supports all three personas in one tenant-aware portal.
- The mobile browser flow works as a first-class citizen rather than a reduced afterthought.
- Executives can see both high-level footprint indicators and the evidence beneath them.
- The system can evolve into a true SaaS product without changing the fundamental UX model.
