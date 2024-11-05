// Fields externalId, iconUrl, createdAt, updatedAt will be deprecated.
// Use unique_id, icon_url, created_at, updated_at instead.
export type IntegrationCategory = {
  id: number;
  title: string;
  externalId?: string;
  unique_id: string;
  iconUrl?: string;
  icon_url?: string;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
};
