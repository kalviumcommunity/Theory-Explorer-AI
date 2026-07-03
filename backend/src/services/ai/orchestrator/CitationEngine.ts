export interface Citation {
  id: string;
  title: string;
  slug: string;
  relevanceScore?: number;
}

export class CitationEngine {
  generateCitations(retrievedDocuments: any[]): Citation[] {
    return retrievedDocuments.map(doc => ({
      id: doc._id.toString(),
      title: doc.title,
      slug: doc.slug
    }));
  }
}
