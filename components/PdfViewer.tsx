import React from 'react';
import { TechDocument } from '../types';

interface PdfViewerProps {
  document: TechDocument;
  onClose: () => void;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ document, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 md:p-6">
      <div className="bg-slate-900 w-full h-full max-w-5xl rounded-2xl flex flex-col shadow-2xl border border-slate-700 animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800 rounded-t-2xl">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-red-900/30 rounded text-red-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
             </div>
             <div>
               <h3 className="text-white font-bold text-sm md:text-lg">{document.name}</h3>
               <p className="text-slate-400 text-xs">{document.filename}</p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Viewer */}
        <div className="flex-1 bg-slate-950 relative overflow-hidden">
          <iframe 
            src={document.path} 
            className="w-full h-full border-none"
            title={document.name}
          />
          {/* Overlay text if iframe has issues on some devices */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
            <p className="text-slate-600 animate-pulse">Chargement du document...</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 text-center">
          <a 
            href={document.path} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-red-400 hover:text-red-300 underline"
          >
            Ouvrir dans un nouvel onglet si l'affichage échoue
          </a>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;