import { HealthRecord } from '../types';

export interface SummaryStats {
  totalCount: number;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
  alcoholDrinkersCount: number;
  nonExercisersCount: number;
  smokersCount: number;
  diabetesRiskCount: number;
  hypertensionRiskCount: number;

  // Averages
  avgAge: number;
  avgBmi: number;
  avgSugar: number;
  avgSbp: number;
  avgDbp: number;
  avgPulse: number;
  avgRiskScore: number;

  // Min & Max
  minAge: number;
  maxAge: number;
  minBmi: number;
  maxBmi: number;
  minSugar: number;
  maxSugar: number;
  minSbp: number;
  maxSbp: number;

  // Percentages
  highRiskPercent: number;
  mediumRiskPercent: number;
  lowRiskPercent: number;
  alcoholDrinkersPercent: number;
  nonExercisersPercent: number;
  smokersPercent: number;
  diabetesRiskPercent: number;
  hypertensionRiskPercent: number;
}

export function computeSummaryStats(records: HealthRecord[]): SummaryStats {
  if (records.length === 0) {
    return {
      totalCount: 0,
      highRiskCount: 0,
      mediumRiskCount: 0,
      lowRiskCount: 0,
      alcoholDrinkersCount: 0,
      nonExercisersCount: 0,
      smokersCount: 0,
      diabetesRiskCount: 0,
      hypertensionRiskCount: 0,
      avgAge: 0,
      avgBmi: 0,
      avgSugar: 0,
      avgSbp: 0,
      avgDbp: 0,
      avgPulse: 0,
      avgRiskScore: 0,
      minAge: 0,
      maxAge: 0,
      minBmi: 0,
      maxBmi: 0,
      minSugar: 0,
      maxSugar: 0,
      minSbp: 0,
      maxSbp: 0,
      highRiskPercent: 0,
      mediumRiskPercent: 0,
      lowRiskPercent: 0,
      alcoholDrinkersPercent: 0,
      nonExercisersPercent: 0,
      smokersPercent: 0,
      diabetesRiskPercent: 0,
      hypertensionRiskPercent: 0,
    };
  }

  const total = records.length;
  let highRisk = 0;
  let mediumRisk = 0;
  let lowRisk = 0;
  let alcoholCount = 0;
  let nonExerciseCount = 0;
  let smokerCount = 0;
  let diabetesCount = 0;
  let hypertensionCount = 0;

  let sumAge = 0;
  let sumBmi = 0;
  let sumSugar = 0;
  let sumSbp = 0;
  let sumDbp = 0;
  let sumPulse = 0;
  let sumRiskScore = 0;

  let minAge = records[0].age;
  let maxAge = records[0].age;
  let minBmi = records[0].bmi;
  let maxBmi = records[0].bmi;
  let minSugar = records[0].sugar;
  let maxSugar = records[0].sugar;
  let minSbp = records[0].sbp;
  let maxSbp = records[0].sbp;

  for (const r of records) {
    if (r.riskLevel === 'สูง') highRisk++;
    else if (r.riskLevel === 'ปานกลาง') mediumRisk++;
    else lowRisk++;

    if (r.alcohol === 'ดื่ม') alcoholCount++;
    if (r.exercise === 'ไม่ออกกำลังกาย') nonExerciseCount++;
    if (r.smoking === 'สูบ') smokerCount++;
    if (r.diabetesScreening === 'มีแนวโน้ม/เสี่ยง') diabetesCount++;
    if (r.hypertensionScreening === 'มีแนวโน้ม/เสี่ยง') hypertensionCount++;

    sumAge += r.age;
    sumBmi += r.bmi;
    sumSugar += r.sugar;
    sumSbp += r.sbp;
    sumDbp += r.dbp;
    sumPulse += r.pulse;
    sumRiskScore += r.riskScore;

    if (r.age < minAge) minAge = r.age;
    if (r.age > maxAge) maxAge = r.age;
    if (r.bmi < minBmi) minBmi = r.bmi;
    if (r.bmi > maxBmi) maxBmi = r.bmi;
    if (r.sugar < minSugar) minSugar = r.sugar;
    if (r.sugar > maxSugar) maxSugar = r.sugar;
    if (r.sbp < minSbp) minSbp = r.sbp;
    if (r.sbp > maxSbp) maxSbp = r.sbp;
  }

  return {
    totalCount: total,
    highRiskCount: highRisk,
    mediumRiskCount: mediumRisk,
    lowRiskCount: lowRisk,
    alcoholDrinkersCount: alcoholCount,
    nonExercisersCount: nonExerciseCount,
    smokersCount: smokerCount,
    diabetesRiskCount: diabetesCount,
    hypertensionRiskCount: hypertensionCount,

    avgAge: +(sumAge / total).toFixed(1),
    avgBmi: +(sumBmi / total).toFixed(1),
    avgSugar: +(sumSugar / total).toFixed(1),
    avgSbp: +(sumSbp / total).toFixed(1),
    avgDbp: +(sumDbp / total).toFixed(1),
    avgPulse: +(sumPulse / total).toFixed(1),
    avgRiskScore: +(sumRiskScore / total).toFixed(1),

    minAge,
    maxAge,
    minBmi,
    maxBmi,
    minSugar,
    maxSugar,
    minSbp,
    maxSbp,

    highRiskPercent: +((highRisk / total) * 100).toFixed(1),
    mediumRiskPercent: +((mediumRisk / total) * 100).toFixed(1),
    lowRiskPercent: +((lowRisk / total) * 100).toFixed(1),
    alcoholDrinkersPercent: +((alcoholCount / total) * 100).toFixed(1),
    nonExercisersPercent: +((nonExerciseCount / total) * 100).toFixed(1),
    smokersPercent: +((smokerCount / total) * 100).toFixed(1),
    diabetesRiskPercent: +((diabetesCount / total) * 100).toFixed(1),
    hypertensionRiskPercent: +((hypertensionCount / total) * 100).toFixed(1),
  };
}

