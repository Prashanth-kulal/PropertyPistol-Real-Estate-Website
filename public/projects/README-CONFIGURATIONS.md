# AuraLiving / PropertyPistol Configurations & Plan Image Replacement Guide

This guide describes how architectural floor plans, master plans, and site layout plans are organized and how to easily update or replace plan images in the future without modifying any React components.

---

## 1. Directory Structure

All configuration assets are organized by genuine **Project ID**:

```text
public/
  projects/
    <projectId>/
      configurations/
        manifest.json                     # Per-project verified configuration manifest
        master-plans/
          master-plan-01.webp             # Master layout plans
          master-plan-02.webp
        site-plans/
          site-plan-01.webp               # Tower / site layout plans
          site-plan-02.webp
        unit-plans/
          <bhk-slug>/                     # E.g. 1-bhk, 2-bhk, 3-bhk, 4-bhk
            <area>-sqft/                  # E.g. 1000-sqft, 1250-sqft, or variant-<id>
              plan-2d.webp                # 2D Architectural CAD Blueprint
              plan-3d.webp                # 3D Isometric Visualization
```

---

## 2. Centralized Manifest Reference

Every project contains a `manifest.json` located at:
`public/projects/<projectId>/configurations/manifest.json`

This file details:
- Project ID, Project Name, and Canonical Slug
- Official source verification URL and timestamp
- Available plan categories (`unit`, `master`, `site`)
- Exact carpet area, built-up area, and pricing for each area variant
- Paths to 2D and 3D images (`plan-2d.webp`, `plan-3d.webp`)

---

## 3. How to Replace a Plan Image (Step-by-Step)

### Example: Replacing a 2D Plan for a 3 BHK (1,250 sq.ft.) in Project ID 20550

1. **Locate the Project Folder**:
   Navigate to `public/projects/20550/configurations/`.

2. **Navigate to the Variant Folder**:
   Open `unit-plans/3-bhk/1250-sqft/`.

3. **Replace the Image**:
   - Save your new authorized floor plan as `plan-2d.webp` (or `plan-2d.jpg`).
   - If using watermarking, apply the subtle AuraLiving emblem (`public/images/logo/logo-emblem.png`) at 35% opacity in the bottom-right corner.

4. **Update `manifest.json` (if changing filename or dimensions)**:
   Verify that `plan2D` in `manifest.json` points to:
   `"/projects/20550/configurations/unit-plans/3-bhk/1250-sqft/plan-2d.webp"`

5. **Verify in Browser**:
   Open `/projects/godrej-eternal-palms` (or `[slug]`).
   Select the **3 BHK** tab, click **1250 sq.ft.**, and confirm your updated 2D plan is rendered.

---

## 4. Replacing Master Plans or Site Plans

1. Navigate to:
   - `public/projects/<projectId>/configurations/master-plans/` (for Master Plans)
   - `public/projects/<projectId>/configurations/site-plans/` (for Site / Layout Plans)

2. Replace `master-plan-01.webp` or `site-plan-01.webp` with the updated drawing.

3. The UI automatically displays the updated plan on the **Master Plan** or **Site Plan** tab and enables the click-to-enlarge lightbox modal.

---

## 5. Adding a 3D Visualization to an Existing 2D Variant

If a genuine 3D interior visualization becomes available for an existing variant:
1. Place the image at:
   `public/projects/<projectId>/configurations/unit-plans/<bhk-slug>/<area>-sqft/plan-3d.webp`
2. In `manifest.json` (and `src/data/configurations/mumbaiConfigurations.js`), set:
   ```json
   "plan3D": "/projects/<projectId>/configurations/unit-plans/<bhk-slug>/<area>-sqft/plan-3d.webp",
   "has3D": true
   ```
3. The right-aligned 2D/3D selector on the frontend will immediately enable the **3D View** button for that configuration!

---

## 6. Zero Hardcoded Paths

No React component contains hardcoded image paths. All image paths are dynamically resolved via `@/data/configurations`:
- `getProjectConfigurations(projectId || slug)`
This ensures complete isolation, clean caching, and effortless maintenance.
