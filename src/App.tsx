import { useState } from 'react';
import Titlebar from './components/Titlebar';
import Sidebar from './components/Sidebar';
import Background3D from './components/Background3D';
import CompanionBot from './components/CompanionBot';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [is3DEnabled, setIs3DEnabled] = useState(true);
  const [isBotEnabled, setIsBotEnabled] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('https://www.coursera.org/');

  // For TypeScript compiler with webview tag
  const WebviewComponent = 'webview' as any;

  return (
    <div className={`w-screen h-screen flex flex-col overflow-hidden ${isDarkMode ? 'dark' : ''} transition-colors duration-500 rounded-xl`}>
      {is3DEnabled && <Background3D isDarkMode={isDarkMode} />}
      {isBotEnabled && <CompanionBot />}
      
      <Titlebar isDarkMode={isDarkMode} />
      
      <div className="flex-1 flex w-full h-[calc(100vh-40px)] overflow-hidden">
        <Sidebar 
          isDarkMode={isDarkMode} 
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
          is3DEnabled={is3DEnabled}
          toggle3D={() => setIs3DEnabled(!is3DEnabled)}
          isBotEnabled={isBotEnabled}
          toggleBot={() => setIsBotEnabled(!isBotEnabled)}
          onNavigate={(url: string) => setCurrentUrl(url)}
        />
        
        <div className="flex-1 p-4 h-full relative z-10">
          {/* Made the background more transparent to see the 3D effect behind Coursera */}
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 glass bg-white/20 dark:bg-black/20 backdrop-blur-sm">
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
