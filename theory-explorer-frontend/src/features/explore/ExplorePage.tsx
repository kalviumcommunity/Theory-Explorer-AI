import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getConcepts, getCategories } from "@/lib/concepts";
import { searchConcepts } from "@/lib/search";
import { Link } from "react-router-dom";
import { Search, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories
  });

  const { data: conceptsData, isLoading } = useQuery({
    queryKey: ["concepts", activeCategory],
    queryFn: () => getConcepts(activeCategory ? { category: activeCategory } : {}),
    enabled: searchTerm === ""
  });

  const { data: searchResults, isLoading: isSearchLoading } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => searchConcepts(searchTerm),
    enabled: searchTerm.length > 2
  });

  const displayConcepts = searchTerm.length > 2 ? searchResults : conceptsData?.concepts;
  const loading = isLoading || isSearchLoading;

  return (
    <div className="container-app py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Knowledge</h1>
        <p className="text-gray-600">Discover new concepts, theories, and ideas.</p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search concepts, tags, or summaries..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {!searchTerm && (
          <select
            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 outline-none bg-white"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories?.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        )}
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="h-48 rounded-xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : displayConcepts?.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayConcepts.map((concept: any) => (
            <Link key={concept._id} to={`/knowledge/${concept.slug}`}>
              <Card className="h-full hover:border-primary-300 transition-colors cursor-pointer group shadow-sm">
                <Card.Content className="p-5 flex flex-col h-full">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                      {concept.category?.name || "Topic"}
                    </span>
                    <span className="text-xs text-gray-500">{concept.estimatedReadingTime} min</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-700 mb-2">
                    {concept.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                    {concept.summary}
                  </p>
                  <div className="flex gap-2 flex-wrap mt-auto">
                    {concept.tags?.slice(0,3).map((tag: string) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Card.Content>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<BookOpen className="h-8 w-8 text-gray-400" />}
          title="No concepts found"
          description={searchTerm ? "Try adjusting your search terms." : "There are no concepts in this category yet."}
          action={searchTerm ? <Button onClick={() => setSearchTerm("")}>Clear Search</Button> : undefined}
        />
      )}
    </div>
  );
}
