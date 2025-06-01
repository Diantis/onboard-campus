// File: src/data/documents.ts
export interface Document {
  id: string;
  name: string;
  date: string; // ISO date YYYY-MM-DD
  url?: string; // optional link to download/view
}

export const documents: Record<'toSign' | 'general' | 'resources', Document[]> = {
  toSign: [
    { id: '1', name: "Contrat d'inscription", date: '2025-05-01', url: '/docs/contrat-inscription.pdf' },
    { id: '2', name: 'Charte informatique', date: '2025-04-28', url: '/docs/charte-informatique.pdf' }
  ],
  general: [
    { id: '3', name: "Guide de l'étudiant", date: '2025-03-15', url: '/docs/guide-etudiant.pdf' },
    { id: '4', name: 'Planning semestriel', date: '2025-02-10', url: '/docs/planning-semestriel.pdf' }
  ],
  resources: [
    { id: '5', name: 'Tutoriel bibliothèque', date: '2025-01-20', url: '/docs/tutoriel-bibliotheque.pdf' },
    { id: '6', name: 'FAQ campus', date: '2025-04-05', url: '/docs/faq-campus.pdf' }
  ]
};