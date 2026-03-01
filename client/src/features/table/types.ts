export interface ActivityDto {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  isCancelled: boolean;
  hostDisplayName: string;
  hostId: string;
  city: string;
  venue: string;
  latitude: number;
  longitude: number;
  attendees: any[];
}

export interface Column {
  id:
    | 'title'
    | 'date'
    | 'category'
    | 'city'
    | 'venue'
    | 'hostDisplayName'
    | 'isCancelled';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: any) => string;
}