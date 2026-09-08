import { Home, User, BookOpen, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar({ isDarkMode, toggleDarkMode, is3DEnabled, toggle3D, isBotEnabled, toggleBot, onNavigate }: any) {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Home', url: 'https://www.coursera.org/' },
    { icon: <BookOpen size={20} />, label: 'My Learning', url: 'https://www.coursera.org/in-progress' },
    { icon: <User size={20} />, label: 'Profile Settings', url: 'https://www.coursera.org/account-settings' },
  ];

  return (
    <div className={`w-64 h-full flex flex-col glass ${isDarkMode ? 'text-white' : 'text-slate-800'} border-r transition-colors duration-300`}>
      <div className="p-6 flex items-center gap-3 no-drag">
        <div className="w-10 h-10 rounded-full overflow-hidden shadow-[0_0_15px_rgba(0,86,210,0.5)] border border-white/20 bg-white flex-shrink-0">
          <img src="/coursera-c-logo.jpg" alt="Coursera" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-xl font-bold tracking-tight truncate">Coursera</h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 no-drag">
        {menuItems.map((item, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.02, backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate(item.url)}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
          >
            {item.icon}
            {item.label}
          </motion.button>
        ))}
      </nav>

      <div className="p-4 space-y-2 no-drag">
        {/* Toggle 3D Background */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggle3D}
          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium border ${is3DEnabled ? 'border-white/10 hover:bg-white/10' : 'border-black/10 hover:bg-black/5'} transition-colors`}
        >
          <div className="flex items-center gap-3">
            <span>3D Canvas</span>
          </div>
          <div className={`w-8 h-4 rounded-full p-0.5 flex ${is3DEnabled ? 'bg-indigo-500 justify-end' : 'bg-slate-300 justify-start'}`}>
            <motion.div layout className="w-3 h-3 rounded-full bg-white shadow-sm" />
          </div>
        </motion.button>

        {/* Toggle Companion Bot */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleBot}
          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium border ${isBotEnabled ? 'border-white/10 hover:bg-white/10' : 'border-black/10 hover:bg-black/5'} transition-colors`}
        >
          <div className="flex items-center gap-3">
            <span>Tutor Bot</span>
          </div>
          <div className={`w-8 h-4 rounded-full p-0.5 flex ${isBotEnabled ? 'bg-indigo-500 justify-end' : 'bg-slate-300 justify-start'}`}>
            <motion.div layout className="w-3 h-3 rounded-full bg-white shadow-sm" />
          </div>
        </motion.button>

        {/* Toggle Dark Mode */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleDarkMode}
          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium border ${isDarkMode ? 'border-white/10 hover:bg-white/10' : 'border-black/10 hover:bg-black/5'} transition-colors`}
        >
          <div className="flex items-center gap-3">
            {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
            <span>{isDarkMode ? 'Dark' : 'Light'} Mode</span>
          </div>
          <div className={`w-8 h-4 rounded-full p-0.5 flex ${isDarkMode ? 'bg-indigo-500 justify-end' : 'bg-slate-300 justify-start'}`}>
            <motion.div layout className="w-3 h-3 rounded-full bg-white shadow-sm" />
          </div>
        </motion.button>
      </div>
    </div>
  );
}
