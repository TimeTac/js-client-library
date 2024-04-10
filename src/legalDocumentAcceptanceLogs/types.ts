export type LegalDocumentAcceptanceLog = {
  id: number;
  legal_document_id: number;
  accepted: boolean;
  accepted_at: string;
  accepted_oauth_client_id: string;
  accepted_by_user_id?: number;
  created_at: string;
  updated_at: string;
};

export type LegalDocumentAcceptanceLogCreate = Pick<LegalDocumentAcceptanceLog, 'legal_document_id' & 'accepted'>;
