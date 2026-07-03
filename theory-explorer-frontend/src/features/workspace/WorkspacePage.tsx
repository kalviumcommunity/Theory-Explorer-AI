import { useNavigate } from 'react-router-dom';

export function WorkspacePage() {
  const navigate = useNavigate();

  // Mock Data
  const stats = {
    streak: 12,
    timeSpent: 120, // mins
    conceptsLearned: 5,
    weakTopics: ['Recursion', 'Docker']
  };

  const learningPaths = [
    { title: 'Intro to React', progress: 60 },
    { title: 'Advanced Algorithms', progress: 10 }
  ];

  return (
    <div className="container-app py-8 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Developer!</h1>
          <p className="text-gray-500 mt-1">Here is your learning overview for today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Learning Streak</h3>
          <p className="text-3xl font-bold text-orange-500 mt-2">🔥 {stats.streak} Days</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Time Spent</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">⏱️ {Math.floor(stats.timeSpent / 60)}h {stats.timeSpent % 60}m</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Concepts Mastered</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">🧠 {stats.conceptsLearned}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Focus Areas</h3>
          <div className="mt-2 flex gap-2 flex-wrap">
            {stats.weakTopics.map((topic, i) => (
              <span key={i} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">{topic}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Active Learning Paths</h2>
          <div className="space-y-4">
            {learningPaths.map((path, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{path.title}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-600" style={{ width: `${path.progress}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-500">{path.progress}%</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors">
                  Continue
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
            <button onClick={() => navigate('/practice')} className="w-full text-left p-4 rounded-lg hover:bg-gray-50 border transition-colors flex items-center justify-between group">
              <div>
                <strong className="block text-gray-900 group-hover:text-primary-600">Daily Review (SRS)</strong>
                <span className="text-xs text-gray-500">12 flashcards due today</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            <button onClick={() => navigate('/graph')} className="w-full text-left p-4 rounded-lg hover:bg-gray-50 border transition-colors flex items-center justify-between group">
              <div>
                <strong className="block text-gray-900 group-hover:text-primary-600">Knowledge Graph</strong>
                <span className="text-xs text-gray-500">Explore the global map</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
