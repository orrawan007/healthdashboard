import React from 'react';
import { HealthRecord } from '../types';
import { getBehaviorMatrix } from '../utils/analytics';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  ReferenceLine,
} from 'recharts';
import { Wine, Dumbbell, Cigarette, Layers, Sparkles, Scale, HeartPulse } from 'lucide-react';

interface BehaviorAndCorrelationChartsProps {
  records: HealthRecord[];
}

export const BehaviorAndCorrelationCharts: React.FC<BehaviorAndCorrelationChartsProps> = ({ records }) => {
  const behaviorMatrix = getBehaviorMatrix(records);

  // Field 1: Alcohol data
  const alcoholData = [
    { name: 'ไม่ดื่มแอลกอฮอล์ 🍵', value: records.filter(r => r.alcohol === 'ไม่ดื่ม').length, color: '#4ADE80' },
    { name: 'ดื่มแอลกอฮอล์ 🍺', value: records.filter(r => r.alcohol === 'ดื่ม').length, color: '#FB923C' },
  ];

  // Field 2: Exercise data
  const exerciseData = [
    { name: 'สม่ำเสมอ 🏃‍♀️', value: records.filter(r => r.exercise === 'สม่ำเสมอ').length, color: '#22C55E' },
    { name: 'บางครั้ง 🚶', value: records.filter(r => r.exercise === 'บางครั้ง').length, color: '#FACC15' },
    { name: 'ไม่ออกกำลังกาย 🛋️', value: records.filter(r => r.exercise === 'ไม่ออกกำลังกาย').length, color: '#F87171' },
  ];

  // Field 3: Smoking data
  const smokingData = [
    { name: 'ไม่สูบบุหรี่ 🌿', value: records.filter(r => r.smoking === 'ไม่สูบ').length, color: '#86EFAC' },
    { name: 'สูบบุหรี่ 🚬', value: records.filter(r => r.smoking === 'สูบ').length, color: '#FB7185' },
  ];

  // Scatter points: BMI vs Sugar & SBP
  const scatterPoints = records.map(r => ({
    id: r.id,
    bmi: r.bmi,
    sugar: r.sugar,
    sbp: r.sbp,
    dbp: r.dbp,
    age: r.age,
    gender: r.gender,
    alcohol: r.alcohol,
    exercise: r.exercise,
    riskLevel: r.riskLevel,
    riskScore: r.riskScore,
    fillColor: r.riskLevel === 'สูง' ? '#EA580C' : r.riskLevel === 'ปานกลาง' ? '#CA8A04' : '#16A34A',
  }));

  const CustomScatterTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#FFFDF3] p-3 rounded-2xl border-2 border-amber-300 shadow-md text-xs space-y-1">
          <p className="font-bold text-stone-900 border-b border-amber-200 pb-1 font-['Mali',cursive]">
            🧸 บัตรบุคคล: {data.id} ({data.gender}, {data.age} ปี)
          </p>
          <p>ดัชนีมวลกาย (BMI): <span className="font-bold text-stone-800">{data.bmi}</span></p>
          <p>น้ำตาลในเลือด: <span className="font-bold text-amber-800">{data.sugar} mg/dL</span></p>
          <p>ความดันโลหิต: <span className="font-bold text-stone-800">{data.sbp}/{data.dbp} mmHg</span></p>
          <p>การดื่มแอลกอฮอล์: <span className="font-semibold">{data.alcohol === 'ดื่ม' ? '🍺 ดื่ม' : '🍵 ไม่ดื่ม'}</span></p>
          <p>การออกกำลังกาย: <span className="font-semibold">{data.exercise}</span></p>
          <div className="pt-1 flex items-center justify-between border-t border-amber-100">
            <span className="text-stone-500">ระดับความเสี่ยง:</span>
            <span
              className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                data.riskLevel === 'สูง'
                  ? 'bg-orange-100 text-orange-800 border border-orange-200'
                  : data.riskLevel === 'ปานกลาง'
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                  : 'bg-green-100 text-green-800 border border-green-200'
              }`}
            >
              เสี่ยง{data.riskLevel} ({data.riskScore} คะแนน)
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      
      {/* SECTION 1: Health Behavior (4 Fields) */}
      <div className="bg-white/95 rounded-3xl border-2 border-amber-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-3 border-b-2 border-dashed border-amber-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-200 text-amber-950 flex items-center justify-center text-lg shadow-2xs">
              🧃
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base sm:text-lg font-['Mali',cursive]">
                การวิเคราะห์พฤติกรรมสุขภาพ 4 มิติ (Health Behavior Analysis - 4 Fields)
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                1) การดื่มแอลกอฮอล์ 2) การออกกำลังกาย 3) การสูบบุหรี่ 4) พฤติกรรมร่วมกับระดับความเสี่ยง
              </p>
            </div>
          </div>
          <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 font-['Mali',cursive]">
            ครบ 4 Field พฤติกรรม 🥑
          </span>
        </div>

        {/* 3 Donut Cards for Fields 1, 2, 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          
          {/* Field 1: ดื่มแอลกอฮอล์ */}
          <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80 flex flex-col items-center">
            <div className="flex items-center gap-1.5 mb-1 font-bold text-stone-800 text-xs sm:text-sm font-['Mali',cursive]">
              <span>🍺 1. การดื่มแอลกอฮอล์</span>
            </div>
            <p className="text-[11px] text-stone-500 mb-2">ดื่มสุรา vs ไม่ดื่มสุรา</p>
            <div className="w-full h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={alcoholData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} innerRadius={35} paddingAngle={3}>
                    {alcoholData.map((e, idx) => (
                      <Cell key={`alc-${idx}`} fill={e.color} stroke="#FFF" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any, name: any) => [`${val} คน (${((+val / (records.length || 1)) * 100).toFixed(1)}%)`, name]}
                    contentStyle={{ backgroundColor: '#FFFDF3', borderRadius: '16px', border: '2px solid #FDE68A', fontSize: '11px', fontFamily: 'Mali' }}
                  />
                  <Legend verticalAlign="bottom" height={28} wrapperStyle={{ fontSize: '11px', fontFamily: 'Mali' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Field 2: การออกกำลังกาย */}
          <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80 flex flex-col items-center">
            <div className="flex items-center gap-1.5 mb-1 font-bold text-stone-800 text-xs sm:text-sm font-['Mali',cursive]">
              <span>🏃‍♀️ 2. การออกกำลังกาย</span>
            </div>
            <p className="text-[11px] text-stone-500 mb-2">ความสม่ำเสมอในการขยับร่างกาย</p>
            <div className="w-full h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={exerciseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} innerRadius={35} paddingAngle={3}>
                    {exerciseData.map((e, idx) => (
                      <Cell key={`ex-${idx}`} fill={e.color} stroke="#FFF" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any, name: any) => [`${val} คน (${((+val / (records.length || 1)) * 100).toFixed(1)}%)`, name]}
                    contentStyle={{ backgroundColor: '#FFFDF3', borderRadius: '16px', border: '2px solid #FDE68A', fontSize: '11px', fontFamily: 'Mali' }}
                  />
                  <Legend verticalAlign="bottom" height={28} wrapperStyle={{ fontSize: '11px', fontFamily: 'Mali' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Field 3: การสูบบุหรี่ */}
          <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80 flex flex-col items-center">
            <div className="flex items-center gap-1.5 mb-1 font-bold text-stone-800 text-xs sm:text-sm font-['Mali',cursive]">
              <span>🌿 3. การสูบบุหรี่</span>
            </div>
            <p className="text-[11px] text-stone-500 mb-2">พฤติกรรมการสูบบุหรี่</p>
            <div className="w-full h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={smokingData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} innerRadius={35} paddingAngle={3}>
                    {smokingData.map((e, idx) => (
                      <Cell key={`smk-${idx}`} fill={e.color} stroke="#FFF" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any, name: any) => [`${val} คน (${((+val / (records.length || 1)) * 100).toFixed(1)}%)`, name]}
                    contentStyle={{ backgroundColor: '#FFFDF3', borderRadius: '16px', border: '2px solid #FDE68A', fontSize: '11px', fontFamily: 'Mali' }}
                  />
                  <Legend verticalAlign="bottom" height={28} wrapperStyle={{ fontSize: '11px', fontFamily: 'Mali' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Field 4: พฤติกรรมร่วมกับระดับความเสี่ยง (Behavior Matrix) */}
        <div className="bg-amber-50/50 p-4 sm:p-5 rounded-2xl border border-amber-200/90">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5 font-['Mali',cursive]">
                <span>✨ 4. พฤติกรรมร่วมกับระดับความเสี่ยง (Alcohol & Exercise vs Risk)</span>
              </h4>
              <p className="text-xs text-stone-500 font-medium">
                เปรียบเทียบระดับความเสี่ยงของแต่ละคู่พฤติกรรม (ดื่ม/ไม่ดื่ม + ออกกำลังกาย)
              </p>
            </div>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={behaviorMatrix} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" vertical={false} />
                <XAxis dataKey="behavior" stroke="#78716C" fontSize={11} interval={0} angle={-8} textAnchor="end" height={45} />
                <YAxis stroke="#78716C" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFDF3', borderRadius: '16px', border: '2px solid #FDE68A', fontSize: '12px', fontFamily: 'Mali' }}
                />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', fontFamily: 'Mali' }} />
                <Bar dataKey="สูง" name="ความเสี่ยงสูง (คน)" fill="#FB923C" stackId="a" />
                <Bar dataKey="ปานกลาง" name="ความเสี่ยงปานกลาง (คน)" fill="#FACC15" stackId="a" />
                <Bar dataKey="ต่ำ" name="ความเสี่ยงต่ำ (คน)" fill="#4ADE80" stackId="a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 p-3.5 rounded-2xl bg-white border border-amber-200/90 text-xs text-stone-700 leading-relaxed font-medium">
            💡 <strong>ข้อค้นพบสำคัญน่ารักๆ:</strong> กลุ่มที่ <strong>&quot;ดื่มแอลกอฮอล์ + ไม่ออกกำลังกาย&quot;</strong> มีความเสี่ยงสูงแบบเต็ม 100%! ในขณะที่กลุ่มที่ <strong>&quot;ไม่ดื่ม + ออกกำลังกายสม่ำเสมอ&quot;</strong> ทุกคนมีความเสี่ยงต่ำ สุขภาพแข็งแรงสดใสมากๆ ค่ะ 🌻
          </div>
        </div>

      </div>

      {/* SECTION 2: Scatter Correlation (BMI vs Sugar & BMI vs Blood Pressure) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ความสัมพันธ์ระหว่าง BMI กับน้ำตาล */}
        <div className="bg-white/95 rounded-3xl border-2 border-amber-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-amber-100">
            <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-950 flex items-center justify-center font-bold text-sm">
              🥑
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm sm:text-base font-['Mali',cursive]">
                ความสัมพันธ์ระหว่าง BMI กับระดับน้ำตาล (BMI vs Blood Sugar)
              </h4>
              <p className="text-xs text-stone-500 font-medium">กราฟจุดกระจาย (Scatter) แยกสีตามระดับความเสี่ยง</p>
            </div>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" />
                <XAxis
                  type="number"
                  dataKey="bmi"
                  name="BMI"
                  unit=" kg/m²"
                  domain={[18, 35]}
                  stroke="#78716C"
                  fontSize={11}
                  label={{ value: 'BMI (kg/m²)', position: 'insideBottom', offset: -10, fill: '#78716C', fontSize: 11 }}
                />
                <YAxis
                  type="number"
                  dataKey="sugar"
                  name="น้ำตาล"
                  unit=" mg/dL"
                  domain={[70, 180]}
                  stroke="#78716C"
                  fontSize={11}
                  label={{ value: 'น้ำตาล (mg/dL)', angle: -90, position: 'insideLeft', offset: 15, fill: '#78716C', fontSize: 11 }}
                />
                <Tooltip content={<CustomScatterTooltip />} />
                <ReferenceLine x={23} stroke="#F59E0B" strokeDasharray="3 3" label={{ value: 'เกณฑ์ท้วม (23)', fill: '#B45309', fontSize: 10 }} />
                <ReferenceLine y={100} stroke="#10B981" strokeDasharray="3 3" label={{ value: 'ปกติ (100)', fill: '#047857', fontSize: 10 }} />
                <ReferenceLine y={126} stroke="#EF4444" strokeDasharray="3 3" label={{ value: 'เกณฑ์เบาหวาน (126)', fill: '#B91C1C', fontSize: 10 }} />
                <Scatter name="ผู้รับการตรวจ" data={scatterPoints} fill="#FB923C">
                  {scatterPoints.map((entry, index) => (
                    <Cell key={`cell-sugar-${index}`} fill={entry.fillColor} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs mt-1 pt-2 border-t border-amber-100 font-medium">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-600 inline-block" /> เสี่ยงสูง</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" /> เสี่ยงปานกลาง</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" /> เสี่ยงต่ำ</span>
          </div>
          <p className="mt-2 text-xs text-amber-900 bg-amber-50 p-2.5 rounded-2xl border border-amber-200/80 font-medium">
            📈 <strong>ข้อสังเกต:</strong> เมื่อ BMI เกิน 28 kg/m² ค่าระดับน้ำตาลมีโอกาสพุ่งเกิน 126 mg/dL สูงอย่างมีนัยสำคัญ
          </p>
        </div>

        {/* ความสัมพันธ์ระหว่าง BMI กับความดันโลหิต */}
        <div className="bg-white/95 rounded-3xl border-2 border-amber-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-amber-100">
            <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-950 flex items-center justify-center font-bold text-sm">
              💓
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm sm:text-base font-['Mali',cursive]">
                ความสัมพันธ์ระหว่าง BMI กับความดัน (BMI vs Blood Pressure)
              </h4>
              <p className="text-xs text-stone-500 font-medium">กราฟจุดกระจายเปรียบเทียบ BMI กับความดันตัวบน (SBP)</p>
            </div>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" />
                <XAxis
                  type="number"
                  dataKey="bmi"
                  name="BMI"
                  unit=" kg/m²"
                  domain={[18, 35]}
                  stroke="#78716C"
                  fontSize={11}
                  label={{ value: 'BMI (kg/m²)', position: 'insideBottom', offset: -10, fill: '#78716C', fontSize: 11 }}
                />
                <YAxis
                  type="number"
                  dataKey="sbp"
                  name="ความดัน SBP"
                  unit=" mmHg"
                  domain={[100, 180]}
                  stroke="#78716C"
                  fontSize={11}
                  label={{ value: 'SBP (mmHg)', angle: -90, position: 'insideLeft', offset: 15, fill: '#78716C', fontSize: 11 }}
                />
                <Tooltip content={<CustomScatterTooltip />} />
                <ReferenceLine x={23} stroke="#F59E0B" strokeDasharray="3 3" label={{ value: 'BMI 23', fill: '#B45309', fontSize: 10 }} />
                <ReferenceLine y={120} stroke="#10B981" strokeDasharray="3 3" label={{ value: 'ปกติ (120)', fill: '#047857', fontSize: 10 }} />
                <ReferenceLine y={140} stroke="#EF4444" strokeDasharray="3 3" label={{ value: 'ความดันสูง (140)', fill: '#B91C1C', fontSize: 10 }} />
                <Scatter name="ผู้รับการตรวจ" data={scatterPoints} fill="#EA580C">
                  {scatterPoints.map((entry, index) => (
                    <Cell key={`cell-sbp-${index}`} fill={entry.fillColor} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs mt-1 pt-2 border-t border-amber-100 font-medium">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-600 inline-block" /> เสี่ยงสูง</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" /> เสี่ยงปานกลาง</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" /> เสี่ยงต่ำ</span>
          </div>
          <p className="mt-2 text-xs text-amber-900 bg-amber-50 p-2.5 rounded-2xl border border-amber-200/80 font-medium">
            💓 <strong>ข้อสังเกต:</strong> ผู้ที่มีน้ำหนักเกินและดื่มแอลกอฮอล์ มีความดันตัวบนเกิน 140 mmHg ในสัดส่วนสูงมาก
          </p>
        </div>

      </div>

    </div>
  );
};
