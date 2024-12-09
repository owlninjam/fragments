import React from 'react';
import { motion } from 'framer-motion';
import GeometricPattern from './GeometricPattern';
import PrayerTimes from './PrayerTimes';
import IslamicGreeting from './IslamicGreeting';

interface IslamicLayoutProps {
  children: React.ReactNode;
}

const IslamicLayout: React.FC<IslamicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-text relative overflow-hidden">
      {/* Background Pattern */}
      <GeometricPattern pattern="arabesque" className="opacity-30" />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        {/* Header */}
        <header className="mb-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <IslamicGreeting />
          </motion.div>
        </header>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3"
          >
            <PrayerTimes />
          </motion.aside>

          {/* Main Content */}
          <motion.main
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-9"
          >
            {children}
          </motion.main>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400"
        >
          <p className="font-arabic mb-2">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
          <p>© {new Date().getFullYear()} Fragments - Islamic Voice Interface</p>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default IslamicLayout;
