export const EXPORT_DOCUMENT_MODEL_VERSION = 1 as const;

export type ExportProfile =
  | "SCENARIO_ARCHITECT_REVIEW"
  | "FULL_DOCUMENTATION"
  | "HUMAN_REVIEW"
  | "SINGLE_CARD";

export type ExportFormat = "MARKDOWN" | "PDF";

export interface ExportOptions {
  includeMainDetails: boolean;
  includeStory: boolean;
  includeLoreCards: boolean;
  includeConnections: boolean;
  includeVisualCanonImages: boolean;
  includeVisualPrompts: boolean;
  includeCanonStatus: boolean;
  includeValidationDetails: boolean;
  includeInternalTimestamps: boolean;
}

export interface ExportScenario {
  id: string;
  name: string;
  description: string;
  coverImagePath: string | null;
  status: string;
  tags: string[];
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface ExportStateSummary {
  loreTotal: number;
  text: {
    open: number;
    draft: number;
    readyForPlatformCheck: number;
    canonClosed: number;
  };
  visual: {
    notStarted: number;
    inProgress: number;
    visualCanon: number;
  };
}

export interface ExportStory {
  backstory: string;
  greeting: string;
  customInstructions: string;
}

export interface ExportVisualPrompt {
  type: "CREATION" | "REFINEMENT";
  sequence: number;
  title: string;
  prompt: string;
  notes: string;
}

export interface ExportLoreCard {
  id: string;
  displayOrder: number;
  title: string;
  type: string;
  internalCategory: string;
  description: string;
  content: string;
  weight: string;
  pinned: boolean;
  textCanonStatus: string;
  visualCanonStatus: string;
  verifiedFictionLabCount?: number | null;
  triggers: string[];
  traits: string[];
  visualPrompts: ExportVisualPrompt[];
  visualCanonImagePath?: string | null;
  notes?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  outgoingConnectionIds: string[];
  incomingConnectionIds: string[];
}

export interface ExportConnection {
  id: string;
  originCardId: string;
  originTitle: string;
  destinationCardId: string;
  destinationTitle: string;
  status: string;
  reason: string;
}

export interface ExportValidationItem {
  severity: "ERROR" | "WARNING" | "INFO";
  code: string;
  message: string;
  entityType?: string | null;
  entityId?: string | null;
}

/**
 * Renderer-neutral, serializable document contract.
 * Markdown/PDF renderers consume this model; neither renderer queries SQLite.
 */
export interface ExportDocumentModel {
  modelVersion: typeof EXPORT_DOCUMENT_MODEL_VERSION;
  generatedAt: string;
  profile: ExportProfile;
  format: ExportFormat;
  options?: ExportOptions;
  scenario: ExportScenario;
  stateSummary: ExportStateSummary;
  story: ExportStory;
  loreCards: ExportLoreCard[];
  connections: ExportConnection[];
  validation: ExportValidationItem[];
}

export const DEFAULT_EXPORT_OPTIONS: Record<Exclude<ExportProfile, "SINGLE_CARD">, ExportOptions> = {
  SCENARIO_ARCHITECT_REVIEW: {
    includeMainDetails: true,
    includeStory: true,
    includeLoreCards: true,
    includeConnections: true,
    includeVisualCanonImages: true,
    includeVisualPrompts: true,
    includeCanonStatus: true,
    includeValidationDetails: true,
    includeInternalTimestamps: false,
  },
  FULL_DOCUMENTATION: {
    includeMainDetails: true,
    includeStory: true,
    includeLoreCards: true,
    includeConnections: true,
    includeVisualCanonImages: true,
    includeVisualPrompts: true,
    includeCanonStatus: true,
    includeValidationDetails: true,
    includeInternalTimestamps: true,
  },
  HUMAN_REVIEW: {
    includeMainDetails: true,
    includeStory: true,
    includeLoreCards: true,
    includeConnections: true,
    includeVisualCanonImages: true,
    includeVisualPrompts: false,
    includeCanonStatus: false,
    includeValidationDetails: false,
    includeInternalTimestamps: false,
  },
};
