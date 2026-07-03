import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getConcept } from "@/lib/concepts";
import { trackView } from "@/lib/progress";
import ReactMarkdown from "react-markdown";
import { useEffect } from "react";

export function KnowledgePage() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: concept, isLoading, error } = useQuery({
    queryKey: ["concept", slug],
    queryFn: () => getConcept(slug!),
    enabled: !!slug
  });

  useEffect(() => {
    if (concept) {
      trackView(concept._id).catch(console.error);
    }
  }, [concept]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary-600" />
          <p className="text-sm text-gray-500">Loading concept...</p>
        </div>
      </div>
    );
  }

  if (error || !concept) {
    return <div className="p-8 text-center text-red-500">Failed to load concept.</div>;
  }

  return (
    <div className="container-app py-8 max-w-4xl mx-auto">
      <div className="mb-8 border-b pb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{concept.title}</h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-6">{concept.summary}</p>
        
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Difficulty:</span>
            <span className="capitalize bg-gray-100 px-2 py-1 rounded text-gray-800">{concept.difficulty}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Time:</span>
            <span className="text-gray-600">{concept.estimatedReadingTime} min read</span>
          </div>
          {typeof concept.category === 'object' && (
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Category:</span>
              <span className="text-primary-600">{concept.category.name}</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex gap-2">
          {concept.tags.map(tag => (
            <span key={tag} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      
      <article className="prose prose-slate lg:prose-lg max-w-none prose-headings:font-semibold prose-a:text-primary-600 hover:prose-a:text-primary-500">
        <ReactMarkdown>{concept.content}</ReactMarkdown>
      </article>

      {concept.references && concept.references.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-lg font-semibold mb-4">References</h3>
          <ul className="list-disc pl-5 space-y-2">
            {concept.references.map((ref, i) => (
              <li key={i}>
                <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                  {ref.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
