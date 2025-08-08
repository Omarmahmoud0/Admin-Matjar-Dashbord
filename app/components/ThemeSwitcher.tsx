import React from 'react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Theme
        </span>
      </div>
      <button
        onClick={toggleTheme}
        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        style={{
          backgroundColor: theme === 'dark' ? '#3b82f6' : '#d1d5db',
        }}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
        {theme}
      </span>
    </div>
  );
} 