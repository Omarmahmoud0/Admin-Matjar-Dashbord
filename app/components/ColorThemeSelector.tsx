import React from 'react';
import { useTheme, getColorClasses } from '../hooks/useTheme';

const colorThemes = [
  { name: 'indigo', label: 'Indigo', color: 'bg-indigo-500' },
  { name: 'blue', label: 'Blue', color: 'bg-blue-500' },
  { name: 'green', label: 'Green', color: 'bg-green-500' },
  { name: 'purple', label: 'Purple', color: 'bg-purple-500' },
  { name: 'red', label: 'Red', color: 'bg-red-500' },
  { name: 'orange', label: 'Orange', color: 'bg-orange-500' },
] as const;

export default function ColorThemeSelector() {
  const { colorTheme, setColorTheme } = useTheme();

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Color Theme
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {colorThemes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => setColorTheme(theme.name)}
            className={`relative p-3 rounded-lg border-2 transition-all ${
              colorTheme === theme.name
                ? 'border-gray-900 dark:border-white scale-105'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
          >
            <div className={`w-full h-8 rounded ${theme.color}`} />
            <span className="block text-xs text-center mt-1 text-gray-700 dark:text-gray-300">
              {theme.label}
            </span>
            {colorTheme === theme.name && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
} 