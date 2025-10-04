/**
 * 通用模态框组件
 */

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { BaseComponentProps } from '../../types';

interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({
  children,
  className = '',
  isOpen,
  onClose,
  title,
  showCloseButton = true,
  closeOnBackdropClick = true,
  size = 'md',
}) => {
  // 处理 ESC 键关闭
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={closeOnBackdropClick ? onClose : undefined}
      />
      
      {/* Modal */}
      <div className={`relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full ${sizeClasses[size]} max-h-[80vh] overflow-hidden ${className}`}>
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="p-6 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              {title && (
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-300"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto max-h-96">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
