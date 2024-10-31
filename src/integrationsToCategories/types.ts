// Fields integrationId, categoryId, createdAt, updatedAt will be deprecated.
// Use integration_id, category_id, created_at, updated_at instead.
export type IntegrationToCategory = {
  id: number;
  integrationId?: number;
  integration_id?: number;
  categoryId?: number;
  category_id?: number;
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
};
