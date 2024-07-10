# User Table Application

This is a simple user table application built with Vite and React TypeScript template. The application fetches a list of users from an API, displays them in a paginated table, and allows sorting by name.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Features](#features)
- [Components](#components)
- [API](#api)

## Installation

1. Clone the repository:
- **Repository URL:** [E-commerce Platform](https://github.com/abheyygupta396/vite-user-table-application.git)
- **Branch:** `main`

2. Navigate to the project directory:
   ```bash
   cd criteoCodeTemplate
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and go to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
src/
├── components/
│   ├── DownwardArrow.tsx
│   ├── UpwardArrow.tsx
│   └── UserTable.tsx
├── App.tsx
├── main.tsx
├── index.css
├── vite-env.d.ts
public/
├── index.html
├── favicon.ico
README.md
package.json
tsconfig.json
vite.config.ts
```

## Features

- Fetches user data from an API.
- Displays user data in a table.
- Pagination with 5 users per page.
- Sortable by name in ascending and descending order.
- Re-fetch latest data.

## Components

### `UserTable.tsx`

- Fetches and displays user data.
- Implements pagination and sorting.
- Contains the following sub-components:
  - `UpwardArrow.tsx`: SVG for an upward arrow.
  - `DownwardArrow.tsx`: SVG for a downward arrow.

## API

- Uses the [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) API to fetch user data.

### Explanation

- **Installation**: Instructions to clone the repository, navigate to the project directory, and install dependencies.
- **Usage**: Steps to start the development server and open the application in a browser.
- **Project Structure**: Overview of the project's folder and file structure.
- **Features**: Lists the main features of the application.
- **Components**: Describes the key components used in the project, including their purpose and functionality.
- **API**: Information about the API endpoint used to fetch user data.