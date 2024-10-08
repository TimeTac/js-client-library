export type Integration = {
  id: number;
  title: string;
  shortDescription?: string;
  websiteUrl?: string;
  navigationUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  provider?: string;
  application?: string;
  accessCredentialsId?: number | null;
  createdAt: string;
  updatedAt: string;
};
