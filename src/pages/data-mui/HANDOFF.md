# Handoff: Countries Explorer (React + MUI)

## Goal

Build a small React app with two screens:

1. **Countries table** - sortable/filterable/paginated list of countries. Each row has a "View" action button.
2. **Country detail page** - opened from the row button. Shows more than the row's columns: a header with extra facts, a **population-over-time line chart**, and a **bordering countries table**.

All data comes from real, free, keyless public APIs. No mock data.

## Non-negotiable conventions

- **Arrow functions only.** Components, hooks, helpers, API functions. No `function` declarations.
- **TanStack React Query (v5)** for ALL server data. No `useEffect` + `fetch`, no raw fetch in components.
- **MUI** (`@mui/material`, `@mui/x-data-grid`, `@mui/x-charts`) for all UI. No other component libraries.
- **Font Awesome** for ALL icons (`@fortawesome/react-fontawesome` + `@fortawesome/free-solid-svg-icons`). No MUI icons.
- **SRP:** every file/function does one thing. Components render, hooks fetch, api files call APIs, utils format. Do not mix.
- **DRY:** no duplicated fetch logic, formatters, loading/error UI, or query keys. Extract shared pieces (see below).
- TypeScript, strict mode. Named exports (default export only for page components if needed by the router).

## Stack

- Vite + React + TypeScript
- `react-router-dom` (v6+)
- `@tanstack/react-query` (+ devtools in dev only)
- `@mui/material`, `@emotion/react`, `@emotion/styled`, `@mui/x-data-grid`, `@mui/x-charts`
- `@fortawesome/fontawesome-svg-core`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/react-fontawesome`

## APIs

### REST Countries v3.1 (`https://restcountries.com/v3.1`)

Note: `/all` REQUIRES a `fields` param and allows max 10 fields.

- **List:** `GET /all?fields=name,cca3,flags,region,capital,population,area`
- **Detail:** `GET /alpha/{cca3}?fields=name,cca3,flags,region,subregion,capital,population,area,languages,currencies,timezones,borders`
  - Returns a single object (or array depending on version - normalize in the api layer and handle both).
- **Neighbors:** `GET /alpha?codes={cca3,cca3,...}&fields=name,cca3,flags,population,area`
  - Only call when `borders` is non-empty. Islands have none.

### World Bank (`https://api.worldbank.org/v2`)

- **Population history:** `GET /country/{cca3}/indicator/SP.POP.TOTL?format=json&per_page=100`
  - Response is `[meta, rows]`. `rows` can be `null` (no data). Each row has `date` (string year) and `value` (number or `null`).
  - Rows come newest-first. Filter out null values, convert `date` to number, sort ascending.
  - cca3 (ISO alpha-3) works as the country code.

## Project structure

```
src/
  api/
    httpClient.ts            # generic getJson<T>(url) w/ error handling (shared by all api files)
    countriesApi.ts          # fetchCountries, fetchCountry, fetchCountriesByCodes
    worldBankApi.ts          # fetchPopulationHistory
  hooks/
    useCountries.ts          # list query
    useCountry.ts            # detail query by code
    useBorderCountries.ts    # neighbors query (enabled only if codes.length > 0)
    usePopulationHistory.ts  # world bank query
  queryKeys.ts               # single source of truth for all query keys
  types/
    country.ts               # Country, CountrySummary, PopulationPoint
  utils/
    formatters.ts            # formatNumber, formatArea, joinValues, etc.
    countryMappers.ts        # map raw API shapes -> app types (languages/currencies objects -> arrays)
  components/
    common/
      QueryBoundary.tsx      # renders loading / error / empty / children for any query result
      FaIcon.tsx             # thin wrapper over FontAwesomeIcon for consistent sizing/props
      PageContainer.tsx      # consistent page layout/padding/title
      FlagAvatar.tsx         # flag image (reused in table, detail header, neighbors table)
      StatItem.tsx           # label + value pair (reused in detail header)
    countries/
      CountriesTable.tsx     # DataGrid only; receives rows + onView
      countryColumns.tsx     # column definitions (incl. flag + action column)
      ViewCountryButton.tsx  # the row action button (FA icon + navigate)
    country-detail/
      CountryHeader.tsx      # flag, names, key facts
      PopulationChart.tsx    # MUI X LineChart; receives PopulationPoint[]
      BorderCountriesTable.tsx # small table of neighbors; each links to its own detail page
  pages/
    CountriesPage.tsx        # composes hook + QueryBoundary + CountriesTable
    CountryDetailPage.tsx    # composes hooks + QueryBoundary + header/chart/table
    NotFoundPage.tsx
  theme.ts                   # MUI theme
  queryClient.ts             # QueryClient w/ defaults
  routes.tsx                 # route config + path helpers (e.g. countryPath(code))
  App.tsx                    # providers (QueryClientProvider, ThemeProvider, CssBaseline, Router)
  main.tsx
```

