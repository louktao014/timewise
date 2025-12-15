# Project Blueprint

## Overview

This project is a comprehensive employee management application built with Angular. It provides a modern and intuitive interface for managing employee data, schedules, payroll, and other HR-related tasks.

## Style and Design

*   **Layout:** The application features a clean and responsive layout with a sidebar for navigation and a main content area for displaying information.
*   **Color Palette:** The color scheme is based on a modern and professional palette, with a primary color of #36A2EB (blue) used for accents and highlights.
*   **Typography:** The application uses a clear and legible font for optimal readability.
*   **Iconography:** The application will use icons to enhance usability and provide visual cues for actions.

## Features

*   **Dashboard:** A central hub for viewing key metrics and alerts, including total employees, on-schedule status, pending payrolls, and issues.
*   **Employee Management:** A dedicated section for managing employee information, including personal details, contact information, and job-related data.
*   **Scheduling:** A tool for creating and managing employee schedules, with support for different shifts and rotations.
*   **Payroll:** A module for processing payroll, including calculating wages, deductions, and taxes.
*   **Time Off:** A system for managing employee time off requests and approvals.
*   **Settings:** A section for configuring application settings, including user permissions and notification preferences.

## Current Task: Add Charts to Dashboard

### Plan

1.  **Install Chart.js:** Add the Chart.js library to the project to enable chart creation.
2.  **Update Dashboard HTML:** Add two new cards to the dashboard layout to house the doughnut and bar charts.
3.  **Update Dashboard Component:**
    *   Implement the `AfterViewInit` lifecycle hook to ensure the charts are created after the view is initialized.
    *   Use `@ViewChild` to get references to the canvas elements in the template.
    *   Create two new methods, `createDoughnutChart()` and `createBarChart()`, to encapsulate the chart creation logic.
    *   Initialize the doughnut and bar charts with sample data and configuration options.
4.  **Verify Changes:** Run `ng build` to ensure the application compiles without errors and the new charts are displayed correctly.
