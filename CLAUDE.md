# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**CO2eq Calculator** - A web-based carbon footprint calculator for waste materials that converts different types of waste into CO2 equivalent emissions. Built with vanilla HTML, CSS, and JavaScript with LinkedIn authentication integration.

## Development Commands

This is a static web application with LinkedIn authentication - no build process required:

- **Run locally**: Open `login_html.html` in any modern web browser to start with authentication
- **Direct access**: Open `index_html.html` (will redirect to login if not authenticated)
- **Test example**: Open `exemplo_html.html` to see a pre-filled report
- **Development**: Use live server extension or local HTTP server for best experience
- **Configuration**: See `CONFIGURACAO_LINKEDIN.md` for LinkedIn Developer setup

## Architecture & Structure

### Core Files
- `login_html.html` - LinkedIn authentication login page (entry point)
- `callback_html.html` - OAuth callback handler for LinkedIn authentication
- `index_html.html` - Main calculator interface with company info form and waste input (protected)
- `script_js.js` - Core calculation logic, waste data management, emission factors, and authentication
- `styles_css.css` - Complete CSS styling with responsive design and print styles
- `chart_js.js` - Canvas-based pie chart rendering with legends
- `report_js.js` - Report generation system that opens new window with formatted PDF-ready output
- `exemplo_html.html` - Example report page for demonstration
- `readme_md.txt` - Complete project documentation
- `CONFIGURACAO_LINKEDIN.md` - LinkedIn Developer setup instructions

### Key Components

**LinkedIn Authentication System** (`script_js.js:31-64`):
- OAuth 2.0 flow with LinkedIn API
- Token storage in localStorage
- Automatic user profile loading and form pre-filling
- Authentication check on app startup (`checkAuthentication()`)
- Logout functionality with cleanup

**Emission Factors System** (`script_js.js:2-13`):
- Hardcoded emission factors for 10 waste types (paper, plastic, glass, metal, organic, electronic, textile, wood, cooking oil, batteries)
- Different units handled: kg, tons, liters, units
- Scientific basis referenced in bibliography section

**Waste Data Management** (`script_js.js:95`):
- Array-based storage in `wasteData` global variable
- Each item has: id, type, name, quantity, unit, quantityInKg, emission, factor
- Real-time calculations and UI updates

**Chart System** (`chart_js.js`):
- Pure Canvas API implementation (no external libraries)
- Pie chart with percentage labels and color-coded legend
- Responsive sizing and color palette

**Report Generation** (`report_js.js`):
- Opens new window with complete HTML report
- Includes company info, detailed table, analysis, and recommendations
- Embedded JavaScript recreates chart in report
- Print-optimized CSS for PDF export

### UI Patterns

**Authentication Flow**:
- Login page with LinkedIn branding and feature overview
- OAuth callback processing with loading states
- Auto-redirect to calculator after successful login
- Logout button in calculator header

**Form Handling**:
- Company info section with logo upload (FileReader API)
- Auto-filled responsible person from LinkedIn profile
- Waste input with validation and unit conversion
- Real-time form clearing after additions

**Results Display**:
- Dynamic table generation with remove functionality
- Live total calculations
- Integrated chart updates

**Responsive Design**:
- Grid layouts that collapse on mobile
- Print styles for report generation
- Gradient backgrounds and modern CSS

## Key Features

1. **LinkedIn Authentication**: Secure OAuth 2.0 login with automatic profile data integration
2. **10 Waste Types**: Paper, plastic, glass, metal, organic, electronic, textile, wood, cooking oil, batteries
3. **Unit Conversion**: Automatic conversion between kg, tons, liters, and units
4. **Company Branding**: Logo upload with 2MB limit and image preview
5. **Interactive Charts**: Canvas-based pie charts with legends and percentages
6. **Professional Reports**: Complete reports with analysis and recommendations
7. **PDF Export**: Browser-native print-to-PDF functionality
8. **Scientific Accuracy**: IPCC, EPA, EEA-based emission factors with full bibliography
9. **User Session Management**: Persistent login state and profile data storage

## Important Implementation Details

**Authentication**:
- LinkedIn OAuth 2.0 implementation requires Client ID and Secret configuration
- Tokens stored in localStorage (consider httpOnly cookies for production)
- Authentication check runs on every page load
- User profile data auto-fills form fields

**Core Logic**:
- All emission factors are in `emissionFactors` object in `script_js.js`
- Chart colors defined in `colors` array in both chart and report files
- Report generation uses template literals with embedded data
- Logo handling uses FileReader API with size validation
- Date inputs auto-populate with current date
- All text and variables are in Portuguese (Brazilian)
- No external dependencies - pure vanilla JavaScript

**Security Considerations**:
- Client secret exposed in frontend (move to backend for production)
- CSRF protection with state parameter validation
- Token validation before allowing calculator access

## File Naming Convention

Note: All files use underscore naming instead of dots:
- `index_html.html` instead of `index.html`
- `script_js.js` instead of `script.js`
- `styles_css.css` instead of `styles.css`
- etc.

## Styling Approach

- CSS Grid and Flexbox for layouts
- CSS custom properties for consistent theming
- Gradient backgrounds and modern shadows
- Print media queries for report formatting
- Mobile-first responsive design patterns