## Responsibility rules (SRP)

- **api/** only talks to the network and returns typed data. No React.
- **hooks/** only wrap `useQuery` with the right key + fn. No JSX.
- **components/** are presentational: props in, JSX out. They do not fetch.
- **pages/** are the only place that call hooks and compose components.
- **utils/** are pure functions.

## Shared pieces to avoid duplication (DRY)

- `getJson<T>` in `httpClient.ts` handles base fetch, non-OK responses (throw an `Error` with status), and JSON parsing. Every api function uses it.
- `queryKeys.ts` exports key factories, e.g. `countryKeys.list()`, `countryKeys.detail(code)`, `countryKeys.borders(codes)`, `populationKeys.byCountry(code)`.
- `QueryBoundary` is used by BOTH pages and by the chart/neighbors sections for loading, error (with retry button), and empty states. Do not hand-roll spinners elsewhere.
- `FlagAvatar` and `StatItem` are reused anywhere a flag or label/value appears.
- `FaIcon` wraps Font Awesome so icon sizing/color is consistent.
- Formatters live in one file; no inline `toLocaleString` scattered around.

## Routes

- `/` - CountriesPage
- `/country/:code` - CountryDetailPage (code = cca3, uppercase it before querying)
- `*` - NotFoundPage

Use a `countryPath(code)` helper from `routes.tsx` everywhere a link/navigate to a country happens.

## Screen details

### Countries table (`CountriesPage`)

- MUI X `DataGrid`, client-side sorting/filtering, pagination (page size 10/25/50), default sort by name.
- Columns: Flag, Name, Region, Capital (first capital or "-"), Population (formatted, numeric sort), Area (formatted, numeric sort), Actions.
- Actions column: `ViewCountryButton` with a Font Awesome icon (e.g. `faArrowRight` or `faCircleInfo`) navigating to `countryPath(cca3)`. Include an `aria-label`.
- Use `getRowId={(row) => row.cca3}`.
- Quick filter / search toolbar enabled.
- Query `staleTime` generous (e.g. 1 hour) since this data barely changes.

### Country detail (`CountryDetailPage`)

- Back button to the table (FA `faArrowLeft`).
- **Header:** flag, common + official name, region/subregion, capital(s), population, area, languages, currencies (name + symbol), timezones.
- **Population chart:** MUI X `LineChart`, years on x, population on y (compact number format on axis, e.g. 1.4B). Wrapped in `QueryBoundary`. If World Bank returns no data, show a friendly empty state ("No population history available for this country").
- **Bordering countries table:** small MUI `Table` (flag, name, population, area, View button). If no borders, show an empty state ("No land borders"). Clicking View navigates to that country's detail page.
- Each section loads independently (header does not wait for the chart).
- Deep links must work: refreshing `/country/CAN` fetches by code, not from table state.

## Edge cases

- Country with no World Bank data (`rows === null` or all values null).
- Country with no borders / no capital / no currencies.
- Invalid code in URL -> NotFound state (REST Countries returns 404).
- Network failure -> error state with retry.
- Rapid navigation between countries (React Query handles it; just make sure keys include the code).

## Build order

1. Scaffold Vite React TS app, install deps.
2. `queryClient`, `theme`, `App` providers, router, `routes.tsx`.
3. `types`, `httpClient`, api files, `queryKeys`, mappers/formatters.
4. Hooks.
5. Common components (`QueryBoundary`, `FaIcon`, `FlagAvatar`, `StatItem`, `PageContainer`).
6. Countries table + page.
7. Detail page: header, chart, borders table.
8. Edge cases + polish (responsive layout, dark mode optional).
9. Run `tsc --noEmit` and the dev server; click through list -> detail -> neighbor -> back.

## Acceptance criteria

- Table loads real data from REST Countries and supports sort/filter/paginate.
- Every row's View button opens its detail page.
- Detail page shows extra info, a working population line chart, and a neighbors table, all from real API calls.
- No `function` keyword declarations, no `useEffect` fetching, no non-FA icons.
- No duplicated fetch logic, formatters, or loading/error UI.
- Refreshing a detail URL works.
- Type-check passes with no `any`.

## Stretch (only if time)

- GDP per capita chart toggle (`NY.GDP.PCAP.CD`) using the same `worldBankApi` function parameterized by indicator code (do NOT copy-paste the population fetcher).
- URL-persisted table filters/sort.
- Dark mode toggle.
