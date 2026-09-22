import React from 'react';
import { SummaryStats } from '../types';
import {
  Users,
  AlertTriangle,
  Scale,
  HeartPulse,
  TrendingUp,
  Percent,
  Sparkles,
  Flame,
  ArrowUpDown,
  Wine,
  Activity,
  Award,
} from 'lucide-react';

interface KpiCardsProps {
  stats: SummaryStats;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ stats }) => {
  return (
    <div className="space-y-4 mb-6">
      
      {/* Category Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">✨</span>
          <h3 className="font-extrabold text-stone-900 text-base sm:text-lg font-['Mali',cursive]">
            สรุปข้อมูลสถิติสุขภาพ 4 มิติ (Cute Health KPIs)
          </h3>
        </div>
        <span className="text-xs text-amber-800 bg-amber-200/80 px-3 py-1 rounded-full font-bold font-['Mali',cursive]">
          ครบถ้วน: จำนวน • ค่าเฉลี่ย • Min-Max • สัดส่วน 🌻
        </span>
      </div>

      {/* Grid of 4 Core Dimension Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* CARD 1: จำนวน (Counts) */}
        <div
          id="kpi-count-card"
          className="relative bg-gradient-to-br from-amber-50/90 via-yellow-50/90 to-amber-100/60 rounded-3xl p-5 border-2 border-amber-300/80 shadow-xs hover:shadow-md transition-all duration-200 group"
        >
          <div className="absolute top-3 right-3 w-9 h-9 rounded-2xl bg-amber-200 text-amber-950 flex items-center justify-center text-base shadow-2xs group-hover:rotate-12 transition-transform">
            🐥
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 font-['Mali',cursive]">
            <span>1. มิติจำนวน (Counts)</span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-xs text-stone-500 font-medium block">ผู้ได้รับการคัดกรองทั้งหมด</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-black text-stone-900 font-['Mali',cursive]">
                  {stats.totalCount}
                </span>
                <span className="text-xs font-bold text-stone-500">คน</span>
              </div>
            </div>

            <div className="pt-2 border-t border-amber-200/80 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/80 p-2 rounded-2xl border border-amber-200/80">
                <span className="text-stone-500 block text-[10px]">⚠️ เสี่ยงสูง</span>
                <span className="font-extrabold text-orange-600 text-sm font-['Mali',cursive]">
                  {stats.highRiskCount} คน
                </span>
              </div>
              <div className="bg-white/80 p-2 rounded-2xl border border-amber-200/80">
                <span className="text-stone-500 block text-[10px]">🍺 ดื่มแอลกอฮอล์</span>
                <span className="font-extrabold text-amber-900 text-sm font-['Mali',cursive]">
                  {stats.alcoholDrinkersCount} คน
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: ค่าเฉลี่ย (Averages / Means) */}
        <div
          id="kpi-avg-card"
          className="relative bg-gradient-to-br from-yellow-50/90 via-amber-50/90 to-yellow-100/60 rounded-3xl p-5 border-2 border-amber-300/80 shadow-xs hover:shadow-md transition-all duration-200 group"
        >
          <div className="absolute top-3 right-3 w-9 h-9 rounded-2xl bg-yellow-200 text-amber-950 flex items-center justify-center text-base shadow-2xs group-hover:rotate-12 transition-transform">
            🥑
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 font-['Mali',cursive]">
            <span>2. มิติค่าเฉลี่ย (Mean)</span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-xs text-stone-500 font-medium block">ค่าดัชนีมวลกายเฉลี่ย (Avg BMI)</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-black text-stone-900 font-['Mali',cursive]">
                  {stats.avgBmi}
                </span>
                <span className="text-xs font-bold text-stone-500">kg/m²</span>
              </div>
            </div>

            <div className="pt-2 border-t border-amber-200/80 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/80 p-2 rounded-2xl border border-amber-200/80">
                <span className="text-stone-500 block text-[10px]">🩸 น้ำตาลเฉลี่ย</span>
                <span className="font-extrabold text-amber-900 text-sm font-['Mali',cursive]">
                  {stats.avgSugar} <span className="text-[10px] font-normal">mg/dL</span>
                </span>
              </div>
              <div className="bg-white/80 p-2 rounded-2xl border border-amber-200/80">
                <span className="text-stone-500 block text-[10px]">💓 ความดันเฉลี่ย</span>
                <span className="font-extrabold text-amber-900 text-sm font-['Mali',cursive]">
                  {stats.avgSbp}/{stats.avgDbp}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: ค่าต่ำสุด - สูงสุด (Min - Max Range) */}
        <div
          id="kpi-minmax-card"
          className="relative bg-gradient-to-br from-amber-50/90 via-orange-50/70 to-amber-100/60 rounded-3xl p-5 border-2 border-amber-300/80 shadow-xs hover:shadow-md transition-all duration-200 group"
        >
          <div className="absolute top-3 right-3 w-9 h-9 rounded-2xl bg-amber-200 text-amber-950 flex items-center justify-center text-base shadow-2xs group-hover:rotate-12 transition-transform">
            🎯
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 font-['Mali',cursive]">
            <span>3. ค่าต่ำสุด-สูงสุด (Min-Max)</span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-xs text-stone-500 font-medium block">ช่วงระดับน้ำตาลในเลือด (Sugar)</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-stone-900 font-['Mali',cursive]">
                  {stats.minSugar} - {stats.maxSugar}
                </span>
                <span className="text-xs font-bold text-stone-500">mg/dL</span>
              </div>
            </div>

            <div className="pt-2 border-t border-amber-200/80 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/80 p-2 rounded-2xl border border-amber-200/80">
                <span className="text-stone-500 block text-[10px]">ช่วงอายุ</span>
                <span className="font-extrabold text-stone-800 text-sm font-['Mali',cursive]">
                  {stats.minAge} - {stats.maxAge} ปี
                </span>
              </div>
              <div className="bg-white/80 p-2 rounded-2xl border border-amber-200/80">
                <span className="text-stone-500 block text-[10px]">ช่วง BMI</span>
                <span className="font-extrabold text-stone-800 text-sm font-['Mali',cursive]">
                  {stats.minBmi} - {stats.maxBmi}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 4: สัดส่วนและร้อยละ (Proportion & Percentage) */}
        <div
          id="kpi-proportion-card"
          className="relative bg-gradient-to-br from-yellow-50/90 via-emerald-50/60 to-amber-100/60 rounded-3xl p-5 border-2 border-amber-300/80 shadow-xs hover:shadow-md transition-all duration-200 group"
        >
          <div className="absolute top-3 right-3 w-9 h-9 rounded-2xl bg-yellow-200 text-amber-950 flex items-center justify-center text-base shadow-2xs group-hover:rotate-12 transition-transform">
            🌻
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 font-['Mali',cursive]">
            <span>4. สัดส่วนและร้อยละ (%)</span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-xs text-stone-500 font-medium block">ร้อยละผู้มีความเสี่ยงสูง</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-black text-orange-600 font-['Mali',cursive]">
                  {stats.highRiskPercent}%
                </span>
                <span className="text-xs font-bold text-stone-500">ของกลุ่มที่เลือก</span>
              </div>
            </div>

            <div className="pt-2 border-t border-amber-200/80 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/80 p-2 rounded-2xl border border-amber-200/80">
                <span className="text-stone-500 block text-[10px]">อัตราดื่มสุรา</span>
                <span className="font-extrabold text-amber-800 text-sm font-['Mali',cursive]">
                  {stats.alcoholDrinkersPercent}%
                </span>
              </div>
              <div className="bg-white/80 p-2 rounded-2xl border border-amber-200/80">
                <span className="text-stone-500 block text-[10px]">อัตราไม่ออกกำลังกาย</span>
                <span className="font-extrabold text-rose-600 text-sm font-['Mali',cursive]">
                  {stats.nonExercisersPercent}%
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
