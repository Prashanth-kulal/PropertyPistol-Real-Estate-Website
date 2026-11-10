# PropertyPistol Backend

Express 5 + MongoDB (Mongoose 9) API for the PropertyPistol / AuraLiving Next.js frontend.
It serves the same data the frontend currently hard-codes in `src/data/*`, and adds the business workflows a
real-estate portal runs on: **lead capture → CRM → follow-up**, **OTP / email auth**, **wishlist**,
**owner property submissions with moderation**, **search & compare**, **calculators**, and an **AI property matcher**.

```
Next.js frontend ──HTTPS──▶  Express API  ──▶  MongoDB
  (src/lib/api.js)            │  helmet · cors · rate limits · zod validation · JWT
                              ├─ services: otp/sms · mailer · lead pipeline · calculators · ai search
                              └─ routes:   auth · catalog · leads · me · property-submissions · content · tools · admin
```

## Quick start

```bash
cd propertypistol-backend
cp .env.example .env            # defaults work for local dev
npm install
# MongoDB: local install, or  docker run -d -p 27017:27017 mongo:7
npm run seed                    # loads 43 projects, 19 cities, 10 developers, blog, jobs, offices, transit maps ...
node scripts/create-admin.js you@example.com 'StrongPassw0rd!' "Your Name" admin
npm run dev                     # http://localhost:5000/api/health
npm test                        # 22 tests (no database needed)
```

Wire the frontend: copy `frontend-integration/api.js` over `src/lib/api.js` and add to the frontend's `.env.local`:
`NEXT_PUBLIC_API_URL=http://localhost:5000/api`. Without that variable the frontend keeps using its mock data.

## Workflows

### 1. Lead lifecycle (the money path)
Every form on the site (home consultation, project enquiry/site visit, home loan, PropCheck, NRI/Dubai desk,
builder service, property advisory, rent agreement, …) posts to **`POST /api/leads`** with a `type`.

```
form submit
  → honeypot check (bots get a fake 201, nothing stored)
  → validate + normalise phone (+91 / 0 prefixes stripped); field aliases accepted (fullName/phoneNumber…)
  → resolve project (slug or legacy id "proj-1")
  → dedupe: same phone + type + project within 24h  → note added to existing lead, no new row
  → assign: least-loaded active agent (open leads count, then oldest last-assignment)
  → notify: email assignee/sales inbox + acknowledgement to customer (async, never blocks the response)
  → respond { leadId: "PP-L-20261110-4F2A" }
```
Agents then work the lead in the admin API: `new → contacted → qualified → site-visit-scheduled → negotiation → won | lost | spam`.
Moving a lead out of `new` stamps `firstContactedAt`, which feeds the **"15-minute callback" SLA** metric on `/api/admin/stats`.
Agents only see their own leads; admins see all, can reassign, and manage users.

### 2. Auth
* **Phone OTP** (login page default): `POST /auth/otp/request` → `POST /auth/otp/verify` (4 digits, 5-min expiry, 5 attempts, 30s resend cooldown, hashed in DB, single use). First verification creates the account.
* **Email + password**: `/auth/register`, `/auth/login` (bcrypt, generic error to prevent account enumeration).
* Short-lived **access JWT** (15 min, `Authorization: Bearer`) + rotating **refresh token** in an httpOnly cookie (hash stored server-side, max 5 sessions, reuse of a rotated token is rejected). Changing password signs out other devices.
* Roles: `user`, `agent`, `admin`.

### 3. Post a property (`/post-property`)
`POST /property-submissions` → stored as **pending** + a lead is created so sales calls the owner →
admin reviews at `GET /admin/submissions` → `PATCH /admin/submissions/:id {action: approve|publish|reject}` →
**publish** creates a live listing (`listingType: resale|rent`) that appears in normal search.

### 4. Wishlist / compare
Wishlist is stored per user by project slug. After login call `POST /me/wishlist/sync` with the localStorage list to merge guest saves.
`POST /compare` returns up to 4 projects side by side.

## API reference (prefix `/api`)

