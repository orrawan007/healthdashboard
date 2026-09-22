export interface HealthRecord {
  id: string; // รหัสบุคคล เช่น H0001
  screeningDate: string; // วันที่คัดกรอง เช่น 3/1/2026
  area: string; // พื้นที่ เช่น เมือง, เหนือ, ใต้, ตะวันออก, ตะวันตก
  gender: 'ชาย' | 'หญิง' | string; // เพศ
  age: number; // อายุ
  height: number; // ส่วนสูง_cm
  weight: number; // น้ำหนัก_kg
  bmi: number; // BMI
  sbp: number; // SBP_mmHg ความดันตัวบน
  dbp: number; // DBP_mmHg ความดันตัวล่าง
  pulse: number; // ชีพจร_bpm
  sugar: number; // น้ำตาล_mg_dL
  smoking: 'สูบ' | 'ไม่สูบ' | string; // สูบบุหรี่
  alcohol: 'ดื่ม' | 'ไม่ดื่ม' | string; // ดื่มแอลกอฮอล์
  exercise: 'สม่ำเสมอ' | 'บางครั้ง' | 'ไม่ออกกำลังกาย' | string; // การออกกำลังกาย
  diabetesScreening: 'ไม่มี' | 'มีแนวโน้ม/เสี่ยง' | string; // เบาหวาน_คัดกรอง
  hypertensionScreening: 'ไม่มี' | 'มีแนวโน้ม/เสี่ยง' | string; // ความดันโลหิตสูง_คัดกรอง
  riskScore: number; // คะแนนความเสี่ยง
  riskLevel: 'สูง' | 'ปานกลาง' | 'ต่ำ' | string; // ระดับความเสี่ยง
  month: string; // เดือน เช่น 2026-01, 2026-02, 2026-03
}

export interface FilterState {
  alcohol: string; // ทั้งหมด, ดื่ม, ไม่ดื่ม
  exercise: string; // ทั้งหมด, สม่ำเสมอ, บางครั้ง, ไม่ออกกำลังกาย
  riskLevel: string; // ทั้งหมด, สูง, ปานกลาง, ต่ำ
  gender: string; // ทั้งหมด, ชาย, หญิง
  area: string; // ทั้งหมด, เมือง, เหนือ, ตะวันออก, ตะวันตก, ใต้
  searchQuery: string; // ค้นหารหัส, พื้นที่
}

export type ActiveTab = 'overview' | 'risk_trend' | 'behavior_correlation' | 'data_table' | 'recommendations';

export type { SummaryStats } from './utils/analytics';
