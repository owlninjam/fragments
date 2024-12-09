import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface IslamicGreetingProps {
  className?: string;
}

const IslamicGreeting: React.FC<IslamicGreetingProps> = ({ className = '' }) => {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setTimeOfDay('morning');
      } else if (hour >= 12 && hour < 17) {
        setTimeOfDay('afternoon');
      } else {
        setTimeOfDay('evening');
      }
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const greetings = {
    morning: {
      arabic: 'صباح الخير',
      english: 'Good Morning',
      islamic: 'السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ',
    },
    afternoon: {
      arabic: 'مساء الخير',
      english: 'Good Afternoon',
      islamic: 'السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ',
    },
    evening: {
      arabic: 'مساء الخير',
      english: 'Good Evening',
      islamic: 'السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ',
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={`text-center ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="mb-4 text-2xl font-arabic text-primary"
        variants={itemVariants}
      >
        {greetings[timeOfDay].islamic}
      </motion.div>

      <motion.div
        className="text-xl font-arabic text-secondary"
        variants={itemVariants}
      >
        {greetings[timeOfDay].arabic}
      </motion.div>

      <motion.div
        className="text-lg text-gray-600 dark:text-gray-400"
        variants={itemVariants}
      >
        {greetings[timeOfDay].english}
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="mt-4 flex justify-center space-x-4"
        variants={itemVariants}
      >
        <div className="w-2 h-2 bg-primary rounded-full" />
        <div className="w-2 h-2 bg-secondary rounded-full" />
        <div className="w-2 h-2 bg-primary rounded-full" />
      </motion.div>
    </motion.div>
  );
};

export default IslamicGreeting;