| Area | Endpoints |
|---|---|
| Catalogue | `GET /projects` (filters: `city q builder status bhk=2,3 minPrice maxPrice exclusive rera tag propertyType listingType sort page limit`) · `GET /projects/:slug` (+developer, similar) · `GET /projects/:slug/nearby?radiusKm=` · `GET /projects/category/:category` (`new-projects`, `ready-to-move`, `under-construction`, `rera-compliant`) · `GET /projects/exclusive` · `GET /search/suggest?q=` · `POST /compare` |
| Cities | `GET /cities` · `/cities/:slug` · `/cities/:slug/price-trends` · `/cities/:slug/transit` |
| Developers | `GET /developers` · `/developers/:slug` |
| Leads | `POST /leads` |
| Auth | `POST /auth/otp/request` · `/auth/otp/verify` · `/auth/register` · `/auth/login` · `/auth/refresh` · `/auth/logout` · `/auth/password` · `GET/PATCH /auth/me` |
| User | `GET /me/wishlist` · `PUT/DELETE /me/wishlist/:slug` · `POST /me/wishlist/sync` · `GET /me/enquiries` · `GET /me/properties` |
| Owner listings | `POST /property-submissions` |
| Content | `GET /testimonials` `/faqs` `/offices` `/site-content` `/blog` `/blog/:slug` `/jobs` · `POST /newsletter` · `POST /jobs/:slug/apply` |
| Tools | `POST /tools/emi` · `/tools/loan-eligibility` · `GET /tools/unit-convert` · `POST /tools/ai/chat` |
| Admin / agent | `GET /admin/stats` · `GET /admin/leads` · `GET /admin/leads/:id` · `PATCH /admin/leads/:id/status` · `/assign` · `POST /admin/leads/:id/notes` · `GET /admin/agents` · submissions + users (admin) · CRUD (admin) for `projects developers cities testimonials faqs blog jobs offices` |

Errors are always `{ success:false, message, details? }` with a proper status (400 validation, 401, 403, 404, 409, 429).

## Frontend page → endpoint map

| Frontend | Backend |
|---|---|
| Hero search / `getListings` | `GET /projects`, `GET /search/suggest` |
| City page, price trends, rail network | `GET /cities/:slug`, `/price-trends`, `/transit` |
| `/projects/[slug]` | `GET /projects/:slug`, `/nearby` |
| Category pages | `GET /projects/category/:category` |
| Consultation form, ProjectInquiryModal, home-loan, propcheck, NRI/Dubai desk, builder-service, advisory | `POST /leads` (set `type`) |
| `/login` | `/auth/otp/*`, `/auth/login`, `/auth/register` |
| Wishlist / saved-properties | `/me/wishlist*` |
| Compare tray | `POST /compare` |
| `/post-property` | `POST /property-submissions` |
| Aura AI modal / `/ask-ai` / `/piston-ai` | `POST /tools/ai/chat` |
| EMI, eligibility, unit converter | `/tools/*` (the pages also work fully client-side) |
| Blog, careers, offices, testimonials, FAQ | `/blog`, `/jobs`, `/offices`, `/testimonials`, `/faqs` |

## Data

`seed/*.json` was generated from your frontend's `src/data/*` by `scripts/export-frontend-data.mjs`
(merges the four overlapping project lists by slug, parses BHK / carpet area / numeric price for filtering, attaches map coordinates as GeoJSON).
Re-run `npm run export:frontend -- /path/to/frontend` then `npm run seed` if the frontend data changes. Seeding is idempotent (upsert by slug) and never touches users, leads or submissions.

## Production checklist
* Set strong `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` (the server refuses to start in production without them) and an exact `CORS_ORIGINS`.
* Use MongoDB Atlas (or a replica set) with backups. `npm run seed` builds the 2dsphere/text indexes.
* SMS: set `SMS_PROVIDER=msg91` with a DLT-approved OTP template (`services/sms.js`; add other providers there). In dev the OTP is returned as `devCode` and logged; in production it never is.
* Email: set SMTP vars so sales gets lead alerts.
* Run behind HTTPS and a reverse proxy; refresh cookies are `Secure; SameSite=None` in production.
* Rate limits are in-memory per process – use a Redis store (`rate-limit-redis`) if you run several instances.

## Not included (by design – say the word and I'll add them)
Image/PDF upload (photos are accepted as URLs; plug in S3/Cloudinary signed uploads), payments, rent-agreement / e-registration / stamp-duty
back-office flows (those forms already post as leads), WhatsApp notifications, and an LLM-backed version of `/tools/ai/chat`
(current matcher is rule-based: city, BHK, budget, status, locality keywords).
