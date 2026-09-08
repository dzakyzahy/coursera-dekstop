import { Minus, Square, X, PanelLeft } from 'lucide-react';

export default function Titlebar({ isDarkMode, toggleSidebar }: { isDarkMode: boolean, toggleSidebar: () => void }) {
  // Use IPC to control the window (requires contextBridge in a real app, but for simplicity with contextIsolation: false we can just require)
  const handleAction = (action: string) => {
    try {
      const { ipcRenderer } = (window as any).require('electron');
      ipcRenderer.send(`window-${action}`);
    } catch (e) {
      console.log('Not running in Electron or require is missing');
    }
  };

  return (
    <div className={`h-10 w-full drag-region flex justify-between items-center px-4 glass border-b ${isDarkMode ? 'border-white/10 text-white' : 'border-black/5 text-slate-800'} transition-colors z-50`}>
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar} className="no-drag hover:bg-black/10 p-1.5 rounded-md transition-colors">
          <PanelLeft size={16} />
        </button>
        <div className="text-xs font-semibold tracking-wider opacity-70">COURSERA DESKTOP</div>
      </div>
      
      <div className="flex items-center gap-1 no-drag h-full">
        <button onClick={() => handleAction('min')} className={`w-10 h-full flex items-center justify-center hover:bg-black/10 transition-colors`}>
          <Minus size={16} />
        </button>
        <button onClick={() => handleAction('max')} className={`w-10 h-full flex items-center justify-center hover:bg-black/10 transition-colors`}>
          <Square size={14} />
        </button>
        <button onClick={() => handleAction('close')} className={`w-10 h-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors`}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