export function getRiskDistribution(records: HealthRecord[]) {
  const counts: Record<string, number> = { สูง: 0, ปานกลาง: 0, ต่ำ: 0 };
  for (const r of records) {
    if (counts[r.riskLevel] !== undefined) counts[r.riskLevel]++;
  }
  return [
    { name: 'ความเสี่ยงสูง', value: counts['สูง'], key: 'สูง', color: '#F97316' }, // ส้ม
    { name: 'ความเสี่ยงปานกลาง', value: counts['ปานกลาง'], key: 'ปานกลาง', color: '#FACC15' }, // เหลือง
    { name: 'ความเสี่ยงต่ำ', value: counts['ต่ำ'], key: 'ต่ำ', color: '#22C55E' }, // เขียว
  ];
}

export function getGenderRiskDistribution(records: HealthRecord[]) {
  const data = [
    { gender: 'ชาย', สูง: 0, ปานกลาง: 0, ต่ำ: 0 },
    { gender: 'หญิง', สูง: 0, ปานกลาง: 0, ต่ำ: 0 },
  ];

  for (const r of records) {
    const item = data.find(d => d.gender === r.gender);
    if (item) {
      if (r.riskLevel === 'สูง') item['สูง']++;
      else if (r.riskLevel === 'ปานกลาง') item['ปานกลาง']++;
      else if (r.riskLevel === 'ต่ำ') item['ต่ำ']++;
    }
  }
  return data;
}

