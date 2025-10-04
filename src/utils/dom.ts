/**
 * DOM 操作相关的工具函数
 */

export const scrollToBottom = (element: HTMLDivElement | null): void => {
  element?.scrollIntoView({ behavior: 'smooth' });
};

export const scrollToTop = (element: HTMLDivElement | null): void => {
  element?.scrollTo({ top: 0, behavior: 'smooth' });
};

export const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
