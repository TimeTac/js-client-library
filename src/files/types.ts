export type File = {
  id: number;
  title?: string;
  filename: string;
  extension: string;
  content_type: string;
  mirror_file_to_filesystem?: boolean;
  relative_url?: string;
  absolute_url?: string;
  path?: string;
  size: number;
  owner: number;
  permissions: number;
  description?: string;
  expires?: string;
  updated: string;
  created: string;
};
