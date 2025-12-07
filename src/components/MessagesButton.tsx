import React from 'react';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';

interface MessagesButtonProps {
  newMessagesCount?: number;
}

export const MessagesButton: React.FC<MessagesButtonProps> = ({ newMessagesCount = 0 }) => {
  // Показывать фиксированную кнопку только на экранах шире 768px
  const isDesktop = useMediaQuery({ minWidth: 768 });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('/messages', '_blank');
  };

  if (!isDesktop) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed z-[100] right-5 bottom-5 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shadow-xl hover:bg-primary/90 transition-colors focus:outline-none"
      aria-label="Открыть сообщения"
      style={{ boxShadow: '0 6px 32px rgba(0,0,0,0.18)' }}
    >
      {/* Классическая иконка чата */}
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M4 19V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H7l-3 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor"/>
      </svg>
      {newMessagesCount > 0 && (
        <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
      )}
    </button>
  );
};

// Для футера на мобильных
export const MessagesFooterButton: React.FC<MessagesButtonProps> = ({ newMessagesCount = 0 }) => {
  // Только на мобильных
  const isMobile = useMediaQuery({ maxWidth: 767 });
  if (!isMobile) return null;
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        window.open('/messages', '_blank');
      }}
      className="flex items-center gap-2 px-3 py-2 rounded bg-primary text-white shadow hover:bg-primary/90 transition-colors focus:outline-none"
      aria-label="Открыть сообщения"
    >
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <path d="M4 19V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H7l-3 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor"/>
      </svg>
      {newMessagesCount > 0 && (
        <span className="w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white inline-block"></span>
      )}
      <span className="text-sm font-medium">Сообщения</span>
    </button>
  );
};
