import React from 'react';
import { HealthRecord } from '../types';
import {
  getRiskDistribution,
  getGenderRiskDistribution,
  getScreeningBreakdown,
  getMonthlyRiskTrend,
  getMonthlyAverages,
  getAgeGroupRiskDistribution,
  getAreaRiskDistribution,
} from '../utils/analytics';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { ShieldAlert, TrendingUp, Sparkles, MapPin, Users, Activity, Heart, Award } from 'lucide-react';

interface RiskAndTrendChartsProps {
  records: HealthRecord[];
}

export const RiskAndTrendCharts: React.FC<RiskAndTrendChartsProps> = ({ records }) => {
  const riskDist = getRiskDistribution(records);
  const genderRisk = getGenderRiskDistribution(records);
  const { diabetes, hypertension } = getScreeningBreakdown(records);
  const monthlyRisk = getMonthlyRiskTrend(records);
  const monthlyAvg = getMonthlyAverages(records);
  const ageGroupRisk = getAgeGroupRiskDistribution(records);
  const areaRisk = getAreaRiskDistribution(records);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#FFFDF3] p-3 rounded-2xl border-2 border-amber-300 shadow-md text-xs font-medium space-y-1">
          <p className="font-bold text-stone-900 border-b border-amber-200 pb-1 font-['Mali',cursive]">
            ✨ {label || payload[0]?.name}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }} className="flex justify-between gap-3">
              <span>{entry.name}:</span>
              <span className="font-bold font-mono">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      
      {/* SECTION 1: Health Risk Charts (4 Fields) */}
      <div className="bg-white/95 rounded-3xl border-2 border-amber-200 p-5 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-3 border-b-2 border-dashed border-amber-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-200 text-amber-950 flex items-center justify-center text-lg shadow-2xs">
              🩺
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base sm:text-lg font-['Mali',cursive]">
                การวิเคราะห์ความเสี่ยงสุขภาพ 4 มิติ (Health Risk Analysis - 4 Fields)
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                1) สัดส่วนระดับเสี่ยง 2) จำแนกตามเพศ 3) ภาวะเบาหวาน 4) ภาวะความดันโลหิตสูง
              </p>
            </div>
          </div>
          <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 font-['Mali',cursive]">
            ครบ 4 Field ตามเกณฑ์ 🌻
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Field 1: สัดส่วนระดับความเสี่ยง */}
          <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80 flex flex-col items-center">
            <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-stone-800 font-['Mali',cursive]">
              <span>🎯 1. สัดส่วนระดับความเสี่ยง</span>
            </div>
            <p className="text-[11px] text-stone-500 mb-2">สูง / ปานกลาง / ต่ำ</p>
            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDist}
                    dataKey="count"
                    nameKey="level"
                    cx="50%"
                    cy="50%"
                    outerRadius={65}
                    innerRadius={36}
                    paddingAngle={3}
                  >
                    {riskDist.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFF" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={28} wrapperStyle={{ fontSize: '11px', fontFamily: 'Mali' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Field 2: ระดับความเสี่ยงจำแนกตามเพศ */}
          <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80 flex flex-col items-center">
            <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-stone-800 font-['Mali',cursive]">
              <span>👫 2. ความเสี่ยงตามเพศ</span>
            </div>
            <p className="text-[11px] text-stone-500 mb-2">เปรียบเทียบชาย vs หญิง</p>
            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={genderRisk} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" vertical={false} />
                  <XAxis dataKey="gender" stroke="#78716C" fontSize={11} />
                  <YAxis stroke="#78716C" fontSize={11} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={28} wrapperStyle={{ fontSize: '10px', fontFamily: 'Mali' }} />
                  <Bar dataKey="สูง" fill="#FB923C" stackId="a" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="ปานกลาง" fill="#FACC15" stackId="a" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="ต่ำ" fill="#4ADE80" stackId="a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Field 3: ภาวะเบาหวานคัดกรอง */}
          <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80 flex flex-col items-center">
            <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-stone-800 font-['Mali',cursive]">
              <span>🩸 3. ภาวะเบาหวานคัดกรอง</span>
            </div>
            <p className="text-[11px] text-stone-500 mb-2">ผลตรวจน้ำตาลในเลือด</p>
            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={diabetes}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={65}
                    innerRadius={36}
                    paddingAngle={3}
                  >
                    {diabetes.map((entry: { name: string; value: number; color: string }, index: number) => (
                      <Cell key={`cell-dia-${index}`} fill={entry.color} stroke="#FFF" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={28} wrapperStyle={{ fontSize: '11px', fontFamily: 'Mali' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Field 4: ภาวะความดันโลหิตสูงคัดกรอง */}
          <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80 flex flex-col items-center">
            <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-stone-800 font-['Mali',cursive]">
              <span>💓 4. ความดันโลหิตสูงคัดกรอง</span>
            </div>
            <p className="text-[11px] text-stone-500 mb-2">ผลตรวจวัดความดันโลหิต</p>
            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={hypertension}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={65}
                    innerRadius={36}
                    paddingAngle={3}
                  >
                    {hypertension.map((entry: { name: string; value: number; color: string }, index: number) => (
                      <Cell key={`cell-hyp-${index}`} fill={entry.color} stroke="#FFF" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={28} wrapperStyle={{ fontSize: '11px', fontFamily: 'Mali' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 2: Health Trend Charts (2 Fields) */}
      <div className="bg-white/95 rounded-3xl border-2 border-amber-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-dashed border-amber-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-200 text-amber-950 flex items-center justify-center text-lg shadow-2xs">
              📊
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base sm:text-lg font-['Mali',cursive]">
                การวิเคราะห์แนวโน้มสุขภาพตามช่วงเวลา (Health Trend Analysis - 2 Fields)
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                1) แนวโน้มระดับความเสี่ยงรายเดือน 2) แนวโน้มค่าเฉลี่ยระดับน้ำตาล (FBS) และความดัน (SBP)
              </p>
            </div>
          </div>
          <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 font-['Mali',cursive]">
            แนวโน้ม ม.ค. - มี.ค. 2026 🗓️
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Trend 1: Monthly Risk Level */}
          <div className="bg-amber-50/50 p-4 sm:p-5 rounded-2xl border border-amber-200/80">
            <h4 className="text-xs sm:text-sm font-bold text-stone-800 mb-1 font-['Mali',cursive] flex items-center gap-1.5">
              <span>📈 1. แนวโน้มจำนวนผู้คัดกรองตามระดับความเสี่ยงรายเดือน</span>
            </h4>
            <p className="text-[11px] text-stone-500 mb-3">แสดงสัดส่วนผู้มีความเสี่ยงสูง ปานกลาง และต่ำในแต่ละเดือน</p>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRisk} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" vertical={false} />
                  <XAxis dataKey="month" stroke="#78716C" fontSize={12} />
                  <YAxis stroke="#78716C" fontSize={11} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', fontFamily: 'Mali' }} />
                  <Bar dataKey="สูง" name="เสี่ยงสูง (คน)" fill="#FB923C" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="ปานกลาง" name="เสี่ยงปานกลาง (คน)" fill="#FACC15" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="ต่ำ" name="เสี่ยงต่ำ (คน)" fill="#4ADE80" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trend 2: Monthly Sugar & SBP averages */}
          <div className="bg-amber-50/50 p-4 sm:p-5 rounded-2xl border border-amber-200/80">
            <h4 className="text-xs sm:text-sm font-bold text-stone-800 mb-1 font-['Mali',cursive] flex items-center gap-1.5">
              <span>📉 2. แนวโน้มค่าเฉลี่ยระดับน้ำตาล (FBS) และความดันตัวบน (SBP)</span>
            </h4>
            <p className="text-[11px] text-stone-500 mb-3">เปรียบเทียบการเปลี่ยนแปลงของค่าน้ำตาลและความดันรายเดือน</p>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyAvg} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" vertical={false} />
                  <XAxis dataKey="month" stroke="#78716C" fontSize={12} />
                  <YAxis stroke="#78716C" fontSize={11} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', fontFamily: 'Mali' }} />
                  <Line
                    type="monotone"
                    dataKey="avgSugar"
                    name="น้ำตาลเฉลี่ย (mg/dL)"
                    stroke="#D97706"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#D97706', strokeWidth: 2, stroke: '#FFF' }}
                    activeDot={{ r: 7 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="avgSbp"
                    name="ความดันตัวบนเฉลี่ย SBP (mmHg)"
                    stroke="#EA580C"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#EA580C', strokeWidth: 2, stroke: '#FFF' }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 3: Additional Insights (Age Group & Area Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* กลุ่มอายุที่มีความเสี่ยงสูง */}
        <div className="bg-white/95 rounded-3xl border-2 border-amber-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-amber-100">
            <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-950 flex items-center justify-center font-bold text-sm">
              👵
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm sm:text-base font-['Mali',cursive]">
                กลุ่มอายุที่มีความเสี่ยงสูง (High Risk by Age Group)
              </h4>
              <p className="text-xs text-stone-500 font-medium">จำแนกตามช่วงวัย &lt;30, 30-44, 45-59 และ 60+ ปี</p>
            </div>
          </div>
          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageGroupRisk} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" vertical={false} />
                <XAxis dataKey="ageGroup" stroke="#78716C" fontSize={11} />
                <YAxis stroke="#78716C" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={32} wrapperStyle={{ fontSize: '10px', fontFamily: 'Mali' }} />
                <Bar dataKey="สูง" fill="#FB923C" stackId="age" />
                <Bar dataKey="ปานกลาง" fill="#FACC15" stackId="age" />
                <Bar dataKey="ต่ำ" fill="#4ADE80" stackId="age" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs text-amber-900 bg-amber-50 p-2.5 rounded-2xl border border-amber-200/80 font-medium">
            💡 <strong>ข้อสังเกตน่ารักๆ:</strong> ช่วงอายุ <strong>45-59 ปี</strong> และ <strong>60+ ปี</strong> มีสัดส่วนผู้มีความเสี่ยงสูงมากที่สุด ควรได้รับการดูแลเป็นพิเศษน้า
          </p>
        </div>

        {/* พื้นที่ที่มีผู้เสี่ยงสูง */}
        <div className="bg-white/95 rounded-3xl border-2 border-amber-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-amber-100">
            <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-950 flex items-center justify-center font-bold text-sm">
              🗺️
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm sm:text-base font-['Mali',cursive]">
                พื้นที่ที่มีผู้เสี่ยงสูง (High Risk by Service Area)
              </h4>
              <p className="text-xs text-stone-500 font-medium">เปรียบเทียบระดับความเสี่ยงตามพื้นที่ เมือง, เหนือ, ใต้, ออก, ตก</p>
            </div>
          </div>
          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={areaRisk} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" vertical={false} />
                <XAxis dataKey="area" stroke="#78716C" fontSize={11} />
                <YAxis stroke="#78716C" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={32} wrapperStyle={{ fontSize: '10px', fontFamily: 'Mali' }} />
                <Bar dataKey="สูง" fill="#FB923C" stackId="area" />
                <Bar dataKey="ปานกลาง" fill="#FACC15" stackId="area" />
                <Bar dataKey="ต่ำ" fill="#4ADE80" stackId="area" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs text-amber-900 bg-amber-50 p-2.5 rounded-2xl border border-amber-200/80 font-medium">
            📍 <strong>ข้อสังเกตน่ารักๆ:</strong> พื้นที่ <strong>เมือง</strong> และ <strong>ตะวันออก</strong> มีความหนาแน่นของผู้มีความเสี่ยงสูงมากกว่าพื้นที่อื่น
          </p>
        </div>

      </div>

    </div>
  );
};
