import React, { useState, useEffect, useMemo } from 'react';
import { HealthRecord, FilterState, ActiveTab } from './types';
import { INITIAL_HEALTH_RECORDS, fetchSheetData, GOOGLE_SHEET_ID } from './data/defaultData';
import { computeSummaryStats } from './utils/analytics';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { FilterBar } from './components/FilterBar';
import { KpiCards } from './components/KpiCards';
import { RiskAndTrendCharts } from './components/RiskAndTrendCharts';
import { BehaviorAndCorrelationCharts } from './components/BehaviorAndCorrelationCharts';
import { DataTableSection } from './components/DataTableSection';
import { Recommendations } from './components/Recommendations';
import {
  Sparkles,
  Wine,
  Activity,
  Heart,
  TrendingUp,
  AlertTriangle,
  Info,
  ChevronRight,
} from 'lucide-react';

export default function App() {
  const [records, setRecords] = useState<HealthRecord[]>(INITIAL_HEALTH_RECORDS);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('21/09/2026');
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  // Core Filter state (all 4 requested filters + area and search query)
  const [filters, setFilters] = useState<FilterState>({
    alcohol: 'ทั้งหมด',
    exercise: 'ทั้งหมด',
    riskLevel: 'ทั้งหมด',
    gender: 'ทั้งหมด',
    area: 'ทั้งหมด',
    searchQuery: '',
  });

  // Fetch latest data on load
  const loadSheetData = async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchSheetData(GOOGLE_SHEET_ID);
      setRecords(data);
      const now = new Date();
      setLastUpdated(
        now.toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      );
    } catch (e) {
      console.error('Failed to load Google Sheet data:', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadSheetData();
  }, []);

  // Filter records based on active filters
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      // 1. ดื่มแอลกอฮอล์
      if (filters.alcohol !== 'ทั้งหมด' && r.alcohol !== filters.alcohol) {
        return false;
      }
      // 2. การออกกำลังกาย
      if (filters.exercise !== 'ทั้งหมด' && r.exercise !== filters.exercise) {
        return false;
      }
      // 3. ระดับความเสี่ยง
      if (filters.riskLevel !== 'ทั้งหมด' && r.riskLevel !== filters.riskLevel) {
        return false;
      }
      // 4. เพศ
      if (filters.gender !== 'ทั้งหมด' && r.gender !== filters.gender) {
        return false;
      }
      // 5. พื้นที่
      if (filters.area !== 'ทั้งหมด' && r.area !== filters.area) {
        return false;
      }
      // 6. ข้อความค้นหา
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const match =
          r.id.toLowerCase().includes(query) ||
          r.area.toLowerCase().includes(query) ||
          r.gender.toLowerCase().includes(query) ||
          r.riskLevel.toLowerCase().includes(query);
        if (!match) return false;
      }

      return true;
    });
  }, [records, filters]);

  // Compute stats for KPI cards
  const stats = useMemo(() => {
    return computeSummaryStats(filteredRecords);
  }, [filteredRecords]);

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-stone-800 flex flex-col font-['Prompt',sans-serif]">
      
      {/* 1. ส่วนหัวและระบบควบคุม (Header) */}
      <Header
        onRefresh={loadSheetData}
        isRefreshing={isRefreshing}
        lastUpdated={lastUpdated}
        totalRecords={records.length}
      />

      {/* 5. ระบบนำทาง (Navigation Controls) */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filteredCount={filteredRecords.length}
        totalCount={records.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* 1. ระบบควบคุมตัวกรอง (Filters: 1.ดื่มแอลกอฮอลล์ 2.การออกกำลังกาย 3.ระดับความเสี่ยง 4.เพศ) */}
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          totalRecords={records.length}
          filteredCount={filteredRecords.length}
        />

        {/* Dynamic Tab Views */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* 2. การสรุปข้อมูลสำคัญ (KPI Cards / Summary Cards: จำนวน, ค่าเฉลี่ย, ค่าต่ำสุด-สูงสุด, สัดส่วน, ร้อยละ) */}
            <KpiCards stats={stats} />

            {/* Quick Executive Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              <div className="bg-white/95 p-5 rounded-3xl border-2 border-orange-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center gap-2 text-stone-900 font-bold mb-2 text-sm sm:text-base font-['Mali',cursive]">
                    <div className="w-9 h-9 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-700 shadow-2xs">
                      🚨
                    </div>
                    <span>กลุ่มเสี่ยงสูง (High Risk Alert)</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium">
                    มีผู้ที่อยู่ในกลุ่มความเสี่ยงสูง <strong>{stats.highRiskCount} คน ({stats.highRiskPercent}%)</strong> ของกลุ่มตัวอย่างที่เลือก โดยทุกรายมีคะแนนความเสี่ยงตั้งแต่ 4 ถึง 7 คะแนน
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t-2 border-dashed border-orange-100 flex justify-between items-center text-xs">
                  <span className="text-stone-500 font-medium">ระดับเฝ้าระวังสูงสุด:</span>
                  <button
                    onClick={() => {
                      setFilters(prev => ({ ...prev, riskLevel: 'สูง' }));
                      setActiveTab('data_table');
                    }}
                    className="font-bold text-orange-800 hover:text-orange-950 inline-flex items-center gap-1 cursor-pointer font-['Mali',cursive]"
                  >
                    <span>ดูรายชื่อเสี่ยงสูง 🔍</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="bg-white/95 p-5 rounded-3xl border-2 border-yellow-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center gap-2 text-stone-900 font-bold mb-2 text-sm sm:text-base font-['Mali',cursive]">
                    <div className="w-9 h-9 rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-800 shadow-2xs">
                      🍺
                    </div>
                    <span>พฤติกรรมการดื่มแอลกอฮอล์</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium">
                    มีผู้ที่ดื่มแอลกอฮอล์ <strong>{stats.alcoholDrinkersCount} คน ({stats.alcoholDrinkersPercent}%)</strong> ซึ่งพบว่ามีแนวโน้มความเสี่ยงโรคเบาหวานและความดันโลหิตสูงสูงกว่าผู้ไม่ดื่มอย่างมีนัยสำคัญ
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t-2 border-dashed border-yellow-100 flex justify-between items-center text-xs">
                  <span className="text-stone-500 font-medium">วิเคราะห์พฤติกรรม:</span>
                  <button
                    onClick={() => setActiveTab('behavior_correlation')}
                    className="font-bold text-amber-900 hover:text-amber-950 inline-flex items-center gap-1 cursor-pointer font-['Mali',cursive]"
                  >
                    <span>ดูกราฟพฤติกรรม 📊</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="bg-white/95 p-5 rounded-3xl border-2 border-emerald-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center gap-2 text-stone-900 font-bold mb-2 text-sm sm:text-base font-['Mali',cursive]">
                    <div className="w-9 h-9 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 shadow-2xs">
                      🏃‍♀️
                    </div>
                    <span>การออกกำลังกายช่วยลดความเสี่ยง</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium">
                    ผู้ที่ออกกำลังกายสม่ำเสมอทั้งหมดอยู่ในกลุ่ม <strong>ความเสี่ยงต่ำ</strong> โดยมีค่าเฉลี่ย BMI ({stats.avgBmi}) และระดับน้ำตาล ({stats.avgSugar} mg/dL) อยู่ในเกณฑ์ปลอดภัย สดใสแข็งแรงมาก!
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t-2 border-dashed border-emerald-100 flex justify-between items-center text-xs">
                  <span className="text-stone-500 font-medium">คำแนะนำสุขภาพ:</span>
                  <button
                    onClick={() => setActiveTab('recommendations')}
                    className="font-bold text-emerald-900 hover:text-emerald-950 inline-flex items-center gap-1 cursor-pointer font-['Mali',cursive]"
                  >
                    <span>ดูมาตรการส่งเสริม 🌻</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Quick Chart Preview in Overview */}
            <div className="mt-6">
              <RiskAndTrendCharts records={filteredRecords} />
            </div>
          </div>
        )}

        {/* 3. การวิเคราะห์ความเสี่ยงและแนวโน้ม (Risk & Trend Visualizations) */}
        {activeTab === 'risk_trend' && (
          <div className="animate-in fade-in duration-200">
            <RiskAndTrendCharts records={filteredRecords} />
          </div>
        )}

        {/* 3. พฤติกรรมสุขภาพและความสัมพันธ์ (Behavior & Correlations) */}
        {activeTab === 'behavior_correlation' && (
          <div className="animate-in fade-in duration-200">
            <BehaviorAndCorrelationCharts records={filteredRecords} />
          </div>
        )}

        {/* 4. ส่วนรายละเอียดเชิงลึก (Data Table / Detail View with Conditional Formatting) */}
        {activeTab === 'data_table' && (
          <div className="animate-in fade-in duration-200">
            <DataTableSection records={filteredRecords} />
          </div>
        )}

        {/* 5. ข้อเสนอแนะเชิงนโยบายและสุขภาพ (Recommendations) */}
        {activeTab === 'recommendations' && (
          <div className="animate-in fade-in duration-200">
            <Recommendations records={filteredRecords} />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t-2 border-dashed border-amber-300/80 bg-gradient-to-r from-amber-100/95 via-yellow-100/90 to-amber-50/95 py-6 text-stone-700 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-300 text-amber-950 flex items-center justify-center font-bold text-lg shadow-2xs">
              🐥
            </div>
            <div>
              <p className="font-bold text-stone-900 font-['Mali',cursive] text-sm">
                การวิเคราะห์สุขภาพและการประเมินความเสี่ยงจากการดื่มแอลกอฮอลล์ 💛
              </p>
              <p className="text-xs text-stone-500 font-medium">
                แดชบอร์ดข้อมูลสุขภาพสำหรับงานสาธารณสุขและการสร้างเสริมสุขภาพชุมชน
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-right">
            <div className="px-3.5 py-1.5 rounded-2xl bg-white/80 border border-amber-300 text-stone-800 shadow-2xs font-['Mali',cursive]">
              <span>จัดทำโดย: </span>
              <strong className="text-stone-950 text-sm">นางสาวอรวรรณ จิ๋วปัญญา ✨</strong>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
