import React from 'react';
import { HealthRecord } from '../types';
import { Lightbulb, AlertTriangle, CheckCircle, ShieldCheck, Heart, Wine, Dumbbell, Sparkles } from 'lucide-react';

interface RecommendationsProps {
  records: HealthRecord[];
}

export const Recommendations: React.FC<RecommendationsProps> = ({ records }) => {
  const highRiskCount = records.filter(r => r.riskLevel === 'สูง').length;
  const alcoholDrinkers = records.filter(r => r.alcohol === 'ดื่ม').length;
  const highRiskDrinkers = records.filter(r => r.riskLevel === 'สูง' && r.alcohol === 'ดื่ม').length;

  return (
    <div className="space-y-6">
      
      {/* Policy and Health Insights Header */}
      <div className="bg-white/95 rounded-3xl border-2 border-amber-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b-2 border-dashed border-amber-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-200 text-amber-950 flex items-center justify-center text-lg shadow-2xs">
              💡
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base sm:text-lg font-['Mali',cursive]">
                ข้อค้นพบสำคัญและการแปลผลข้อมูลสุขภาพ (Key Health Insights)
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                สรุปความเสี่ยงเชิงระบาดวิทยาจากการดื่มแอลกอฮอล์และพฤติกรรมสุขภาพ
              </p>
            </div>
          </div>
          <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 font-['Mali',cursive]">
            แนวทางปฏิบัติการแพทย์ & นโยบาย 🌻
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-orange-50/90 border-2 border-orange-200 shadow-2xs">
            <div className="flex items-center gap-2 text-orange-950 font-bold text-sm mb-1 font-['Mali',cursive]">
              <span>🚨 1. อิทธิพลของแอลกอฮอล์</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              ในกลุ่มผู้มีความเสี่ยงสูงทั้งหมด {highRiskCount} คน พบว่าเป็นผู้ที่ <strong>ดื่มแอลกอฮอล์ถึง {highRiskDrinkers} คน ({(highRiskCount > 0 ? (highRiskDrinkers / highRiskCount) * 100 : 0).toFixed(0)}%)</strong> แอลกอฮอล์จึงเป็นปัจจัยเร่งหลักของคะแนนความเสี่ยง
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-yellow-50/90 border-2 border-yellow-200 shadow-2xs">
            <div className="flex items-center gap-2 text-yellow-950 font-bold text-sm mb-1 font-['Mali',cursive]">
              <span>🏃 2. พลังของการออกกำลังกาย</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              กลุ่มที่ออกกำลังกาย <strong>&quot;สม่ำเสมอ&quot;</strong> มีคะแนนความเสี่ยงต่ำที่สุด (0-1 คะแนน) และไม่มีใครอยู่ในกลุ่มเสี่ยงสูงเลย ช่วยปกป้องหลอดเลือดและหัวใจได้อย่างดีเยี่ยม ✨
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/90 border-2 border-emerald-200 shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm mb-1 font-['Mali',cursive]">
              <span>🥑 3. ระวังน้ำตาลและ BMI</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed font-medium">
              เมื่อ BMI เกิน 28 kg/m² ควบคู่กับการดื่มแอลกอฮอล์ จะพบทั้งภาวะน้ำตาลในเลือดสูง (&gt;126 mg/dL) และความดันสูง (&gt;140 mmHg) พร้อมกัน (Metabolic Syndrome)
            </p>
          </div>
        </div>
      </div>

      {/* Action Plan by Risk Level */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* กลุ่มความเสี่ยงสูง */}
        <div className="bg-white/95 rounded-3xl border-2 border-orange-300 p-5 sm:p-6 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-200 text-orange-950 border border-orange-300 font-['Mali',cursive]">
                🟠 กลุ่มความเสี่ยงสูง (คะแนน 4-7)
              </span>
              <span className="text-lg">🚨</span>
            </div>
            <h4 className="font-bold text-stone-900 text-base mb-2 font-['Mali',cursive]">
              มาตรการควบคุมและส่งต่อเร่งด่วน
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-700 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold text-sm leading-none">•</span>
                <span><strong>ส่งต่อพบแพทย์ทันที:</strong> ตรวจยืนยันโรคความดันโลหิตสูงและเบาหวาน (ตรวจแล็บ HbA1c และติดตามความดันซ้ำ)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold text-sm leading-none">•</span>
                <span><strong>โปรแกรมบำบัดลด/เลิกสุรา:</strong> ให้คำปรึกษาแบบสร้างแรงจูงใจ (MI) ในคลินิก NCD เพื่อลดปริมาณการดื่มลงอย่างปลอดภัย</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold text-sm leading-none">•</span>
                <span><strong>โภชนบำบัด:</strong> ลดเค็ม (โซเดียม &lt; 2,000 mg/วัน) ลดหวาน และปรับลดพลังงานเพื่อลดน้ำหนักตัว 5-10%</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-orange-100 text-xs text-orange-950 font-bold bg-orange-100/70 p-2.5 rounded-2xl font-['Mali',cursive]">
            🎯 เป้าหมาย: ลดคะแนนความเสี่ยงลงสู่ระดับปานกลางภายใน 3-6 เดือน
          </div>
        </div>

        {/* กลุ่มความเสี่ยงปานกลาง */}
        <div className="bg-white/95 rounded-3xl border-2 border-yellow-300 p-5 sm:p-6 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-200 text-yellow-950 border border-yellow-300 font-['Mali',cursive]">
                🟡 กลุ่มความเสี่ยงปานกลาง (คะแนน 2-3)
              </span>
              <span className="text-lg">⚠️</span>
            </div>
            <h4 className="font-bold text-stone-900 text-base mb-2 font-['Mali',cursive]">
              การปรับเปลี่ยนพฤติกรรมสุขภาพ
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-700 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold text-sm leading-none">•</span>
                <span><strong>จำกัดปริมาณแอลกอฮอล์:</strong> ดื่มไม่เกินเกณฑ์มาตรฐาน หรือตั้งเป้าหมาย &quot;งดเหล้าเข้าพรรษา / วันธรรมดา&quot;</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold text-sm leading-none">•</span>
                <span><strong>เพิ่มกิจกรรมทางกาย:</strong> จาก &quot;บางครั้ง&quot; เป็น &quot;สม่ำเสมอ&quot; อย่างน้อย 150 นาที/สัปดาห์ (เดินเร็ว, ขี่จักรยาน, แอโรบิก)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold text-sm leading-none">•</span>
                <span><strong>ติดตามตรวจสุขภาพซ้ำ:</strong> คัดกรองซ้ำทุก 6 เดือน เพื่อป้องกันไม่ให้เลื่อนระดับเป็นกลุ่มเสี่ยงสูง</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-yellow-100 text-xs text-yellow-950 font-bold bg-yellow-100/70 p-2.5 rounded-2xl font-['Mali',cursive]">
            🎯 เป้าหมาย: ป้องกันไม่ให้เกิดโรคไม่ติดต่อเรื้อรัง (NCDs) ในอนาคต
          </div>
        </div>

        {/* กลุ่มความเสี่ยงต่ำ */}
        <div className="bg-white/95 rounded-3xl border-2 border-emerald-300 p-5 sm:p-6 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-200 text-emerald-950 border border-emerald-300 font-['Mali',cursive]">
                🟢 กลุ่มความเสี่ยงต่ำ (คะแนน 0-1)
              </span>
              <span className="text-lg">💖</span>
            </div>
            <h4 className="font-bold text-stone-900 text-base mb-2 font-['Mali',cursive]">
              การส่งเสริมและรักษาสุขภาวะที่ดี
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-700 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold text-sm leading-none">•</span>
                <span><strong>รักษาพฤติกรรมสุขภาพเชิงบวก:</strong> ไม่ดื่มสุรา หรือหลีกเลี่ยงการเริ่มดื่ม และออกกำลังกายเป็นประจำ</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold text-sm leading-none">•</span>
                <span><strong>ควบคุมค่า BMI:</strong> ให้อยู่ในเกณฑ์มาตรฐาน (18.5 - 22.9 kg/m²) และรับประทานผักผลไม้หลากสี</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold text-sm leading-none">•</span>
                <span><strong>ตรวจสุขภาพประจำปี:</strong> วัดความดันโลหิตและเจาะตรวจน้ำตาลปีละ 1 ครั้งตามมาตรฐานสาธารณสุข</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-emerald-100 text-xs text-emerald-950 font-bold bg-emerald-100/70 p-2.5 rounded-2xl font-['Mali',cursive]">
            🎯 เป้าหมาย: รักษาสุขภาพร่างกายและจิตใจให้แข็งแรงแจ่มใสตลอดไป ✨
          </div>
        </div>

      </div>

      {/* Attribution Footer note */}
      <div className="p-4 sm:p-5 rounded-3xl bg-amber-100/80 border-2 border-amber-200 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-800 gap-2 font-medium">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span className="font-['Mali',cursive]">แดชบอร์ดการวิเคราะห์สุขภาพและการประเมินความเสี่ยงจากการดื่มแอลกอฮอลล์</span>
        </div>
        <div className="font-bold text-stone-900 font-['Mali',cursive]">
          จัดทำโดย: นางสาวอรวรรณ จิ๋วปัญญา 💛
        </div>
      </div>

    </div>
  );
};
