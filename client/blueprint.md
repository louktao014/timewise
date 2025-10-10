# Timewise

## Overview

Timewise is a modern, intuitive, and visually appealing employee management application built with the latest features of Angular. It provides a seamless experience for managing employee information, schedules, and payroll.

## Project Structure

### Core

*   **`app.config.ts`**: Configures the application, including routing and other providers.
*   **`app.component.ts`**: The root component of the application.
*   **`app.routes.ts`**: Defines the main routing structure of the application.
*   **`layout/layout.ts`**: The main layout component, containing the header, sidebar, and router outlet.

### Pages

*   **`dashboard`**: The main dashboard, providing an overview of key information.
*   **`employees`**: Manages the list of employees, including their details.
*   **`schedule`**: Displays and manages the employee schedule.
*   **`payroll`**: Handles payroll processing and history.
*   **`settings`**: Manages application settings, including user permissions.

### Styles

*   **`styles.css`**: Global styles for the application.

## Layout

The application features a responsive sidebar navigation and a main content area. All pages, including the complex tables in the settings area, are designed to be responsive and adapt to different screen sizes. The sidebar provides links to the main pages of the application, and the main content area displays the content of the currently active page.

### Header

The header displays the title of the current page.

### Sidebar

The sidebar contains the application title and navigation links to the following pages:

*   Dashboard
*   Employees
*   Schedule
*   Payroll
*   Settings

The sidebar is designed to be responsive, collapsing to a smaller width on smaller screens.

## Dashboard

The dashboard provides a high-level overview of key metrics, including:

*   Total number of employees
*   Number of employees on schedule for the current day
*   Number of pending payrolls
*   Number of open issues and alerts

## Employees

The employees page displays a list of all employees in a table. The table includes the following information for each employee:

*   Name
*   Email
*   Phone
*   Job Title

The page also includes a button to add a new employee, as well as actions to edit or delete existing employees.

## Schedule

The schedule page displays a weekly calendar view of employee schedules. The calendar shows the schedule for each employee for the current week. The page includes navigation buttons to move to the previous or next week.

## Payroll

The payroll page displays a list of payrolls and allows the user to view the details of each payroll. The page includes a button to run a new payroll and a list of past payrolls with their status and pay period.

## Settings

The settings page provides a tabbed interface for managing application settings. It is designed to be fully responsive. On smaller screens, the tabbed navigation stacks vertically for improved usability. The content within each tab, such as the permissions table, is also optimized for smaller viewports with horizontal scrolling for wider tables. The following tabs are available:

*   **Permission**: Manages user roles and their permissions.

### Permission

The permission tab displays a table of user roles and their permissions. The table allows the user to toggle permissions for each role. The following roles are available:

*   Admin
*   Manager
*   Employee

The following permissions can be managed for each role:

*   Dashboard
*   Employees
*   Schedule
*   Payroll
*   Time Off
*   Settings
