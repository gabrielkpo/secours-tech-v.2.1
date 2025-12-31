import React, { useMemo } from 'react';
import { TechDocument } from '../types';
import { CATEGORIES } from '../data/gdoList';

interface FilePanelProps {
  documents: TechDocument[];
  onViewDocument: (doc: TechDocument) => void;
  onClose?: () => void;
}

const FilePanel: React.FC<FilePanelProps> = ({ documents, onViewDocument, onClose }) => {
  
  // Group documents by category - Memoized to prevent recalc on every keystroke in App
  const groupedDocs = useMemo(() => {
    return CATEGORIES.reduce((acc, cat) => {
      acc[cat] = documents.filter(d => d.category === cat);
      return acc;
    }, {} as Record<string, TechDocument[]>);
  }, [documents]);

  return (
    <div className="h-full flex flex-col w-full transition-all shadow-2xl md:shadow-none bg-slate-900">
      <div className="p-4 md:p-6 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            Bibliothèque
          </h2>
          <p className="text-xs text-slate-400 mt-1">GDO/GNR Référencés</p>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg active:bg-slate-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 touch-pan-y">
        {CATEGORIES.map(category => {
          const catDocs = groupedDocs[category];
          if (catDocs.length === 0) return null;

          return (
            <div key={category} className="space-y-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">{category}</h3>
              <div className="space-y-1">
                {catDocs.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => onViewDocument(doc)}
                    className="w-full text-left group relative bg-slate-800/50 hover:bg-slate-800 p-3 rounded-lg border border-slate-700 hover:border-red-900/50 transition-all active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 rounded text-slate-500 group-hover:text-red-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-200 truncate group-hover:text-white">{doc.name}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5 truncate">{doc.filename}</p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                         <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
        
        {documents.length === 0 && (
           <div className="text-center py-10 opacity-50">
             <p className="text-xs text-slate-500">Aucun document configuré.</p>
           </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900 z-10 pb-safe">
        <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <p className="text-xs font-semibold text-slate-300">Base Synchronisée</p>
          </div>
          <p className="text-[10px] text-slate-500">
             Accès SGM v1.2<br/>
             Documents à jour.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilePanel;