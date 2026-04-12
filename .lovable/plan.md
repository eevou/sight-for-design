

## PND System - Chest X-Ray Analysis Frontend

### Overview
A medical X-ray analysis application with 3 main screens, replicating the provided designs exactly.

### Pages

**1. Upload Page (Home - `/`)**
- Top navbar: "PND AI Hub" logo, nav links (Dashboard, Records, New Scan, Settings), notification bell, "+ New Scan" button, avatar
- "AI Diagnostic Suite" label, "X-Ray Analysis Upload" heading, system status badge
- Large drag & drop zone with upload icon, file format info (DICOM, JPEG, PNG up to 50MB), "Browse Files" button
- Right sidebar: Queue Status card (Idle, Processing Capacity 100%), Requirements card (Min Res, DICOM Preferred, PII Removed)
- Bottom: Analysis Guidelines section with 3 cards (High Resolution, Standard Formats, Data Privacy)

**2. Results Page (`/results/:id`)**
- Navbar: "PND System" logo, nav links (Dashboard, Patients, Analysis, Settings), "+ New Scan" button, avatar
- Breadcrumb navigation
- Left: X-ray image viewer with LIVE VIEW badge, zoom controls, view mode tabs (Original, Heatmap, High Contrast, Grid)
- Right: AI Diagnosis card with Normal/Abnormal badge, confidence percentage (circular indicator), detected condition, description
- Secondary Indicators with progress bars (Infiltration, Atelectasis, Effusion)
- Physician Notes section with edit capability
- "Confirm Diagnosis" and "Request Follow-up" buttons
- Footer with version info and links

**3. History Page (`/history`)**
- Navbar: "PND System" logo with "Chest X-Ray Analysis" subtitle, "+ New Scan" button, "History" button, avatar
- "Analysis History" heading
- Table with columns: Patient, X-ray (thumbnail), Result (color-coded), Date
- Clicking a row navigates to Results page

### Technical Details
- React Router for navigation between pages
- Drag & drop file upload with preview
- Axios service file with placeholder API endpoints for .NET Web API
- Reusable components: Navbar, StatusBadge, FileUploader, DiagnosisCard
- Mock data for demo functionality
- Exact color matching: teal/dark cyan for primary actions, green for "Normal", red for "Abnormal"

