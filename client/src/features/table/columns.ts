import type { Column } from "./types";

export const columns: readonly Column[] = [
  { id: 'title', label: 'Title', minWidth: 170 },
  {
    id: 'date',
    label: 'Date',
    minWidth: 150,
    format: (value: string) =>
      new Date(value).toLocaleDateString('uk-UA', { dateStyle: 'short' }),
  },
  { id: 'category', label: 'Category', minWidth: 120 },
  { id: 'city', label: 'City', minWidth: 120 },
  { id: 'venue', label: 'Venue', minWidth: 150 },
  { id: 'hostDisplayName', label: 'Host', minWidth: 150 },
  {
    id: 'isCancelled',
    label: 'Status',
    minWidth: 120,
    format: (value: boolean) => (value ? 'Cancelled' : 'Active'),
  },
];