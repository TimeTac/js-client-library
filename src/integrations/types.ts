// Fields shortDescription, websiteUrl, navigationUrl, imageUrl, accessCredentialsId, createdAt, updatedAt will be deprecated.
// Use short_description, website_url, navigation_url, image_url, access_credentials_id, created_at, updated_at instead.
export type Integration = {
  id: number;
  title: string;
  shortDescription?: string;
  short_description?: string;
  websiteUrl?: string;
  website_url?: string;
  navigationUrl?: string;
  navigation_url?: string;
  imageUrl?: string;
  image_url?: string;
  featured?: boolean;
  provider?: string;
  application?: string;
  accessCredentialsId?: number | null;
  access_credentials_id?: number | null;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
};
