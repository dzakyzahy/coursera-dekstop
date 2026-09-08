import { useState } from 'react';
import Titlebar from './components/Titlebar';
import Sidebar from './components/Sidebar';
import Background3D from './components/Background3D';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentUrl, setCurrentUrl] = useState('https://www.coursera.org/');

  // For TypeScript compiler with webview tag
  const WebviewComponent = 'webview' as any;

  return (
    <div className={`w-screen h-screen flex flex-col overflow-hidden ${isDarkMode ? 'dark' : ''} transition-colors duration-500 rounded-xl`}>
      <Background3D isDarkMode={isDarkMode} />
      
      <Titlebar isDarkMode={isDarkMode} />
      
      <div className="flex-1 flex w-full h-[calc(100vh-40px)] overflow-hidden">
        <Sidebar 
          isDarkMode={isDarkMode} 
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
          onNavigate={(url: string) => setCurrentUrl(url)}
        />
        
        <div className="flex-1 p-4 h-full relative z-10">
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 glass bg-white/40 dark:bg-black/40">
            {/* 
              We use the Electron webview tag. 
              We don't force dark mode on the Coursera site, just let it render naturally. 
            */}
            <WebviewComponent 
              src={currentUrl} 
              className="w-full h-full"
              allowpopups="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
