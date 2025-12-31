import React, { useState, useRef, useEffect } from 'react';
import ChatBubble from './components/ChatBubble';
import ThinkingBubble from './components/ThinkingBubble';
import FilePanel from './components/FilePanel';
import PdfViewer from './components/PdfViewer';
import { Message, TechDocument, ProcessingState } from './types';
import { analyzeQuery, answerWithContext } from './services/geminiService';
import { PRELOADED_DOCUMENTS } from './data/gdoList';

// --- LOGIN COMPONENT ---
const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Simulate network delay for realism
    setTimeout(() => {
      if (password === "Caserne.SGM") {
        onLogin();
      } else {
        setError(true);
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-900/30 border border-slate-700 mb-6">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">SecoursTech</h1>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-semibold">Accès Sécurisé</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-sm">
          <label className="block text-xs font-medium text-slate-400 mb-2 uppercase">Identifiant Caserne</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full bg-slate-950 text-white border ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:ring-red-500'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all mb-4`}
            placeholder="Mot de passe..."
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-xs mb-4 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Accès refusé. Vérifiez vos identifiants.
            </p>
          )}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-red-700 hover:bg-red-600 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              <>
                Connexion
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </>
            )}
          </button>
        </form>
        <p className="text-center text-slate-600 text-xs mt-6">© 2024 SecoursTech v1.2 - SGM</p>
      </div>
    </div>
  );
};