export function getMonthlyTrends(records: HealthRecord[]) {
  const monthsMap: Record<string, { month: string; label: string; สูง: number; ปานกลาง: number; ต่ำ: number; total: number; avgSugarSum: number; avgSbpSum: number; count: number }> = {};

  const monthNames: Record<string, string> = {
    '2026-01': 'ม.ค. 2026',
    '2026-02': 'ก.พ. 2026',
    '2026-03': 'มี.ค. 2026',
  };

  for (const r of records) {
    const m = r.month || '2026-01';
    if (!monthsMap[m]) {
      monthsMap[m] = {
        month: m,
        label: monthNames[m] || m,
        สูง: 0,
        ปานกลาง: 0,
        ต่ำ: 0,
        total: 0,
        avgSugarSum: 0,
        avgSbpSum: 0,
        count: 0,
      };
    }
    const item = monthsMap[m];
    if (r.riskLevel === 'สูง') item['สูง']++;
    else if (r.riskLevel === 'ปานกลาง') item['ปานกลาง']++;
    else item['ต่ำ']++;
    item.total++;
    item.avgSugarSum += r.sugar;
    item.avgSbpSum += r.sbp;
    item.count++;
  }

  const sortedMonths = Object.keys(monthsMap).sort();
  return sortedMonths.map(m => {
    const item = monthsMap[m];
    return {
      month: item.month,
      label: item.label,
      สูง: item['สูง'],
      ปานกลาง: item['ปานกลาง'],
      ต่ำ: item['ต่ำ'],
      total: item.total,
      avgSugar: +(item.avgSugarSum / (item.count || 1)).toFixed(1),
      avgSbp: +(item.avgSbpSum / (item.count || 1)).toFixed(1),
    };
  });
}

export function getAreaRiskAnalysis(records: HealthRecord[]) {
  const areas = ['เมือง', 'เหนือ', 'ใต้', 'ตะวันออก', 'ตะวันตก'];
  return areas.map(area => {
    const areaRecords = records.filter(r => r.area === area);
    const total = areaRecords.length;
    const highRisk = areaRecords.filter(r => r.riskLevel === 'สูง').length;
    const mediumRisk = areaRecords.filter(r => r.riskLevel === 'ปานกลาง').length;
    const lowRisk = areaRecords.filter(r => r.riskLevel === 'ต่ำ').length;
    const drinkers = areaRecords.filter(r => r.alcohol === 'ดื่ม').length;
    const avgRiskScore = total > 0 ? +(areaRecords.reduce((acc, r) => acc + r.riskScore, 0) / total).toFixed(1) : 0;

    return {
      area,
      total,
      highRisk,
      mediumRisk,
      lowRisk,
      drinkers,
      highRiskPercent: total > 0 ? +((highRisk / total) * 100).toFixed(0) : 0,
      avgRiskScore,
    };
  });
}

export function getAgeGroupRiskAnalysis(records: HealthRecord[]) {
  const groups = [
    { label: '< 30 ปี', min: 0, max: 29 },
    { label: '30 - 44 ปี', min: 30, max: 44 },
    { label: '45 - 59 ปี', min: 45, max: 59 },
    { label: '60 ปีขึ้นไป', min: 60, max: 120 },
  ];

  return groups.map(g => {
    const groupRecords = records.filter(r => r.age >= g.min && r.age <= g.max);
    const total = groupRecords.length;
    const highRisk = groupRecords.filter(r => r.riskLevel === 'สูง').length;
    const mediumRisk = groupRecords.filter(r => r.riskLevel === 'ปานกลาง').length;
    const lowRisk = groupRecords.filter(r => r.riskLevel === 'ต่ำ').length;
    const drinkers = groupRecords.filter(r => r.alcohol === 'ดื่ม').length;

    return {
      ageGroup: g.label,
      total,
      สูง: highRisk,
      ปานกลาง: mediumRisk,
      ต่ำ: lowRisk,
      highRiskRate: total > 0 ? +((highRisk / total) * 100).toFixed(1) : 0,
      alcoholRate: total > 0 ? +((drinkers / total) * 100).toFixed(1) : 0,
    };
  });
}

export function getScreeningBreakdown(records: HealthRecord[]) {
  const diabetesCounts = {
    'ไม่มี': records.filter(r => r.diabetesScreening === 'ไม่มี').length,
    'มีแนวโน้ม/เสี่ยง': records.filter(r => r.diabetesScreening === 'มีแนวโน้ม/เสี่ยง').length,
  };
  const hypertensionCounts = {
    'ไม่มี': records.filter(r => r.hypertensionScreening === 'ไม่มี').length,
    'มีแนวโน้ม/เสี่ยง': records.filter(r => r.hypertensionScreening === 'มีแนวโน้ม/เสี่ยง').length,
  };

  return {
    diabetes: [
      { name: 'ไม่มีความเสี่ยงเบาหวาน 🍵', value: diabetesCounts['ไม่มี'], color: '#4ADE80' },
      { name: 'มีแนวโน้ม/เสี่ยงเบาหวาน 🩸', value: diabetesCounts['มีแนวโน้ม/เสี่ยง'], color: '#FB923C' },
    ],
    hypertension: [
      { name: 'ไม่มีความเสี่ยงความดัน 💖', value: hypertensionCounts['ไม่มี'], color: '#4ADE80' },
      { name: 'มีแนวโน้ม/เสี่ยงความดัน 💓', value: hypertensionCounts['มีแนวโน้ม/เสี่ยง'], color: '#F87171' },
    ],
  };
}

export function getMonthlyRiskTrend(records: HealthRecord[]) {
  return getMonthlyTrends(records);
}

export function getMonthlyAverages(records: HealthRecord[]) {
  return getMonthlyTrends(records);
}

export function getAgeGroupRiskDistribution(records: HealthRecord[]) {
  return getAgeGroupRiskAnalysis(records);
}

export function getAreaRiskDistribution(records: HealthRecord[]) {
  const areas = ['เมือง', 'เหนือ', 'ใต้', 'ตะวันออก', 'ตะวันตก'];
  return areas.map(area => {
    const areaRecords = records.filter(r => r.area === area);
    return {
      area,
      สูง: areaRecords.filter(r => r.riskLevel === 'สูง').length,
      ปานกลาง: areaRecords.filter(r => r.riskLevel === 'ปานกลาง').length,
      ต่ำ: areaRecords.filter(r => r.riskLevel === 'ต่ำ').length,
      total: areaRecords.length,
    };
  });
}

export function getBehaviorMatrix(records: HealthRecord[]) {
  // Alcohol + Exercise matrix vs Risk
  const categories = [
    { label: 'ดื่ม + ไม่ออกกำลังกาย', alcohol: 'ดื่ม', exercise: 'ไม่ออกกำลังกาย' },
    { label: 'ดื่ม + ออกกำลังกายบางครั้ง', alcohol: 'ดื่ม', exercise: 'บางครั้ง' },
    { label: 'ดื่ม + ออกกำลังกายสม่ำเสมอ', alcohol: 'ดื่ม', exercise: 'สม่ำเสมอ' },
    { label: 'ไม่ดื่ม + ไม่ออกกำลังกาย', alcohol: 'ไม่ดื่ม', exercise: 'ไม่ออกกำลังกาย' },
    { label: 'ไม่ดื่ม + ออกกำลังกายบางครั้ง', alcohol: 'ไม่ดื่ม', exercise: 'บางครั้ง' },
    { label: 'ไม่ดื่ม + ออกกำลังกายสม่ำเสมอ', alcohol: 'ไม่ดื่ม', exercise: 'สม่ำเสมอ' },
  ];

  return categories.map(cat => {
    const matched = records.filter(r => r.alcohol === cat.alcohol && r.exercise === cat.exercise);
    const total = matched.length;
    const high = matched.filter(r => r.riskLevel === 'สูง').length;
    const medium = matched.filter(r => r.riskLevel === 'ปานกลาง').length;
    const low = matched.filter(r => r.riskLevel === 'ต่ำ').length;
    const avgScore = total > 0 ? +(matched.reduce((acc, r) => acc + r.riskScore, 0) / total).toFixed(1) : 0;

    return {
      behavior: cat.label,
      total,
      สูง: high,
      ปานกลาง: medium,
      ต่ำ: low,
      highRiskPercent: total > 0 ? +((high / total) * 100).toFixed(1) : 0,
      avgScore,
    };
  }).filter(c => c.total > 0);
}

