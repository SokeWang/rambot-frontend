/**
 * 主题相关的自定义 hooks
 */

import { useState, useEffect, useCallback } from 'react';
import { Theme, ThemeConfig } from '../types';

const THEME_KEY = 'rambot_theme';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      return (stored as Theme) || 'auto';
    } catch {
      return 'auto';
    }
  });

  const [systemTheme, setSystemTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const actualTheme = theme === 'auto' ? systemTheme : theme;

  // 监听系统主题变化
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 应用主题到 DOM
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(actualTheme);
  }, [actualTheme]);

  const changeTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    try {
      localStorage.setItem(THEME_KEY, newTheme);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = actualTheme === 'light' ? 'dark' : 'light';
    changeTheme(newTheme);
  }, [actualTheme, changeTheme]);

  const config: ThemeConfig = {
    current: theme,
    system: systemTheme,
  };

  return {
    theme: actualTheme,
    config,
    changeTheme,
    toggleTheme,
  };
};
