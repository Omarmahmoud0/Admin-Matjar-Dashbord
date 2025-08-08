import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';
type ColorTheme = 'indigo' | 'blue' | 'green' | 'purple' | 'red' | 'orange';

interface ThemeState {
  theme: Theme;
  colorTheme: ColorTheme;
  setTheme: (theme: Theme) => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      colorTheme: 'indigo',
      setTheme: (theme) => set({ theme }),
      setColorTheme: (colorTheme) => set({ colorTheme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

// Helper function to get color classes based on theme
export const getColorClasses = (colorTheme: ColorTheme) => {
  const colors = {
    indigo: {
      primary: 'bg-indigo-500',
      primaryHover: 'hover:bg-indigo-600',
      primaryActive: 'bg-indigo-700',
      primaryText: 'text-indigo-500',
    },
    blue: {
      primary: 'bg-blue-500',
      primaryHover: 'hover:bg-blue-600',
      primaryActive: 'bg-blue-700',
      primaryText: 'text-blue-500',
    },
    green: {
      primary: 'bg-green-500',
      primaryHover: 'hover:bg-green-600',
      primaryActive: 'bg-green-700',
      primaryText: 'text-green-500',
    },
    purple: {
      primary: 'bg-purple-500',
      primaryHover: 'hover:bg-purple-600',
      primaryActive: 'bg-purple-700',
      primaryText: 'text-purple-500',
    },
    red: {
      primary: 'bg-red-500',
      primaryHover: 'hover:bg-red-600',
      primaryActive: 'bg-red-700',
      primaryText: 'text-red-500',
    },
    orange: {
      primary: 'bg-orange-500',
      primaryHover: 'hover:bg-orange-600',
      primaryActive: 'bg-orange-700',
      primaryText: 'text-orange-500',
    },
  };
  
  return colors[colorTheme];
}; 