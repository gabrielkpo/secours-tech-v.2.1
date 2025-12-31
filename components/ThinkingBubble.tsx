import React from 'react';

const ThinkingBubble = () => {
  return (
    <div className="flex w-full justify-start mb-6 animate-fade-in">
      <div className="flex max-w-[85%] flex-row gap-3">
        
        {/* Avatar (Identical to ChatBubble) */}
        <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg bg-red-700">
           <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
        </div>

        {/* Bubble with Dots */}
        <div className="flex flex-col items-start min-w-0">
          <div className="px-5 py-4 rounded-2xl shadow-md bg-slate-800 border border-slate-700 rounded-tl-none w-auto">
            <div className="flex space-x-1.5 items-center h-4">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-typing-1"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-typing-2"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-typing-3"></div>
            </div>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 px-1 opacity-80">
            Analyse opérationnelle...
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThinkingBubble;