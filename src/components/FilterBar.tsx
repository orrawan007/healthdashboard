import React from 'react';
import { FilterState } from '../types';
import { Filter, RotateCcw, Search, Sparkles } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalRecords: number;
  filteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  totalRecords,
  filteredCount,
}) => {
  const isFiltered =
    filters.alcohol !== 'ทั้งหมด' ||
    filters.exercise !== 'ทั้งหมด' ||
    filters.riskLevel !== 'ทั้งหมด' ||
    filters.gender !== 'ทั้งหมด' ||
    filters.area !== 'ทั้งหมด' ||
    filters.searchQuery.trim() !== '';

  const handleReset = () => {
    setFilters({
      alcohol: 'ทั้งหมด',
      exercise: 'ทั้งหมด',
      riskLevel: 'ทั้งหมด',
      gender: 'ทั้งหมด',
      area: 'ทั้งหมด',
      searchQuery: '',
    });
  };

  return (
    <div className="bg-white/90 backdrop-blur-xs rounded-3xl border-2 border-amber-200/90 p-4 sm:p-5 shadow-xs mb-6 relative overflow-hidden">
      {/* Decorative cute corner note */}
      <div className="absolute top-2 right-3 text-xs opacity-30 select-none">🍯 ✨</div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-dashed border-amber-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-200 text-amber-950 flex items-center justify-center text-lg shadow-2xs">
            🧸
          </div>
          <div>
            <h3 className="font-bold text-stone-900 text-sm sm:text-base font-['Mali',cursive] flex items-center gap-2">
              <span>แผงตัวกรองสุขภาพสุดคิ้วท์ (Data Filters)</span>
              {isFiltered && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-200 text-amber-950 border border-amber-300">
                  <Sparkles className="w-3 h-3 text-amber-700" />
                  กำลังคัดกรอง
                </span>
              )}
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              เลือกดูข้อมูลเฉพาะกลุ่มที่ต้องการได้เลยน้า (พบ <strong className="text-amber-900">{filteredCount}</strong> จาก {totalRecords} คน)
            </p>
          </div>
        </div>

        {/* Search input & Reset */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-60">
            <Search className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="filter-search-input"
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              placeholder="🔍 ค้นหารหัส / พื้นที่ / เพศ..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-2xl border-2 border-amber-200 bg-amber-50/50 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all shadow-inner font-medium"
            />
          </div>

          {isFiltered && (
            <button
              id="filter-reset-btn"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold text-amber-950 bg-amber-200 hover:bg-amber-300 active:scale-95 transition-all border border-amber-300 shadow-2xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-800" />
              <span className="font-['Mali',cursive]">ล้างตัวกรอง ✨</span>
            </button>
          )}
        </div>
      </div>

      {/* The 4 Core Filters + Area Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        
        {/* Filter 1: ดื่มแอลกอฮอล์ (Required 1) */}
        <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200/90 shadow-2xs hover:bg-amber-50 transition-colors">
          <label htmlFor="filter-alcohol" className="flex items-center gap-1.5 text-xs font-bold text-stone-800 mb-1.5 font-['Mali',cursive]">
            <span>🍺 1. ดื่มแอลกอฮอล์</span>
          </label>
          <select
            id="filter-alcohol"
            value={filters.alcohol}
            onChange={(e) => setFilters(prev => ({ ...prev, alcohol: e.target.value }))}
            className="w-full text-xs sm:text-sm bg-white rounded-xl border border-amber-300 px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium cursor-pointer shadow-2xs"
          >
            <option value="ทั้งหมด">ทั้งหมด (ทุกพฤติกรรม) ✨</option>
            <option value="ดื่ม">🍺 ดื่มแอลกอฮอล์</option>
            <option value="ไม่ดื่ม">🍵 ไม่ดื่มแอลกอฮอล์</option>
          </select>
        </div>

        {/* Filter 2: การออกกำลังกาย (Required 2) */}
        <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200/90 shadow-2xs hover:bg-amber-50 transition-colors">
          <label htmlFor="filter-exercise" className="flex items-center gap-1.5 text-xs font-bold text-stone-800 mb-1.5 font-['Mali',cursive]">
            <span>🏃‍♀️ 2. การออกกำลังกาย</span>
          </label>
          <select
            id="filter-exercise"
            value={filters.exercise}
            onChange={(e) => setFilters(prev => ({ ...prev, exercise: e.target.value }))}
            className="w-full text-xs sm:text-sm bg-white rounded-xl border border-amber-300 px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium cursor-pointer shadow-2xs"
          >
            <option value="ทั้งหมด">ทั้งหมด (ทุกความถี่) ✨</option>
            <option value="สม่ำเสมอ">🏃 สม่ำเสมอ (ฟิตมาก)</option>
            <option value="บางครั้ง">🚶 บางครั้ง (พอมีบ้าง)</option>
            <option value="ไม่ออกกำลังกาย">🛋️ ไม่ออกกำลังกาย</option>
          </select>
        </div>

        {/* Filter 3: ระดับความเสี่ยง (Required 3) */}
        <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200/90 shadow-2xs hover:bg-amber-50 transition-colors">
          <label htmlFor="filter-risk" className="flex items-center gap-1.5 text-xs font-bold text-stone-800 mb-1.5 font-['Mali',cursive]">
            <span>⚠️ 3. ระดับความเสี่ยง</span>
          </label>
          <select
            id="filter-risk"
            value={filters.riskLevel}
            onChange={(e) => setFilters(prev => ({ ...prev, riskLevel: e.target.value }))}
            className="w-full text-xs sm:text-sm bg-white rounded-xl border border-amber-300 px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium cursor-pointer shadow-2xs"
          >
            <option value="ทั้งหมด">ทั้งหมด (ทุกระดับ) ✨</option>
            <option value="สูง">🟠 ความเสี่ยงสูง (ต้องระวัง)</option>
            <option value="ปานกลาง">🟡 ความเสี่ยงปานกลาง</option>
            <option value="ต่ำ">🟢 ความเสี่ยงต่ำ (สุขภาพดี)</option>
          </select>
        </div>

        {/* Filter 4: เพศ (Required 4) */}
        <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200/90 shadow-2xs hover:bg-amber-50 transition-colors">
          <label htmlFor="filter-gender" className="flex items-center gap-1.5 text-xs font-bold text-stone-800 mb-1.5 font-['Mali',cursive]">
            <span>👥 4. เพศ</span>
          </label>
          <select
            id="filter-gender"
            value={filters.gender}
            onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
            className="w-full text-xs sm:text-sm bg-white rounded-xl border border-amber-300 px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium cursor-pointer shadow-2xs"
          >
            <option value="ทั้งหมด">ทั้งหมด (ชายและหญิง) 👫</option>
            <option value="ชาย">👦 เพศชาย</option>
            <option value="หญิง">👧 เพศหญิง</option>
          </select>
        </div>

        {/* Additional Filter: พื้นที่ */}
        <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200/90 shadow-2xs hover:bg-amber-50 transition-colors">
          <label htmlFor="filter-area" className="flex items-center gap-1.5 text-xs font-bold text-stone-800 mb-1.5 font-['Mali',cursive]">
            <span>📍 5. พื้นที่บริการ</span>
          </label>
          <select
            id="filter-area"
            value={filters.area}
            onChange={(e) => setFilters(prev => ({ ...prev, area: e.target.value }))}
            className="w-full text-xs sm:text-sm bg-white rounded-xl border border-amber-300 px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium cursor-pointer shadow-2xs"
          >
            <option value="ทั้งหมด">ทั้งหมดทุกพื้นที่ 🗺️</option>
            <option value="เมือง">🏙️ เมือง</option>
            <option value="เหนือ">⛰️ เหนือ</option>
            <option value="ใต้">🌊 ใต้</option>
            <option value="ตะวันออก">🌅 ตะวันออก</option>
            <option value="ตะวันตก">🌾 ตะวันตก</option>
          </select>
        </div>

      </div>

      {/* Active filters pill list */}
      {isFiltered && (
        <div className="mt-3 pt-2.5 border-t border-amber-200/60 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-amber-800 font-bold font-['Mali',cursive]">สติกเกอร์ตัวกรองที่เลือก:</span>
          {filters.alcohol !== 'ทั้งหมด' && (
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-medium">
              แอลกอฮอล์: {filters.alcohol}
            </span>
          )}
          {filters.exercise !== 'ทั้งหมด' && (
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-medium">
              ออกกำลังกาย: {filters.exercise}
            </span>
          )}
          {filters.riskLevel !== 'ทั้งหมด' && (
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-medium">
              ความเสี่ยง: {filters.riskLevel}
            </span>
          )}
          {filters.gender !== 'ทั้งหมด' && (
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-medium">
              เพศ: {filters.gender}
            </span>
          )}
          {filters.area !== 'ทั้งหมด' && (
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-medium">
              พื้นที่: {filters.area}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
