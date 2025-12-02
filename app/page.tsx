import SearchInterface from "./components/SearchInterface";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🔍 X Search AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            AI-powered Twitter/X search with real-time streaming
          </p>
        </header>
        <SearchInterface />
      </div>
    </main>
  );
}
