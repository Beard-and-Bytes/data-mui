# Data MUI

A country explorer that fetches live data from open public APIs, displaying countries in a searchable MUI DataGrid with a detail view, population history chart, and bordering countries table.

**Live demo:** https://beardandbytes.dev/data-mui

## Stack

React 19, TypeScript, Vite, MUI v9 (Material UI + X DataGrid + X Charts), TanStack Query v5, Font Awesome, react-router-dom

## Run it locally

```bash
npm install
npm run dev
```

## Where to look

- `src/pages/data-mui/` holds the application code.
- `src/pages/data-mui/api/` — API clients for REST Countries and World Bank.
- `src/pages/data-mui/hooks/` — TanStack Query hooks (one per query).
- `src/pages/data-mui/components/` — shared and feature-specific MUI components.
- `src/pages/data-mui/pages/` — route-level page components.

## About this repository

This repository is an automatically generated, read-only mirror. The source of truth is a private repository, and changes are synced here on every update. Issues and pull requests against this mirror can't be merged, because the next sync overwrites it.
