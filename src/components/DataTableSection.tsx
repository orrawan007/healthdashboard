import React, { useState, useMemo } from 'react';
import { HealthRecord } from '../types';
import {
  Download,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Eye,
  X,
  AlertTriangle,
  Heart,
  Scale,
  Activity,
  Wine,
  Dumbbell,
  CheckCircle,
  Sparkles,
  Award,
} from 'lucide-react';

interface DataTableSectionProps {
  records: HealthRecord[];
}

type SortField = 'id' | 'screeningDate' | 'age' | 'gender' | 'area' | 'bmi' | 'sugar' | 'sbp' | 'alcohol' | 'exercise' | 'riskScore' | 'riskLevel';
type SortOrder = 'asc' | 'desc';

export const DataTableSection: React.FC<DataTableSectionProps> = ({ records }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('riskScore');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);

  // Filter with local search
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const term = searchTerm.toLowerCase().trim();
      if (!term) return true;
      return (
        r.id.toLowerCase().includes(term) ||
        r.area.toLowerCase().includes(term) ||
        r.gender.toLowerCase().includes(term) ||
        r.riskLevel.toLowerCase().includes(term) ||
        r.alcohol.toLowerCase().includes(term) ||
        r.exercise.toLowerCase().includes(term) ||
        String(r.age).includes(term)
      );
    });
  }, [records, searchTerm]);

  // Sort
  const sortedRecords = useMemo(() => {
    return [...filteredRecords].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === 'riskLevel') {
        const rank: Record<string, number> = { สูง: 3, ปานกลาง: 2, ต่ำ: 1 };
        aVal = rank[String(aVal)] || 0;
        bVal = rank[String(bVal)] || 0;
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredRecords, sortField, sortOrder]);

  // Pagination
  const totalPages = pageSize === -1 ? 1 : Math.ceil(sortedRecords.length / pageSize);
  const paginatedRecords = useMemo(() => {
    if (pageSize === -1) return sortedRecords;
    const start = (currentPage - 1) * pageSize;
    return sortedRecords.slice(start, start + pageSize);
  }, [sortedRecords, currentPage, pageSize]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const exportCsv = () => {
    const headers = [
      'รหัสบุคคล',
      'วันที่คัดกรอง',
      'พื้นที่',
      'เพศ',
      'อายุ',
      'ส่วนสูง_cm',
      'น้ำหนัก_kg',
      'BMI',
      'SBP_mmHg',
      'DBP_mmHg',
      'ชีพจร_bpm',
      'น้ำตาล_mg_dL',
      'สูบบุหรี่',
      'ดื่มแอลกอฮอล์',
      'การออกกำลังกาย',
      'เบาหวาน_คัดกรอง',
      'ความดันโลหิตสูง_คัดกรอง',
      'คะแนนความเสี่ยง',
      'ระดับความเสี่ยง',
      'เดือน',
    ];

    const rows = sortedRecords.map(r => [
      r.id,
      r.screeningDate,
      r.area,
      r.gender,
      r.age,
      r.height,
      r.weight,
      r.bmi,
      r.sbp,
      r.dbp,
      r.pulse,
      r.sugar,
      r.smoking,
      r.alcohol,
      r.exercise,
      r.diabetesScreening,
      r.hypertensionScreening,
      r.riskScore,
      r.riskLevel,
      r.month,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `alcohol_health_risk_records_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Conditional Formatting colors:
  // "ช่วยไฮไลท์สีส้มเมื่อมีความเสี่ยงสูง ไฮไลท์สีเหลืองเมื่อมีความเสี่ยงปานกลางและไฮไลท์สีเขียวเมื่อมีความเสี่ยงต่ำ"
  const getRowRiskStyles = (risk: string) => {
    if (risk === 'สูง') {
      return {
        rowBg: 'bg-orange-50/80 hover:bg-orange-100/90 transition-colors',
        badge: 'bg-orange-200 text-orange-950 font-bold border-2 border-orange-300 shadow-2xs',
        dot: 'bg-orange-500',
        emoji: '🟠',
      };
    }
    if (risk === 'ปานกลาง') {
      return {
        rowBg: 'bg-yellow-50/80 hover:bg-yellow-100/90 transition-colors',
        badge: 'bg-yellow-200 text-yellow-950 font-bold border-2 border-yellow-300 shadow-2xs',
        dot: 'bg-yellow-500',
        emoji: '🟡',
      };
    }
    return {
      rowBg: 'bg-emerald-50/70 hover:bg-emerald-100/80 transition-colors',
      badge: 'bg-emerald-200 text-emerald-950 font-bold border-2 border-emerald-300 shadow-2xs',
      dot: 'bg-emerald-500',
      emoji: '🟢',
    };
  };

  return (
    <div className="bg-white/95 rounded-3xl border-2 border-amber-200 p-5 sm:p-6 shadow-xs space-y-4">
      
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-dashed border-amber-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📋</span>
            <h3 className="font-extrabold text-stone-900 text-base sm:text-lg font-['Mali',cursive]">
              ตารางข้อมูลสุขภาพรายบุคคลสุดน่ารัก (Individual Health Records)
            </h3>
          </div>
          <p className="text-xs text-stone-500 font-medium mt-1 flex flex-wrap items-center gap-1.5">
            <span>ไฮไลท์สีตามระดับความเสี่ยง:</span>
            <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-900 font-bold border border-orange-300 text-[11px]">🟠 สีส้ม = เสี่ยงสูง</span>
            <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-900 font-bold border border-yellow-300 text-[11px]">🟡 สีเหลือง = เสี่ยงปานกลาง</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold border border-emerald-300 text-[11px]">🟢 สีเขียว = เสี่ยงต่ำ</span>
          </p>
        </div>

        {/* Right side: Search, page size, Export */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="🔍 ค้นหาในตาราง..."
              className="pl-8 pr-3 py-1.5 text-xs rounded-2xl border-2 border-amber-200 bg-amber-50/50 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 w-44 font-medium"
            />
          </div>

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="text-xs bg-white rounded-2xl border-2 border-amber-200 px-3 py-1.5 text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium cursor-pointer"
          >
            <option value={10}>10 รายการ/หน้า</option>
            <option value={20}>20 รายการ/หน้า</option>
            <option value={-1}>ทั้งหมด ({sortedRecords.length})</option>
          </select>

          <button
            id="export-csv-btn"
            onClick={exportCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl text-xs font-bold text-amber-950 bg-amber-300 hover:bg-amber-400 active:scale-95 transition-all shadow-xs border border-amber-400 cursor-pointer font-['Mali',cursive]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ดาวน์โหลด CSV ✨</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border-2 border-amber-200 shadow-2xs bg-white">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-amber-200/70 text-stone-900 border-b-2 border-amber-300 font-bold select-none font-['Mali',cursive]">
              
              <th onClick={() => handleSort('id')} className="py-3 px-3 cursor-pointer hover:bg-amber-300/60">
                <div className="flex items-center gap-1">
                  <span>รหัสบุคคล 🆔</span>
                  {sortField === 'id' ? (sortOrder === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />) : <ArrowUpDown className="w-3 h-3 text-stone-400" />}
                </div>
              </th>

              <th onClick={() => handleSort('gender')} className="py-3 px-2 cursor-pointer hover:bg-amber-300/60">
                <div className="flex items-center gap-1">
                  <span>เพศ 👫</span>
                  {sortField === 'gender' ? (sortOrder === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />) : <ArrowUpDown className="w-3 h-3 text-stone-400" />}
                </div>
              </th>

              <th onClick={() => handleSort('age')} className="py-3 px-2 cursor-pointer hover:bg-amber-300/60">
                <div className="flex items-center gap-1">
                  <span>อายุ 🎂</span>
                  {sortField === 'age' ? (sortOrder === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />) : <ArrowUpDown className="w-3 h-3 text-stone-400" />}
                </div>
              </th>

              <th onClick={() => handleSort('screeningDate')} className="py-3 px-3 cursor-pointer hover:bg-amber-300/60">
                <div className="flex items-center gap-1">
                  <span>วันที่ตรวจ 🗓️</span>
                  {sortField === 'screeningDate' ? (sortOrder === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />) : <ArrowUpDown className="w-3 h-3 text-stone-400" />}
                </div>
              </th>

              <th onClick={() => handleSort('alcohol')} className="py-3 px-2.5 cursor-pointer hover:bg-amber-300/60">
                <div className="flex items-center gap-1">
                  <span>ดื่มแอลกอฮอล์ 🍺</span>
                  {sortField === 'alcohol' ? (sortOrder === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />) : <ArrowUpDown className="w-3 h-3 text-stone-400" />}
                </div>
              </th>

              <th onClick={() => handleSort('exercise')} className="py-3 px-2.5 cursor-pointer hover:bg-amber-300/60">
                <div className="flex items-center gap-1">
                  <span>ออกกำลังกาย 🏃</span>
                  {sortField === 'exercise' ? (sortOrder === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />) : <ArrowUpDown className="w-3 h-3 text-stone-400" />}
                </div>
              </th>

              <th onClick={() => handleSort('bmi')} className="py-3 px-2 cursor-pointer hover:bg-amber-300/60">
                <div className="flex items-center gap-1">
                  <span>BMI 🥑</span>
                  {sortField === 'bmi' ? (sortOrder === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />) : <ArrowUpDown className="w-3 h-3 text-stone-400" />}
                </div>
              </th>

              <th onClick={() => handleSort('sbp')} className="py-3 px-2 cursor-pointer hover:bg-amber-300/60">
                <div className="flex items-center gap-1">
                  <span>ความดัน 💓</span>
                  {sortField === 'sbp' ? (sortOrder === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />) : <ArrowUpDown className="w-3 h-3 text-stone-400" />}
                </div>
              </th>

              <th onClick={() => handleSort('sugar')} className="py-3 px-2 cursor-pointer hover:bg-amber-300/60">
                <div className="flex items-center gap-1">
                  <span>น้ำตาล 🩸</span>
                  {sortField === 'sugar' ? (sortOrder === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />) : <ArrowUpDown className="w-3 h-3 text-stone-400" />}
                </div>
              </th>

              <th onClick={() => handleSort('riskScore')} className="py-3 px-2 text-center cursor-pointer hover:bg-amber-300/60">
                <div className="flex items-center justify-center gap-1">
                  <span>คะแนน 🎯</span>
                  {sortField === 'riskScore' ? (sortOrder === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />) : <ArrowUpDown className="w-3 h-3 text-stone-400" />}
                </div>
              </th>

              <th onClick={() => handleSort('riskLevel')} className="py-3 px-3 cursor-pointer hover:bg-amber-300/60 text-center">
                <div className="flex items-center justify-center gap-1">
                  <span>ระดับเสี่ยง ⚠️</span>
                  {sortField === 'riskLevel' ? (sortOrder === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />) : <ArrowUpDown className="w-3 h-3 text-stone-400" />}
                </div>
              </th>

              <th className="py-3 px-2 text-center">การ์ด 🧸</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-200/60">
            {paginatedRecords.length === 0 ? (
              <tr>
                <td colSpan={12} className="py-8 text-center text-stone-500 font-medium">
                  ไม่พบข้อมูลที่ตรงกับตัวกรอง ลองกด &quot;ล้างตัวกรอง&quot; ดูน้า 🐥
                </td>
              </tr>
            ) : (
              paginatedRecords.map((r) => {
                const styles = getRowRiskStyles(r.riskLevel);
                return (
                  <tr
                    key={r.id}
                    id={`table-row-${r.id}`}
                    className={`${styles.rowBg} cursor-pointer transition-colors`}
                    onClick={() => setSelectedRecord(r)}
                  >
                    <td className="py-2.5 px-3 font-bold text-stone-900 font-mono">
                      {r.id}
                    </td>

                    <td className="py-2.5 px-2 text-stone-700">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${r.gender === 'ชาย' ? 'bg-blue-100 text-blue-900' : 'bg-pink-100 text-pink-900'}`}>
                        <span>{r.gender === 'ชาย' ? '👦 ชาย' : '👧 หญิง'}</span>
                      </span>
                    </td>

                    <td className="py-2.5 px-2 text-stone-800 font-semibold">
                      {r.age} ปี
                    </td>

                    <td className="py-2.5 px-3 text-stone-600 whitespace-nowrap font-mono text-[11px]">
                      {r.screeningDate}
                    </td>

                    <td className="py-2.5 px-2.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          r.alcohol === 'ดื่ม'
                            ? 'bg-amber-200 text-amber-950 border border-amber-300'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {r.alcohol === 'ดื่ม' ? '🍺 ดื่มสุรา' : '🍵 ไม่ดื่ม'}
                      </span>
                    </td>

                    <td className="py-2.5 px-2.5 text-stone-700">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          r.exercise === 'สม่ำเสมอ'
                            ? 'bg-emerald-100 text-emerald-900'
                            : r.exercise === 'บางครั้ง'
                            ? 'bg-yellow-100 text-yellow-900'
                            : 'bg-rose-100 text-rose-900'
                        }`}
                      >
                        {r.exercise === 'สม่ำเสมอ' ? '🏃 สม่ำเสมอ' : r.exercise === 'บางครั้ง' ? '🚶 บางครั้ง' : '🛋️ ไม่ออกกำลัง'}
                      </span>
                    </td>

                    <td className="py-2.5 px-2 font-mono font-bold text-stone-800">
                      <span className={r.bmi >= 25 ? 'text-amber-900' : ''}>
                        {r.bmi}
                      </span>
                    </td>

                    <td className="py-2.5 px-2 font-mono text-stone-700">
                      <span className={r.sbp >= 140 ? 'text-rose-700 font-bold' : ''}>
                        {r.sbp}/{r.dbp}
                      </span>
                    </td>

                    <td className="py-2.5 px-2 font-mono text-stone-700">
                      <span className={r.sugar >= 126 ? 'text-rose-700 font-bold' : r.sugar >= 100 ? 'text-amber-800 font-semibold' : ''}>
                        {r.sugar}
                      </span>
                    </td>

                    <td className="py-2.5 px-2 text-center font-black text-stone-800">
                      <span className="w-6 h-6 inline-flex items-center justify-center rounded-full bg-white/90 border border-amber-300 text-xs font-['Mali',cursive]">
                        {r.riskScore}
                      </span>
                    </td>

                    {/* Conditional Formatting Highlighted Badge */}
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs ${styles.badge} font-['Mali',cursive]`}>
                        <span>{styles.emoji}</span>
                        <span>เสี่ยง{r.riskLevel}</span>
                      </span>
                    </td>

                    <td className="py-2.5 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedRecord(r)}
                        title="ดูบัตรประวัติสุขภาพ"
                        className="p-1.5 rounded-xl bg-white hover:bg-amber-200 text-stone-700 hover:text-amber-950 transition-all cursor-pointer border border-amber-300 shadow-2xs hover:scale-110"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {pageSize !== -1 && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-600 pt-2 gap-2">
          <span className="font-medium">
            แสดงรายการที่ {(currentPage - 1) * pageSize + 1} ถึง{' '}
            {Math.min(currentPage * pageSize, sortedRecords.length)} จากทั้งหมด {sortedRecords.length} คน ✨
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-xl border-2 border-amber-200 bg-white hover:bg-amber-100 disabled:opacity-40 cursor-pointer font-bold text-stone-800 font-['Mali',cursive]"
            >
              ย้อนกลับ
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-7 h-7 rounded-xl text-xs font-bold cursor-pointer font-['Mali',cursive] ${
                  currentPage === idx + 1
                    ? 'bg-amber-400 text-stone-900 border-2 border-amber-400 shadow-2xs'
                    : 'bg-white border-2 border-amber-200 hover:bg-amber-100 text-stone-700'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-xl border-2 border-amber-200 bg-white hover:bg-amber-100 disabled:opacity-40 cursor-pointer font-bold text-stone-800 font-['Mali',cursive]"
            >
              ถัดไป
            </button>
          </div>
        </div>
      )}

      {/* Cute Health Passport / Record Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#FFFDF3] rounded-3xl border-3 border-amber-300 shadow-2xl max-w-lg w-full p-6 relative overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b-2 border-dashed border-amber-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-300 text-amber-950 flex items-center justify-center font-bold text-2xl shadow-sm">
                  {selectedRecord.gender === 'ชาย' ? '👦' : '👧'}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-stone-900 font-['Mali',cursive] flex items-center gap-1.5">
                    <span>บัตรประวัติสุขภาพ: {selectedRecord.id}</span>
                    <span className="text-sm">✨</span>
                  </h4>
                  <p className="text-xs text-stone-500 font-medium">
                    พื้นที่: {selectedRecord.area} | วันที่ตรวจ: {selectedRecord.screeningDate}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="w-8 h-8 rounded-full bg-amber-200 hover:bg-amber-300 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Risk Banner */}
            <div
              className={`mt-4 p-3.5 rounded-2xl flex items-center justify-between border-2 ${
                selectedRecord.riskLevel === 'สูง'
                  ? 'bg-orange-100 border-orange-300 text-orange-950'
                  : selectedRecord.riskLevel === 'ปานกลาง'
                  ? 'bg-yellow-100 border-yellow-300 text-yellow-950'
                  : 'bg-emerald-100 border-emerald-300 text-emerald-950'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">
                  {selectedRecord.riskLevel === 'สูง' ? '🚨' : selectedRecord.riskLevel === 'ปานกลาง' ? '⚠️' : '💖'}
                </span>
                <div>
                  <p className="text-xs font-medium">การประเมินความเสี่ยง</p>
                  <p className="text-base font-bold font-['Mali',cursive]">
                    ความเสี่ยงระดับ{selectedRecord.riskLevel}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black font-['Mali',cursive]">{selectedRecord.riskScore}</span>
                <span className="text-xs font-bold"> / 7 คะแนน</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
              <div className="bg-white p-3 rounded-2xl border-2 border-amber-200">
                <span className="text-stone-500 block mb-0.5 font-medium">เพศ / อายุ</span>
                <span className="font-bold text-stone-900 text-sm font-['Mali',cursive]">
                  {selectedRecord.gender} ({selectedRecord.age} ปี)
                </span>
              </div>
              <div className="bg-white p-3 rounded-2xl border-2 border-amber-200">
                <span className="text-stone-500 block mb-0.5 font-medium">ส่วนสูง / นน. / BMI</span>
                <span className="font-bold text-stone-900 text-sm font-['Mali',cursive]">
                  {selectedRecord.height}cm / {selectedRecord.weight}kg (<strong>{selectedRecord.bmi}</strong>)
                </span>
              </div>
              <div className="bg-white p-3 rounded-2xl border-2 border-amber-200">
                <span className="text-stone-500 block mb-0.5 font-medium">ความดันโลหิต</span>
                <span className="font-bold text-stone-900 text-sm font-['Mali',cursive]">
                  {selectedRecord.sbp} / {selectedRecord.dbp} mmHg
                </span>
              </div>
              <div className="bg-white p-3 rounded-2xl border-2 border-amber-200">
                <span className="text-stone-500 block mb-0.5 font-medium">น้ำตาล / ชีพจร</span>
                <span className="font-bold text-stone-900 text-sm font-['Mali',cursive]">
                  {selectedRecord.sugar} mg/dL | {selectedRecord.pulse} bpm
                </span>
              </div>
            </div>

            {/* Behaviors */}
            <div className="mt-3 p-3.5 bg-amber-50 rounded-2xl border-2 border-amber-200 space-y-2 text-xs font-medium">
              <div className="flex items-center justify-between">
                <span className="text-stone-600 flex items-center gap-1.5">
                  <span>🍺 การดื่มแอลกอฮอล์:</span>
                </span>
                <span className="font-bold text-stone-900 font-['Mali',cursive]">
                  {selectedRecord.alcohol === 'ดื่ม' ? 'ดื่มแอลกอฮอล์' : 'ไม่ดื่มแอลกอฮอล์ 🍵'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-600 flex items-center gap-1.5">
                  <span>🏃‍♀️ การออกกำลังกาย:</span>
                </span>
                <span className="font-bold text-stone-900 font-['Mali',cursive]">
                  {selectedRecord.exercise}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-600">🌿 การสูบบุหรี่:</span>
                <span className="font-bold text-stone-900 font-['Mali',cursive]">{selectedRecord.smoking}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-600">🩸 คัดกรองเบาหวาน:</span>
                <span className="font-bold text-stone-900 font-['Mali',cursive]">{selectedRecord.diabetesScreening}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-600">💓 คัดกรองความดันสูง:</span>
                <span className="font-bold text-stone-900 font-['Mali',cursive]">{selectedRecord.hypertensionScreening}</span>
              </div>
            </div>

            {/* Close button */}
            <div className="mt-4 pt-3 border-t-2 border-dashed border-amber-200 flex justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-5 py-2 rounded-2xl bg-amber-300 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors cursor-pointer font-['Mali',cursive] shadow-2xs"
              >
                ปิดหน้าต่าง ✨
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
