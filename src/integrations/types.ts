export type Integration = {
  id: number;
  title: string;
  shortDescription?: string;
  websiteUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  externalId?: string;
  provider?: string;
  application?: string;
  accessCredentialsId?: number;
  created_at: string;
  updated_at: string;
};
