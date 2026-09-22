import React from 'react';
import { ActiveTab } from '../types';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  filteredCount: number;
  totalCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  filteredCount,
  totalCount,
}) => {
  const tabs = [
    {
      id: 'overview' as ActiveTab,
      label: 'ภาพรวมสุขภาพ',
      sub: 'Overview',
      emoji: '🏠',
      badge: 'KPIs 4 มิติ ✨',
    },
    {
      id: 'risk_trend' as ActiveTab,
      label: 'ความเสี่ยงและแนวโน้ม',
      sub: 'Risk & Trends',
      emoji: '📈',
      badge: '6 กราฟวิเคราะห์ 📊',
    },
    {
      id: 'behavior_correlation' as ActiveTab,
      label: 'พฤติกรรม & BMI',
      sub: 'Behavior & BMI',
      emoji: '🥑',
      badge: 'พฤติกรรม & กราฟจุด 🎯',
    },
    {
      id: 'data_table' as ActiveTab,
      label: 'ตารางข้อมูลรายบุคคล',
      sub: 'Individual Data',
      emoji: '🧸',
      badge: `${filteredCount}/${totalCount} คน`,
    },
    {
      id: 'recommendations' as ActiveTab,
      label: 'ข้อเสนอแนะสุขภาพ',
      sub: 'Recommendations',
      emoji: '💡',
      badge: 'สรุปนโยบาย 🌻',
    },
  ];

  return (
    <nav className="bg-amber-100/60 border-b border-amber-200/80 sticky top-0 z-20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-2 sm:space-x-3 overflow-x-auto py-3 no-scrollbar scroll-smooth">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-amber-300 text-stone-900 shadow-md shadow-amber-300/40 ring-3 ring-amber-400/50 scale-[1.02]'
                    : 'bg-white/70 hover:bg-white text-stone-700 border border-amber-200/70 hover:border-amber-300'
                }`}
              >
                <span className="text-base sm:text-lg transition-transform group-hover:scale-125 duration-150">
                  {tab.emoji}
                </span>
                <span className="font-['Mali',cursive]">{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`ml-1 px-2 py-0.5 text-[10px] rounded-full font-bold ${
                      isActive
                        ? 'bg-amber-950 text-amber-200 shadow-2xs'
                        : 'bg-amber-200/80 text-amber-900'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
