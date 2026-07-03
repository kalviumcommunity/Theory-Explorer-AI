import { useQuery } from "@tanstack/react-query";
import { getHistory } from "@/lib/progress";
import { Link } from "react-router-dom";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export function HistoryPage() {
  const { data: history, isLoading } = useQuery({
    queryKey: ["history"],
    queryFn: getHistory
  });

  return (
    <div className="container-app py-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reading History</h1>
        <p className="text-gray-600">Review the concepts you've explored.</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1,2,3,4].map(i => <div key={i} className="h-24 rounded-xl bg-gray-100 animate-pulse" />)}
        </div>
      ) : history?.length ? (
        <div className="space-y-4">
          {history.map((item: any) => (
            <Link key={item._id} to={`/knowledge/${item.concept.slug}`}>
              <Card className="hover:border-primary-300 transition-colors group shadow-sm">
                <Card.Content className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded-xl text-gray-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-700">{item.concept.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.concept.estimatedReadingTime} min read • {item.concept.category?.name || "Topic"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {new Date(item.lastViewedAt).toLocaleDateString()}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-primary-500 transition-colors" />
                  </div>
                </Card.Content>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Clock className="h-8 w-8 text-gray-400" />}
          title="No history yet"
          description="Your reading history will appear here once you start exploring concepts."
        />
      )}
    </div>
  );
}
