/**
 * 本地存储相关的工具函数
 */

const USER_ID_KEY = 'rambot_uv_id';
const SESSION_KEY = 'rambot_session_id';

export const getOrCreateUserId = (): string => {
  try {
    const existing = localStorage.getItem(USER_ID_KEY);
    if (existing) return existing;
    const uid = (typeof crypto !== 'undefined' && 'randomUUID' in crypto)
      ? (crypto as unknown as { randomUUID: () => string }).randomUUID()
      : `uv_${Math.random().toString(36).slice(2)}_${Date.now()}`;
    localStorage.setItem(USER_ID_KEY, uid);
    return uid;
  } catch {
    // localStorage 不可用时退化到一次性 ID
    return `uv_${Math.random().toString(36).slice(2)}_${Date.now()}`;
  }
};

export const getCachedSessionId = (): string | undefined => {
  try {
    const sid = localStorage.getItem(SESSION_KEY);
    return sid || undefined;
  } catch {
    return undefined;
  }
};

export const saveSessionId = (sessionId?: string): void => {
  if (!sessionId) return;
  try {
    localStorage.setItem(SESSION_KEY, sessionId);
  } catch {
    // ignore
  }
};

export const clearSession = (): void => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
};

export const clearAllData = (): void => {
  try {
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
};
