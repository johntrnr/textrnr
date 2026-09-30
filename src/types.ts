export interface MatrixCell {
  id: number;
  x: number;
  y: number;
  huePrimary: string;
  hueSecondary: string;
  accentColor: string;
  density: number;
  glyphType: 'check' | 'pixel' | 'cross' | 'cluster' | 'halftone';
  opacity: number;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  year: string;
  medium: string;
  editions: string;
  dimensions: string;
  status: 'Minted' | 'Archived' | 'Active' | 'Private Collection';
  contractAddress?: string;
  description: string;
  curatorialNote: string;
  tags: string[];
  specs: {
    label: string;
    value: string;
  }[];
  palette: string[];
}

export type ViewTab = 'home' | 'exhibition' | 'works' | 'tools' | 'about' | 'inquiry';
export type LayoutMode = 'grid' | 'index';
