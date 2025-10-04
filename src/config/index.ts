/**
 * 应用配置文件
 */

// API 配置
export const API_CONFIG = {
  BASE_URL: 'https://rambot.ai-mindflicker.com/api/v1',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
} as const;

// 本地存储键名
export const STORAGE_KEYS = {
  USER_ID: 'rambot_uv_id',
  SESSION_ID: 'rambot_session_id',
  THEME: 'rambot_theme',
  TOOLS_PREFERENCES: 'rambot_tools_preferences',
} as const;

// 应用配置
export const APP_CONFIG = {
  NAME: 'Rambot',
  VERSION: '1.0.0',
  DESCRIPTION: 'All you need is one chat! Feel free to talk with Rambot.',
  AUTHOR: {
    NAME: 'Developer',
    EMAIL: 'developer@example.com',
    GITHUB: 'https://github.com/developer',
  },
} as const;

// UI 配置
export const UI_CONFIG = {
  DEBOUNCE_DELAY: 300,
  ANIMATION_DURATION: 300,
  TOAST_DURATION: 3000,
  MODAL_BACKDROP_CLOSE: true,
} as const;

// 主题配置
export const THEME_CONFIG = {
  DEFAULT: 'auto' as const,
  STORAGE_KEY: STORAGE_KEYS.THEME,
  CLASSES: {
    LIGHT: 'light',
    DARK: 'dark',
  },
} as const;

// 工具配置
export const TOOLS_CONFIG = {
  DEFAULT_ENABLED: ['web-search', 'file-analyzer'],
  STORAGE_KEY: STORAGE_KEYS.TOOLS_PREFERENCES,
} as const;
