import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CompanionBot() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Random floating movement
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setPosition({
          x: Math.random() * 20 - 10,
          y: Math.random() * 20 - 10,
        });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 300, top: 0, bottom: 300 }}
      animate={{ 
        x: position.x, 
        y: position.y,
        scale: isHovered ? 1.1 : 1
      }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="fixed bottom-10 right-10 z-50 cursor-grab active:cursor-grabbing"
    >
      <div className="relative">
        {/* Chat bubble that appears on hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white px-3 py-1.5 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-xs font-medium whitespace-nowrap"
          >
            Ayo Semangat Belajar! 🚀
            {/* Speech bubble pointer */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-slate-800 rotate-45 border-r border-b border-slate-200 dark:border-slate-700" />
          </motion.div>
        )}
        
        {/* The Bot itself */}
        <div className="w-14 h-14 bg-indigo-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)] border-2 border-white/20">
          <Bot size={28} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}