// --- MAIN APP ---
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [isMobile, setIsMobile] = useState(false);
  
  // PDF Viewing State
  const [viewingDoc, setViewingDoc] = useState<TechDocument | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  // Use preloaded documents
  const documents = PRELOADED_DOCUMENTS; 

  const [inputText, setInputText] = useState('');
  const [processingState, setProcessingState] = useState<ProcessingState>({ step: 'idle' });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Session ID to track current active conversation and invalidate stale requests
  const sessionIdRef = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, processingState]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [inputText]);

  // RESET CHAT FUNCTION
  const handleReset = () => {
    sessionIdRef.current += 1; // Invalidate any pending async operations
    setMessages([]);
    setInputText('');
    setProcessingState({ step: 'idle' });
    setViewingDoc(null);
    if(textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const currentSessionId = sessionIdRef.current;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: new Date()
    };

    // Optimistically add user message
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputText('');
    if(textareaRef.current) textareaRef.current.style.height = 'auto'; 
    
    setProcessingState({ step: 'routing' });

    try {
      // Phase 1: Analysis & Routing
      // PASS HISTORY TO ANALYZE QUERY
      const { intent, doc } = await analyzeQuery(userMsg.content, messages, documents);
      
      // Check if session is still valid
      if (currentSessionId !== sessionIdRef.current) return;
      
      let docName = undefined;

      // Only show system feedback if we are actually doing technical work
      if (intent === 'TECHNICAL_PROCEDURE' && doc) {
         setMessages(prev => [...prev, {
            id: 'sys-reading',
            role: 'system',
            content: `Consultation : ${doc.name}...`,
            timestamp: new Date()
        }]);
        setProcessingState({ step: 'reading', currentDoc: doc.name });
        docName = doc.name;
      } else if (intent === 'GENERAL_KNOWLEDGE') {
          // Optional: slight feedback for expert knowledge
          setProcessingState({ step: 'reasoning' });
      }

      // Phase 2: Generation
      // PASS HISTORY TO ANSWER FUNCTION
      const answerText = await answerWithContext(userMsg.content, messages, intent, doc);
      
      // Check if session is still valid
      if (currentSessionId !== sessionIdRef.current) return;
      
      setMessages(prev => {
        const cleaned = prev.filter(m => m.role !== 'system');
        return [...cleaned, {
          id: (Date.now() + 1).toString(),
          role: 'model',
          content: answerText || "Je n'ai pas pu générer de réponse.",
          timestamp: new Date(),
          sources: doc ? [doc.name] : (intent === 'TECHNICAL_PROCEDURE' ? ['Connaissances Générales (Hors GDO)'] : [])
        }];
      });

    } catch (error: any) {
      // Check if session is still valid
      if (currentSessionId !== sessionIdRef.current) return;
      
      console.error(error);
      const isQuota = error.message === "QUOTA_EXCEEDED" || error.message?.includes('429');
      
      setMessages(prev => {
        const cleaned = prev.filter(m => m.role !== 'system');
        return [...cleaned, {
          id: (Date.now() + 1).toString(),
          role: 'model',
          content: isQuota 
            ? "⚠️ **ALERTE SYSTÈME : Surcharge (Quota API).**\n\nLe nombre maximum de requêtes gratuites est atteint. Veuillez patienter une minute avant de relancer votre demande."
            : "⚠️ Erreur système. Veuillez réessayer.",
          timestamp: new Date()
        }];
      });
    } finally {
      // Only reset processing state if this is still the active session
      if (currentSessionId === sessionIdRef.current) {
        setProcessingState({ step: 'idle' });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-slate-950 text-slate-200 font-sans">
      
      {/* PDF Viewer Modal */}
      {viewingDoc && (
        <PdfViewer 
          document={viewingDoc} 
          onClose={() => setViewingDoc(null)} 
        />
      )}

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black/70 z-30 transition-opacity duration-300 md:hidden ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 md:relative md:z-0
        bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0
        ${isMobile 
          ? (isSidebarOpen ? 'translate-x-0 w-[85%] max-w-xs shadow-2xl' : '-translate-x-full w-[85%] max-w-xs') 
          : (isSidebarOpen ? 'w-80' : 'w-0 border-none') 
        }
      `}>
        <div className="w-full h-full min-w-[20rem]">
          <FilePanel 
            documents={documents} 
            onViewDocument={(doc) => {
              setViewingDoc(doc);
              if(isMobile) setIsSidebarOpen(false);
            }} 
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
             <button 
               className="p-2 -ml-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
               onClick={toggleSidebar}
               aria-label={isSidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
             >
               {isSidebarOpen ? (
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                 </svg>
               ) : (
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                 </svg>
               )}
             </button>

             <div onClick={handleReset} className="cursor-pointer group select-none">
                <h1 className="text-lg md:text-xl font-bold text-white tracking-tight leading-tight group-hover:opacity-80 transition-opacity">Secours<span className="text-red-600">Tech</span></h1>
                <p className="text-[10px] md:text-xs text-slate-400 font-medium leading-none">Assistant Opérationnel v2.3</p>
             </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
            <span className={`w-2 h-2 rounded-full ${processingState.step !== 'idle' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`}></span>
            <span className="text-xs font-medium text-slate-300">
               {processingState.step !== 'idle' ? 'Traitement...' : 'En veille'}
            </span>
          </div>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto p-3 md:p-6 scrollbar-hide overscroll-none">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center opacity-80 px-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-red-900/20 border border-slate-700">
                   <svg className="w-8 h-8 md:w-10 md:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">SecoursTech Ops</h3>
                <p className="text-sm text-slate-400 max-w-xs md:max-w-md mx-auto">
                  Système connecté à la base documentaire caserne.
                  <br/>Prêt pour requête.
                </p>
              </div>
            ) : (
              messages.map(msg => (
                <ChatBubble key={msg.id} message={msg} />
              ))
            )}
            
            {/* Thinking Indicator */}
            {processingState.step !== 'idle' && <ThinkingBubble />}
            
            <div ref={messagesEndRef} className="h-2" />
          </div>
        </main>

        {/* Input Area */}
        <footer className="p-3 md:p-4 bg-slate-900 border-t border-slate-800 pb-safe z-20">
          <div className="max-w-3xl mx-auto relative flex items-end gap-2">
            <div className="relative flex-1">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Entrez votre demande opérationnelle..."
                disabled={processingState.step !== 'idle'}
                rows={1}
                className="w-full bg-slate-800 text-white placeholder-slate-500 text-base border border-slate-700 rounded-2xl pl-4 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none disabled:opacity-50 disabled:cursor-not-allowed shadow-inner max-h-[150px] overflow-y-auto"
                style={{ minHeight: '50px' }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || processingState.step !== 'idle'}
              className="h-[50px] w-[50px] flex-shrink-0 bg-red-700 hover:bg-red-600 active:bg-red-800 text-white rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 disabled:bg-slate-800 shadow-lg"
            >
              {processingState.step !== 'idle' ? (
                 <svg className="w-6 h-6 animate-spin text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                 <svg className="w-6 h-6 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              )}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;