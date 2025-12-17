'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function DevPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const pathname = usePathname();

  // Управляем отступом body в зависимости от состояния панели
  useEffect(() => {
    if (isOpen && !isMinimized) {
      document.body.style.paddingLeft = '320px'; // 80 * 4 = 320px (w-80)
    } else {
      document.body.style.paddingLeft = '';
    }
    return () => {
      document.body.style.paddingLeft = '';
    };
  }, [isOpen, isMinimized]);

  useEffect(() => {
    // Проверяем сохраненное состояние
    const savedState = localStorage.getItem('dev-panel-open');
    if (savedState !== null) {
      setIsOpen(savedState === 'true');
    }
    const savedMinimized = localStorage.getItem('dev-panel-minimized');
    if (savedMinimized !== null) {
      setIsMinimized(savedMinimized === 'true');
    }
  }, []);

  const toggleOpen = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem('dev-panel-open', String(newState));
  };

  const toggleMinimized = () => {
    const newState = !isMinimized;
    setIsMinimized(newState);
    localStorage.setItem('dev-panel-minimized', String(newState));
  };

  if (!isOpen) {
    return (
      <button
        onClick={toggleOpen}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-blue-600 text-white px-2 py-4 rounded-r-lg shadow-lg hover:bg-blue-700 transition-colors"
        title="Показать панель разработчика"
      >
        ▶
      </button>
    );
  }

  return (
    <>
      <div
        className={`fixed left-0 top-0 h-full bg-gray-900 text-white z-50 shadow-2xl transition-all duration-300 ${
          isMinimized ? 'w-12' : 'w-80'
        }`}
      >
      {!isMinimized && (
        <div className="h-full overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-700">
            <h2 className="text-lg font-bold text-blue-400">Dev Panel</h2>
            <div className="flex gap-2">
              <button
                onClick={toggleMinimized}
                className="text-gray-400 hover:text-white transition-colors"
                title="Свернуть"
              >
                ◀
              </button>
              <button
                onClick={toggleOpen}
                className="text-gray-400 hover:text-white transition-colors"
                title="Скрыть"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Маршруты */}
            <section>
              <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase">
                Маршруты
              </h3>
              <div className="bg-gray-800 rounded p-3 space-y-2">
                <div>
                  <div className="text-xs text-gray-500">Текущий путь:</div>
                  <div className="text-sm font-mono text-blue-300 break-all">
                    {pathname}
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Все маршруты будут отображаться здесь
                </div>
              </div>
            </section>

            {/* Информация о запросах */}
            <section>
              <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase">
                Запросы
              </h3>
              <div className="bg-gray-800 rounded p-3">
                <div className="text-xs text-gray-500">
                  API URL: {process.env.NEXT_PUBLIC_API_URL || 'не задан'}
                </div>
              </div>
            </section>

            {/* Окружение */}
            <section>
              <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase">
                Окружение
              </h3>
              <div className="bg-gray-800 rounded p-3 space-y-1">
                <div className="text-xs">
                  <span className="text-gray-500">NODE_ENV:</span>{' '}
                  <span className="text-green-400">
                    {process.env.NODE_ENV || 'development'}
                  </span>
                </div>
                <div className="text-xs">
                  <span className="text-gray-500">Режим:</span>{' '}
                  <span className="text-yellow-400">Development</span>
                </div>
              </div>
            </section>

            {/* Быстрые действия */}
            <section>
              <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase">
                Быстрые действия
              </h3>
              <div className="space-y-2">
                <a
                  href="/api/health"
                  target="_blank"
                  className="block bg-gray-800 hover:bg-gray-700 rounded p-2 text-sm transition-colors"
                >
                  Проверить Health
                </a>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-gray-800 hover:bg-gray-700 rounded p-2 text-sm transition-colors text-left"
                >
                  Перезагрузить страницу
                </button>
              </div>
            </section>
          </div>
        </div>
      )}

      {isMinimized && (
        <div className="h-full flex flex-col items-center pt-4">
          <button
            onClick={toggleMinimized}
            className="text-gray-400 hover:text-white transition-colors mb-4"
            title="Развернуть"
          >
            ▶
          </button>
          <button
            onClick={toggleOpen}
            className="text-gray-400 hover:text-white transition-colors"
            title="Скрыть"
          >
            ✕
          </button>
        </div>
      )}
      </div>
    </>
  );
}
