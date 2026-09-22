import React, { useState, useEffect } from 'react';
import { Wine, RefreshCw, Calendar, User, CheckCircle2, Sparkles, Heart, Sun, Coffee } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => Promise<void>;
  isRefreshing: boolean;
  lastUpdated: string;
  totalRecords: number;
}

const CUTE_QUOTES = [
  '🌻 ดื่มน้ำเปล่าเยอะๆ พักผ่อนให้เพียงพอนะคะ~',
  '🐥 สุขภาพดีเริ่มต้นจากการดูแลตัวเองทุกวันน้า',
  '🍯 ลดแอลกอฮอล์วันละนิด เพิ่มรอยยิ้มวันละหน่อย ✨',
  '🥑 ขยับวันละนิด ออกกำลังกายเบาๆ ก็สดชื่นแล้ว!',
  '💛 ยินดีต้อนรับสู่แดชบอร์ดสุขภาพแสนน่ารักค่ะ',
];

export const Header: React.FC<HeaderProps> = ({
  onRefresh,
  isRefreshing,
  lastUpdated,
  totalRecords,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('th-TH', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const changeQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % CUTE_QUOTES.length);
  };

  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-amber-100/90 via-yellow-100/95 to-amber-50/90 border-b-2 border-dashed border-amber-300/80 shadow-xs">
      {/* Decorative cute pastel floating bubbles */}
      <div className="absolute -top-10 -right-10 w-44 h-44 bg-yellow-300/25 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 -left-8 w-36 h-36 bg-amber-300/20 rounded-full blur-xl pointer-events-none" />
      <div className="absolute top-2 right-1/4 text-2xl opacity-20 select-none animate-pulse pointer-events-none">✨</div>
      <div className="absolute bottom-2 left-1/3 text-2xl opacity-20 select-none pointer-events-none">🌻</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Title and Cute Branding */}
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="relative group flex-shrink-0 w-14 h-14 rounded-3xl bg-gradient-to-br from-amber-300 to-yellow-400 text-amber-950 flex items-center justify-center shadow-md shadow-amber-300/50 ring-4 ring-yellow-200/80 transition-transform hover:scale-105 hover:rotate-3 duration-200">
              <span className="text-2xl select-none">🐥</span>
              <span className="absolute -bottom-1 -right-1 text-xs">✨</span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-amber-200/90 text-amber-900 border border-amber-300 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Pastel Health & Alcohol Risk Dashboard</span>
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 tracking-tight font-['Mali',cursive]">
                การวิเคราะห์สุขภาพและการประเมินความเสี่ยงจากการดื่มแอลกอฮอลล์ 💛
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 font-medium mt-0.5 flex items-center gap-1.5">
                <span>เป็น Dashboard การวิเคราะห์ข้อมูลสุขภาพและการประเมินความเสี่ยงจากการดื่มแอลกอฮอลล์</span>
                <span className="hidden sm:inline text-amber-600">🌷</span>
              </p>
            </div>
          </div>

          {/* Right Side: Cute Creator Card & Live Clock */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 bg-white/85 backdrop-blur-sm p-3 rounded-3xl border-2 border-amber-200 shadow-xs self-start lg:self-center">
            
            {/* Creator Badge: น่ารักเป็นพิเศษ */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-300/80 text-stone-800 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-amber-300 flex items-center justify-center text-amber-900 font-bold text-sm shadow-inner ring-2 ring-amber-200">
                👩‍⚕️
              </div>
              <div className="text-left">
                <p className="text-[10px] text-amber-800 font-semibold leading-none flex items-center gap-1">
                  <span>ผู้จัดทำ</span>
                  <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
                </p>
                <p className="text-xs sm:text-sm font-bold text-stone-900 leading-tight font-['Mali',cursive]">
                  นางสาวอรวรรณ จิ๋วปัญญา
                </p>
              </div>
            </div>

            {/* Live Timestamp */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-yellow-50/90 border border-yellow-200 text-stone-700 text-xs">
              <div className="w-6 h-6 rounded-full bg-yellow-200/80 flex items-center justify-center text-xs">
                ⏰
              </div>
              <div>
                <div className="flex items-center gap-1 font-semibold text-stone-800">
                  <span>อัปเดต: {lastUpdated}</span>
                  <span className="text-amber-500">|</span>
                  <span className="text-amber-800 font-mono text-xs">{currentTime}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>ข้อมูลพร้อม ({totalRecords} รายบุคคล)</span>
                </div>
              </div>
            </div>

            {/* Refresh Button น่ารัก ดุ๊กดิ๊ก */}
            <button
              id="refresh-sheet-btn"
              onClick={onRefresh}
              disabled={isRefreshing}
              title="รีเฟรชข้อมูลสุขภาพล่าสุด"
              className="group inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold text-amber-950 bg-amber-300 hover:bg-amber-400 active:scale-95 transition-all shadow-xs border border-amber-400/80 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-500 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="font-['Mali',cursive]">รีเฟรชข้อมูล 🍯</span>
            </button>

          </div>

        </div>

        {/* Cute Interactive Health Quote Bar */}
        <div
          onClick={changeQuote}
          className="mt-3.5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 hover:bg-white text-stone-700 text-xs font-medium border border-amber-200 cursor-pointer transition-colors shadow-2xs select-none"
        >
          <span className="text-amber-700">💛 โน้ตสุขภาพ:</span>
          <span className="text-stone-800 font-['Mali',cursive]">{CUTE_QUOTES[quoteIndex]}</span>
          <span className="text-[10px] text-amber-600 font-normal">(คลิกเปลี่ยนข้อความ ✨)</span>
        </div>

      </div>
    </header>
  );
};
