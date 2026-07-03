import { KnowledgeGraph } from "@/features/knowledge/KnowledgeGraph";

export function KnowledgeGraphPage() {
  return (
    <div className="container-app py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Knowledge Graph</h1>
      <KnowledgeGraph />
    </div>
  )
}
