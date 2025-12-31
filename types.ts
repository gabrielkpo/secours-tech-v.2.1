export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: Date;
  sources?: string[]; // List of documents used for this answer
  isThinking?: boolean;
}

export interface TechDocument {
  id: string;
  name: string;      // Display name (e.g. "GDO Incendie")
  filename: string;  // Actual file name (e.g. "gdo_incendie_v2.pdf")
  category: 'INCENDIE' | 'SAP' | 'NRBC' | 'OPÉRATIONNEL' | 'DIVERS';
  path: string;      // Path relative to public folder (e.g. "/documents/file.pdf")
}

export interface ProcessingState {
  step: 'idle' | 'routing' | 'reading' | 'reasoning';
  currentDoc?: string;
}