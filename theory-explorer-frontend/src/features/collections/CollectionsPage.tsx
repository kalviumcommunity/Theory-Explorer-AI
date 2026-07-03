import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCollections } from "@/lib/collections";
import { getBookmarks } from "@/lib/bookmarks";
import { Link } from "react-router-dom";
import { Bookmark, FolderOpen } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export function CollectionsPage() {
  const [activeTab, setActiveTab] = useState<"collections" | "bookmarks">("collections");

  const { data: collections, isLoading: loadingCollections } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections
  });

  const { data: bookmarks, isLoading: loadingBookmarks } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks
  });

  const isLoading = activeTab === "collections" ? loadingCollections : loadingBookmarks;

  return (
    <div className="container-app py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Library</h1>
        <p className="text-gray-600">Manage your saved concepts and custom collections.</p>
      </div>

      <div className="flex border-b mb-8">
        <button
          className={`px-6 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === "collections" ? "border-primary-600 text-primary-700" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("collections")}
        >
          <FolderOpen className="h-4 w-4" /> Collections
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === "bookmarks" ? "border-primary-600 text-primary-700" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("bookmarks")}
        >
          <Bookmark className="h-4 w-4" /> Bookmarks
        </button>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1,2,3].map(i => <div key={i} className="h-40 rounded-xl bg-gray-100 animate-pulse" />)}
        </div>
      ) : activeTab === "collections" ? (
        collections?.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {collections.map(collection => (
              <Card key={collection._id} className="hover:border-primary-300 transition-colors cursor-pointer shadow-sm">
                <Card.Content className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary-100 text-primary-600 p-2 rounded-lg">
                      <FolderOpen className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900">{collection.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{collection.description || "No description provided."}</p>
                  <p className="text-xs text-gray-500 font-medium">{collection.concepts.length} concepts saved</p>
                </Card.Content>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<FolderOpen className="h-8 w-8 text-gray-400" />}
            title="No collections yet"
            description="Create collections to organize concepts into learning paths."
          />
        )
      ) : (
        bookmarks?.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map(bookmark => (
              <Link key={bookmark._id} to={`/knowledge/${bookmark.concept.slug}`}>
                <Card className="h-full hover:border-primary-300 transition-colors shadow-sm">
                  <Card.Content className="p-5 flex flex-col h-full">
                    <div className="mb-2">
                      <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                        {/* @ts-expect-error Types correctly expanded locally */}
                        {bookmark.concept.category?.name || "Topic"}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{bookmark.concept.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{bookmark.concept.summary}</p>
                    <div className="mt-auto text-xs text-gray-500 flex items-center gap-1">
                      <Bookmark className="h-3 w-3 fill-current text-primary-500" /> Saved
                    </div>
                  </Card.Content>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Bookmark className="h-8 w-8 text-gray-400" />}
            title="No bookmarks yet"
            description="Save concepts you want to revisit quickly."
          />
        )
      )}
    </div>
  );
}
