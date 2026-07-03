import { Concept } from "../../models/Concept.js";

export class KnowledgeGraphService {
  /**
   * Fetches all concepts and formats them for a frontend graph library like React Flow.
   */
  static async getGlobalGraph() {
    const concepts = await Concept.find()
      .select("title slug difficulty prerequisites relatedTopics")
      .populate("prerequisites", "slug title")
      .populate("relatedTopics", "slug title")
      .lean();

    const nodes: any[] = [];
    const edges: any[] = [];
    const edgeSet = new Set<string>();

    concepts.forEach((concept) => {
      // Create Node
      nodes.push({
        id: concept.slug,
        data: { label: concept.title, difficulty: concept.difficulty },
        // Position will be calculated by a layout engine (like dagre) on the frontend
        position: { x: 0, y: 0 } 
      });

      // Create Prerequisite Edges (Directed)
      if (concept.prerequisites && Array.isArray(concept.prerequisites)) {
        concept.prerequisites.forEach((prereq: any) => {
          const edgeId = `e-${prereq.slug}-${concept.slug}`;
          if (!edgeSet.has(edgeId)) {
            edges.push({
              id: edgeId,
              source: prereq.slug,
              target: concept.slug,
              type: "smoothstep",
              animated: true,
              label: "requires",
            });
            edgeSet.add(edgeId);
          }
        });
      }

      // Create Related Edges
      if (concept.relatedTopics && Array.isArray(concept.relatedTopics)) {
        concept.relatedTopics.forEach((related: any) => {
          const sorted = [concept.slug, related.slug].sort();
          const edgeId = `e-rel-${sorted[0]}-${sorted[1]}`;
          if (!edgeSet.has(edgeId)) {
            edges.push({
              id: edgeId,
              source: concept.slug,
              target: related.slug,
              type: "straight",
              animated: false,
              style: { strokeDasharray: "5, 5" },
            });
            edgeSet.add(edgeId);
          }
        });
      }
    });

    return { nodes, edges };
  }
}
