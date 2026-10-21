export const formatNumber = (n: number | null | undefined): string =>
  n == null ? '—' : n.toLocaleString();

export const formatCompact = (n: number | null | undefined): string =>
  n == null ? '—' : Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(n);

export const formatArea = (n: number | null | undefined): string =>
  n == null ? '—' : `${n.toLocaleString()} km²`;

export const joinValues = (values: string[], fallback = '—'): string =>
  values.length > 0 ? values.join(', ') : fallback;

export const firstOrFallback = (values: string[], fallback = '—'): string =>
  values.length > 0 ? (values[0] ?? fallback) : fallback;
