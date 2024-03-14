export type LegalDocumentAcceptanceLog = {
  id: number;
  legal_document_type_id: number; // it should be legal_document_id. BE ticket has been created
  accepted: boolean;
  accepted_at: string;
  accepted_oauth_client_id: string;
  accepted_by_user_id?: number;
  created_at: string;
  updated_at: string;
};
