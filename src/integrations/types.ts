export type Integration = {
  id: number;
  title: string;
  short_description?: string;
  website_url?: string;
  navigation_url?: string;
  image_url?: string;
  featured?: boolean;
  provider?: string;
  application?: string;
  access_credentials_id?: number | null;
  created_at?: string;
  updated_at?: string;
};
