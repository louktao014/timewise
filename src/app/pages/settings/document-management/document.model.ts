export interface Document {
  id: number;
  title: string;
  type?: DocumentType;
  lastUpdate?: string; // ISO date string (YYYY-MM-DD)
  updatedBy?: string;
}

export enum DocumentType {
  REQUEST = 'REQUEST',
  WARNING = 'WARNING',
  CERTIFICATE = 'CERTIFICATE',
  OTHER = 'OTHER',
  ALL = 'ALL',
}
