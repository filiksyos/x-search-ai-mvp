'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

export default function SearchInterface() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, isLoading } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        {/* Messages Display */}
        <div className="mb-6 space-y-4 max-h-[500px] overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Ask me to search for tweets or Twitter content!
              </p>
              <div className="mt-4 text-sm text-gray-400 dark:text-gray-500">
                <p>Example: "Search for tweets about AI"</p>
                <p>Example: "Find recent posts about Next.js"</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">
                      {message.role === 'user' ? '👤' : '🤖'}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold mb-1">
                        {message.role === 'user' ? 'You' : 'AI Assistant'}
                      </div>
                      <div className="whitespace-pre-wrap break-words">
                        {message.parts?.map((part: any, index: number) => {
                          if (part.type === 'text') {
                            return <span key={index}>{part.text}</span>;
                          }
                          return null;
                        })}
                      </div>
                      {message.parts?.some((part: any) => part.type?.startsWith('tool-')) && (
                        <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600">
                          {message.parts
                            .filter((part: any) => part.type?.startsWith('tool-'))
                            .map((toolPart: any, index: number) => (
                              <div key={toolPart.toolCallId || index} className="text-sm">
                                {toolPart.state === 'output-available' && (
                                  <div>
                                    <div className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                                      🔧 Tool: {toolPart.toolName || toolPart.type.replace('tool-', '')}
                                    </div>
                                    <pre className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg overflow-x-auto text-xs">
                                      {JSON.stringify(toolPart.output, null, 2)}
                                    </pre>
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <span className="text-gray-600 dark:text-gray-300">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for tweets..."
            className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isLoading ? '⏳' : '🚀'} Search
          </button>
        </form>
      </div>
    </div>
  );
}
