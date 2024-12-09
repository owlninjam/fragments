"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

interface Prayer {
  name: string;
  time: string;
  arabicName: string;
}

interface City {
  name: string;
  latitude: number;
  longitude: number;
  arabicName: string;
}

// Jammu and Kashmir Cities
const cities: City[] = [
  { name: 'Srinagar', latitude: 34.0837, longitude: 74.7973, arabicName: 'سرینگر' },
  { name: 'Jammu', latitude: 32.7266, longitude: 74.8570, arabicName: 'جموں' },
  { name: 'Anantnag', latitude: 33.7311, longitude: 75.1487, arabicName: 'اننت ناگ' },
  { name: 'Baramulla', latitude: 34.2032, longitude: 74.3422, arabicName: 'بارہمولہ' },
  { name: 'Leh', latitude: 34.1526, longitude: 77.5771, arabicName: 'لیہہ' },
];

const PrayerTimes: React.FC = () => {
  const [prayers, setPrayers] = useState<Prayer[]>([
    { name: 'Fajr', time: '', arabicName: 'الفجر' },
    { name: 'Dhuhr', time: '', arabicName: 'الظهر' },
    { name: 'Asr', time: '', arabicName: 'العصر' },
    { name: 'Maghrib', time: '', arabicName: 'المغرب' },
    { name: 'Isha', time: '', arabicName: 'العشاء' },
  ]);
  const [nextPrayer, setNextPrayer] = useState<Prayer | null>(null);
  const [selectedCity, setSelectedCity] = useState<City>(cities[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrayerTimes = async (city: City) => {
    try {
      setLoading(true);
      setError(null);
      
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      // Using Hanafi method (2 is for Hanafi calculation)
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${city.latitude}&longitude=${city.longitude}&method=1`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch prayer times');
      }

      const data = await response.json();
      const timings = data.data.timings;

      const updatedPrayers = prayers.map(prayer => ({
        ...prayer,
        time: timings[prayer.name],
      }));

      setPrayers(updatedPrayers);
      updateNextPrayer(updatedPrayers);
    } catch (err) {
      setError('Failed to load prayer times. Please try again later.');
      console.error('Error fetching prayer times:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateNextPrayer = (prayersList: Prayer[]) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const nextPrayerIndex = prayersList.findIndex(prayer => {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerTime = hours * 60 + minutes;
      return prayerTime > currentTime;
    });

    if (nextPrayerIndex !== -1) {
      setNextPrayer(prayersList[nextPrayerIndex]);
    } else {
      setNextPrayer(prayersList[0]); // Next Fajr
    }
  };

  useEffect(() => {
    fetchPrayerTimes(selectedCity);
    
    // Update prayer times every minute
    const interval = setInterval(() => {
      updateNextPrayer(prayers);
    }, 60000);

    return () => clearInterval(interval);
  }, [selectedCity]);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center text-primary">
        Prayer Times
        <span className="block text-lg font-arabic mt-1">أوقات الصلاة</span>
      </h2>

      {/* City Selection */}
      <div className="mb-4">
        <select
          value={selectedCity.name}
          onChange={(e) => {
            const city = cities.find(c => c.name === e.target.value);
            if (city) setSelectedCity(city);
          }}
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name} - {city.arabicName}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner size="md" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : (
        <>
          {nextPrayer && (
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Next Prayer</p>
              <p className="text-xl font-semibold text-secondary">
                {nextPrayer.name}
                <span className="block font-arabic text-lg">{nextPrayer.arabicName}</span>
              </p>
              <p className="text-lg">{formatTime(nextPrayer.time)}</p>
            </div>
          )}

          <div className="space-y-3">
            {prayers.map((prayer) => (
              <motion.div
                key={prayer.name}
                whileHover={{ scale: 1.02 }}
                className={`flex justify-between items-center p-2 rounded ${
                  nextPrayer?.name === prayer.name
                    ? 'bg-primary/10 dark:bg-primary/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{prayer.name}</span>
                  <span className="text-sm font-arabic">{prayer.arabicName}</span>
                </div>
                <span className="text-lg">{formatTime(prayer.time)}</span>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default PrayerTimes;
