/**
 * 数据验证相关的工具函数
 */

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isNotEmpty = (value: string | null | undefined): boolean => {
  return value !== null && value !== undefined && value.trim() !== '';
};

export const isValidSessionId = (sessionId: string): boolean => {
  return sessionId.length > 0 && /^[a-zA-Z0-9_-]+$/.test(sessionId);
};
