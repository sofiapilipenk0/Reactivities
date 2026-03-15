import type { Column } from "./types";

export const columns: readonly Column[] = [
  { id: 'title', label: 'Title', minWidth: 200 },
  {
    id: 'date',
    label: 'Date',
    minWidth: 100,
    format: (value: string) =>
      new Date(value).toLocaleDateString('uk-UA', { dateStyle: 'short' }),
  },
  { id: 'category', label: 'Category', minWidth: 110},
  { id: 'city', label: 'City', minWidth: 150 },
  { id: 'venue', label: 'Venue', minWidth: 640 },
  { id: 'hostDisplayName', label: 'Host', minWidth: 180},
  {
    id: 'isCancelled',
    label: 'Status',
    minWidth: 120,
    format: (value: boolean) => (value ? 'Cancelled' : 'Active'),
  },
];