import React from 'react';
import Markdown from 'react-markdown';
import { Message } from '../types';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center my-4 animate-pulse">
        <span className="text-xs font-mono text-slate-500 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-2">
           <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           {message.content}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex max-w-[95%] md:max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg ${isUser ? 'bg-slate-700' : 'bg-red-700'}`}>
          {isUser ? (
             <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          ) : (
             <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
          )}
        </div>

        {/* Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} min-w-0`}>
          <div className={`px-5 py-3.5 rounded-2xl shadow-md text-sm md:text-base leading-relaxed overflow-hidden ${
            isUser 
              ? 'bg-slate-700 text-white rounded-tr-none' 
              : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none w-full'
          }`}>
            <Markdown
              components={{
                // Styles personnalisés pour le rendu Markdown
                h1: ({node, ...props}) => <h1 className="text-lg font-bold text-white mt-4 mb-2 border-b border-slate-600 pb-1" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-base font-bold text-white mt-4 mb-2" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-sm font-bold text-red-400 mt-3 mb-1 uppercase tracking-wide" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1 marker:text-slate-500" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1 marker:text-slate-500" {...props} />,
                li: ({node, ...props}) => <li className="pl-1" {...props} />,
                p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                em: ({node, ...props}) => <em className="italic text-slate-400" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-red-900/50 pl-3 italic text-slate-400 my-2" {...props} />,
                code: ({node, ...props}) => <code className="bg-slate-900 px-1 py-0.5 rounded text-xs font-mono text-red-300" {...props} />,
              }}
            >
              {message.content}
            </Markdown>
          </div>
          
          {/* Sources Badge */}
          {!isUser && message.sources && message.sources.length > 0 && (
            <div className="mt-2 flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Source:</span>
              {message.sources.map((src, i) => (
                <span key={i} className="text-xs bg-red-900/20 text-red-400 border border-red-900/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  {src}
                </span>
              ))}
            </div>
          )}
          
          <span className="text-[10px] text-slate-600 mt-1 px-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;