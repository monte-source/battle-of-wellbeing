// ============================================================================
// BATTLE OF WELLBEING (ศึกชิงสุขภาพดี) - 40 Mission Cards Data & Customizer
// 4 Categories x 10 Cards:
//   - red: แข็งแรง (Physical Health) - Rule 3.1 (Read aloud yourself)
//   - blue: อารมณ์ดี (Emotional Health) - Rule 3.2 (Pick another player to read)
//   - green: เพื่อนเยอะ (Social Health) - Rule 3.1 (Read aloud yourself)
//   - yellow: มีเป้าหมาย (Purpose/Goals) - Rule 3.2 (Pick another player to read)
// ============================================================================

const CATEGORY_META = {
  red: {
    id: 'red',
    name: 'แข็งแรง',
    subtitle: 'สุขภาพกาย (Physical)',
    color: '#ef5350',
    darkColor: '#8e1c1a',
    lightBg: '#fee2e2',
    frontImg: 'assets/red_front.jpg',
    backImg: 'assets/red_back.jpg',
    ruleType: 'self_read', // 3.1 อ่านออกเสียงภารกิจในการ์ดให้ผู้เล่นคนอื่นฟัง
    ruleBadge: '📢 กติกา 3.1: อ่านออกเสียงภารกิจในการ์ดให้เพื่อนฟัง แล้วเลือกทำภารกิจ!',
    icon: '💪',
  },
  blue: {
    id: 'blue',
    name: 'อารมณ์ดี',
    subtitle: 'สุขภาพใจ (Emotional)',
    color: '#4dabf7',
    darkColor: '#0b4f8a',
    lightBg: '#dbeafe',
    frontImg: 'assets/blue_front.jpg',
    backImg: 'assets/blue_back.jpg',
    ruleType: 'friend_read', // 3.2 เลือกผู้เล่นคนอื่นหนึ่งคนเป็นคนอ่านรายละเอียดในการ์ดให้ฟัง
    ruleBadge: '🗣️ กติกา 3.2: เลือกผู้เล่นคนอื่น 1 คน เป็นคนอ่านรายละเอียดในการ์ดให้ฟัง!',
    icon: '😊',
  },
  green: {
    id: 'green',
    name: 'เพื่อนเยอะ',
    subtitle: 'สุขภาพสังคม (Social)',
    color: '#06b67a',
    darkColor: '#065f46',
    lightBg: '#d1fae5',
    frontImg: 'assets/green_front.jpg',
    backImg: 'assets/green_back.jpg',
    ruleType: 'self_read', // 3.1 อ่านออกเสียงภารกิจในการ์ดให้ผู้เล่นคนอื่นฟัง
    ruleBadge: '📢 กติกา 3.1: อ่านออกเสียงภารกิจในการ์ดให้เพื่อนฟัง แล้วเลือกทำภารกิจ!',
    icon: '🤝',
  },
  yellow: {
    id: 'yellow',
    name: 'มีเป้าหมาย',
    subtitle: 'เป้าหมายชีวิต (Purpose)',
    color: '#fcc419',
    darkColor: '#926c00',
    lightBg: '#fef3c7',
    frontImg: 'assets/yellow_front.jpg',
    backImg: 'assets/yellow_back.jpg',
    ruleType: 'friend_read', // 3.2 เลือกผู้เล่นคนอื่นหนึ่งคนเป็นคนอ่านรายละเอียดในการ์ดให้ฟัง
    ruleBadge: '🗣️ กติกา 3.2: เลือกผู้เล่นคนอื่น 1 คน เป็นคนอ่านรายละเอียดในการ์ดให้ฟัง!',
    icon: '🎯',
  },
};

const DEFAULT_CARDS = {
  // ==========================================================================
  // 1. การ์ดเพื่อนเยอะ (สีเขียว) - 10 ใบ (ใบที่ 1 จากภาพต้นฉบับ green front with text ref.jpg)
  // ==========================================================================
  green: [
    {
      id: 'green-1',
      title: 'ส่งสติกเกอร์หรือเล่าถึงเพื่อนเก่าที่คิดถึง',
      tiers: [
        { label: 'เล่าหรือทัก 1 คน = 1 โทเคน', tokens: 1 },
        { label: 'เล่าหรือทัก 2 คน = 2 โทเคน', tokens: 2 },
        { label: 'เล่าหรือทัก 3 คน = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่เล่า = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'green-2',
      title: 'กล่าวคำชมเพื่อนในวง',
      tiers: [
        { label: 'ชม 1 คน = 1 โทเคน', tokens: 1 },
        { label: 'ชม 2 คน = 2 โทเคน', tokens: 2 },
        { label: 'ชมทุกคนในวง = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่ชม = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'green-3',
      title: 'กอดหรือไฮไฟว์เพื่อน',
      tiers: [
        { label: '1 คน = 1 โทเคน', tokens: 1 },
        { label: '2 คน = 2 โทเคน', tokens: 2 },
        { label: 'ครบทุกคน = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่ทำ = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'green-4',
      title: 'บอกชื่อคนที่อยากขอบคุณพร้อมเหตุผล (หรือส่งข้อความขอบคุณ)',
      tiers: [
        { label: 'บอก 1 คน = 1 โทเคน', tokens: 1 },
        { label: 'บอก 2 คน = 2 โทเคน', tokens: 2 },
        { label: 'บอก 3 คน = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่บอก = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'green-5',
      title: 'เล่าความประทับใจเกี่ยวกับเพื่อนในวง',
      tiers: [
        { label: '1 เรื่อง = 1 โทเคน', tokens: 1 },
        { label: '2 เรื่อง = 2 โทเคน', tokens: 2 },
        { label: '3 เรื่อง = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่เล่า = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'green-6',
      title: 'ชวนเพื่อนทำกิจกรรมสุขภาพดีด้วยกัน',
      tiers: [
        { label: 'ชวน 1 คน = 1 โทเคน', tokens: 1 },
        { label: 'ชวน 2 คน = 2 โทเคน', tokens: 2 },
        { label: 'ชวนทั้งกลุ่ม = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่ชวน = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'green-7',
      title: 'บอกข้อดีของเพื่อนทางซ้ายมือ',
      tiers: [
        { label: '1 ข้อ = 1 โทเคน', tokens: 1 },
        { label: '3 ข้อ = 2 โทเคน', tokens: 2 },
        { label: '5 ข้อ = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่บอก = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'green-8',
      title: 'จำวันเกิดหรือสิ่งที่เพื่อนชอบ',
      tiers: [
        { label: 'ทายถูก 1 คน = 1 โทเคน', tokens: 1 },
        { label: 'ทายถูก 2 คน = 2 โทเคน', tokens: 2 },
        { label: 'ทายถูก 3 คน = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่ทาย = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'green-9',
      title: 'ยิ้มและสบตาพูดคุยกับเพื่อน 30 วินาที',
      tiers: [
        { label: '1 คน = 1 โทเคน', tokens: 1 },
        { label: '2 คน = 2 โทเคน', tokens: 2 },
        { label: '3 คน = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่ทำ = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'green-10',
      title: 'ถ่ายรูปเซลฟี่รอยยิ้มร่วมกับเพื่อน',
      tiers: [
        { label: 'คู่เพื่อน 1 คน = 1 โทเคน', tokens: 1 },
        { label: 'คู่เพื่อน 2 คน = 2 โทเคน', tokens: 2 },
        { label: 'รวมครบทั้งวง = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่ถ่าย = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
  ],

  // ==========================================================================
  // 2. การ์ดแข็งแรง (สีแดง) - 10 ใบ
  // ==========================================================================
  red: [
    {
      id: 'red-1',
      title: 'ลุกขึ้นทำท่าสควอท (Squat)',
      tiers: [
        { label: '5 ครั้ง = 1 โทเคน', tokens: 1 },
        { label: '10 ครั้ง = 2 โทเคน', tokens: 2 },
        { label: '15 ครั้ง = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่ทำ = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'red-2',
      title: 'กระโดดตบ (Jumping Jacks)',
      tiers: [
        { label: '10 ครั้ง = 1 โทเคน', tokens: 1 },
        { label: '20 ครั้ง = 2 โทเคน', tokens: 2 },
        { label: '30 ครั้ง = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่ทำ = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'red-3',
      title: 'ทำท่าแพลงก์ (Plank) เกร็งหน้าท้อง',
      tiers: [
        { label: '15 วินาที = 1 โทเคน', tokens: 1 },
        { label: '30 วินาที = 2 โทเคน', tokens: 2 },
        { label: '45 วินาที = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่ทำ = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'red-4',
      title: 'ยืดเหยียดคอบ่าไหล่ค้างไว้',
      tiers: [
        { label: '1 ท่า = 1 โทเคน', tokens: 1 },
        { label: '2 ท่า = 2 โทเคน', tokens: 2 },
        { label: '3 ท่า = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่ยืด = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'red-5',
      title: 'ยืนขาเดียวทรงตัว (ฝึกสมดุล)',
      tiers: [
        { label: '15 วินาที = 1 โทเคน', tokens: 1 },
        { label: '30 วินาที = 2 โทเคน', tokens: 2 },
        { label: '45 วินาที = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่ทำ = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'red-6',
      title: 'ดื่มน้ำเปล่า หรือบอกชื่อเครื่องดื่มสุขภาพที่ชอบดื่ม',
      tiers: [
        { label: 'ดื่ม 3 อึก หรือบอก 1 เมนู = 1 โทเคน', tokens: 1 },
        { label: 'ดื่มครึ่งแก้ว หรือบอก 2 เมนู = 2 โทเคน', tokens: 2 },
        { label: 'ดื่ม 1 แก้ว หรือบอก 3 เมนู = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่ทำ = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'red-7',
      title: 'หมุนหัวไหล่และแกว่งแขนคลายเมื่อย',
      tiers: [
        { label: '10 รอบ = 1 โทเคน', tokens: 1 },
        { label: '20 รอบ = 2 โทเคน', tokens: 2 },
        { label: '30 รอบ = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่ทำ = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'red-8',
      title: 'บอกชื่อผักหรือผลไม้ที่มีประโยชน์',
      tiers: [
        { label: '3 ชนิด = 1 โทเคน', tokens: 1 },
        { label: '5 ชนิด = 2 โทเคน', tokens: 2 },
        { label: '8 ชนิด = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่บอก = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'red-9',
      title: 'เขย่งปลายเท้าขึ้น-ลงบริหารน่อง',
      tiers: [
        { label: '10 ครั้ง = 1 โทเคน', tokens: 1 },
        { label: '20 ครั้ง = 2 โทเคน', tokens: 2 },
        { label: '30 ครั้ง = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่ทำ = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'red-10',
      title: 'เต้นขยับร่างกายตามจังหวะเพลง',
      tiers: [
        { label: '10 วินาที = 1 โทเคน', tokens: 1 },
        { label: '20 วินาที = 2 โทเคน', tokens: 2 },
        { label: '30 วินาที = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่เต้น = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
  ],

  // ==========================================================================
  // 3. การ์ดอารมณ์ดี (สีฟ้า/ม่วง) - 10 ใบ (กติกา 3.2 เลือกเพื่อน 1 คนอ่านให้ฟัง)
  // ==========================================================================
  blue: [
    {
      id: 'blue-1',
      title: 'บอกเรื่องที่ทำให้ยิ้มได้ในสัปดาห์นี้',
      tiers: [
        { label: '1 เรื่อง = 1 โทเคน', tokens: 1 },
        { label: '2 เรื่อง = 2 โทเคน', tokens: 2 },
        { label: '3 เรื่อง = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่บอก = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'blue-2',
      title: 'ฝึกหายใจเข้า-ออกลึกๆ ผ่อนคลายใจ',
      tiers: [
        { label: '3 รอบ = 1 โทเคน', tokens: 1 },
        { label: '5 รอบ = 2 โทเคน', tokens: 2 },
        { label: '8 รอบ = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่ทำ = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'blue-3',
      title: 'พูดขอบคุณสิ่งดีๆ ในชีวิตตัวเอง',
      tiers: [
        { label: '1 อย่าง = 1 โทเคน', tokens: 1 },
        { label: '3 อย่าง = 2 โทเคน', tokens: 2 },
        { label: '5 อย่าง = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่พูด = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'blue-4',
      title: 'ทำหน้าตลกหรือเลียนแบบอิโมจิให้เพื่อนหัวเราะ',
      tiers: [
        { label: '1 ท่า = 1 โทเคน', tokens: 1 },
        { label: '2 ท่า = 2 โทเคน', tokens: 2 },
        { label: '3 ท่า = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่ทำ = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'blue-5',
      title: 'แชร์วิธีคลายเครียดที่ใช้ได้ผลจริง',
      tiers: [
        { label: '1 วิธี = 1 โทเคน', tokens: 1 },
        { label: '2 วิธี = 2 โทเคน', tokens: 2 },
        { label: '3 วิธี = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่แชร์ = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'blue-6',
      title: 'ร้องเพลงหรือฮัมเพลงที่ฟังแล้วอารมณ์ดี',
      tiers: [
        { label: '1 ท่อน = 1 โทเคน', tokens: 1 },
        { label: '2 ท่อน = 2 โทเคน', tokens: 2 },
        { label: 'ชวนเพื่อนร้องด้วย = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่ร้อง = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'blue-7',
      title: 'บอกสิ่งที่ภูมิใจในตัวเอง',
      tiers: [
        { label: '1 ข้อ = 1 โทเคน', tokens: 1 },
        { label: '2 ข้อ = 2 โทเคน', tokens: 2 },
        { label: '3 ข้อ = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่บอก = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'blue-8',
      title: 'ส่งพลังบวก พูดคำให้กำลังใจตัวเองดังๆ',
      tiers: [
        { label: '1 ประโยค = 1 โทเคน', tokens: 1 },
        { label: '2 ประโยค = 2 โทเคน', tokens: 2 },
        { label: '3 ประโยค = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่พูด = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'blue-9',
      title: 'หลับตานึกถึงสถานที่ที่ไปทำงานหรือพักผ่อนแล้วมีความสุข',
      tiers: [
        { label: 'เล่า 1 ที่ = 1 โทเคน', tokens: 1 },
        { label: 'เล่า 2 ที่ = 2 โทเคน', tokens: 2 },
        { label: 'เล่า 3 ที่ = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่เล่า = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'blue-10',
      title: 'หัวเราะโยคะ (ฮ่าๆ โฮ่ๆ) ร่วมกับเพื่อน',
      tiers: [
        { label: '5 วินาที = 1 โทเคน', tokens: 1 },
        { label: '10 วินาที = 2 โทเคน', tokens: 2 },
        { label: '15 วินาที = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่ทำ = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
  ],

  // ==========================================================================
  // 4. การ์ดมีเป้าหมาย (สีเหลือง) - 10 ใบ (กติกา 3.2 เลือกเพื่อน 1 คนอ่านให้ฟัง)
  // ==========================================================================
  yellow: [
    {
      id: 'yellow-1',
      title: 'บอกเป้าหมายสุขภาพดีที่อยากทำให้สำเร็จในเดือนนี้',
      tiers: [
        { label: 'บอก 1 เป้าหมาย = 1 โทเคน', tokens: 1 },
        { label: 'บอก 2 เป้าหมาย = 2 โทเคน', tokens: 2 },
        { label: 'บอก 3 เป้าหมาย = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่บอก = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'yellow-2',
      title: 'บอกทักษะใหม่หรือสิ่งที่อยากฝึกฝนในปีนี้',
      tiers: [
        { label: '1 อย่าง = 1 โทเคน', tokens: 1 },
        { label: '2 อย่าง = 2 โทเคน', tokens: 2 },
        { label: '3 อย่าง = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่บอก = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'yellow-3',
      title: 'บอกเวลาเข้านอนในฝัน พร้อม 1 วิธีช่วยให้หลับสบายขึ้น',
      tiers: [
        { label: 'บอก 1 วิธี = 1 โทเคน', tokens: 1 },
        { label: 'บอก 2 วิธี = 2 โทเคน', tokens: 2 },
        { label: 'บอก 3 วิธี = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่บอก = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'yellow-4',
      title: 'บอกพฤติกรรมเสียที่อยากลด-ละ-เลิก',
      tiers: [
        { label: '1 อย่าง = 1 โทเคน', tokens: 1 },
        { label: '2 อย่าง = 2 โทเคน', tokens: 2 },
        { label: '3 อย่าง + วิธีทำ = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่บอก = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'yellow-5',
      title: 'บอกไอเดียจัดสรรเวลาหรือออมเงินเพื่ออนาคต',
      tiers: [
        { label: 'บอก 1 แผน = 1 โทเคน', tokens: 1 },
        { label: 'บอก 2 แผน = 2 โทเคน', tokens: 2 },
        { label: 'บอก 3 แผน = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่บอก = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'yellow-6',
      title: 'บอกความฝันที่อยากทำให้สำเร็จภายใน 3 ปี',
      tiers: [
        { label: '1 ความฝัน = 1 โทเคน', tokens: 1 },
        { label: '2 ความฝัน = 2 โทเคน', tokens: 2 },
        { label: '3 ความฝัน = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่บอก = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'yellow-7',
      title: 'บอกวิธีหรือเทคนิคลดเวลาเล่นมือถือก่อนนอน',
      tiers: [
        { label: 'บอก 1 วิธี = 1 โทเคน', tokens: 1 },
        { label: 'บอก 2 วิธี = 2 โทเคน', tokens: 2 },
        { label: 'บอก 3 วิธี = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่บอก = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'yellow-8',
      title: 'บอกเรื่องดีๆ ที่ตั้งใจจะทำให้เพื่อนหรือครอบครัว',
      tiers: [
        { label: 'บอก 1 เรื่อง = 1 โทเคน', tokens: 1 },
        { label: 'บอก 2 เรื่อง = 2 โทเคน', tokens: 2 },
        { label: 'บอก 3 เรื่อง = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่บอก = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'yellow-9',
      title: 'บอกหนังสือ พอดแคสต์ หรือความรู้ที่อยากศึกษาเพิ่ม',
      tiers: [
        { label: '1 เรื่อง = 1 โทเคน', tokens: 1 },
        { label: '2 เรื่อง = 2 โทเคน', tokens: 2 },
        { label: '3 เรื่อง = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่บอก = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
    {
      id: 'yellow-10',
      title: 'บอกสิ่งที่อยากทำทันทีหลังจบเกมนี้เพื่อสุขภาพดี',
      tiers: [
        { label: '1 อย่าง = 1 โทเคน', tokens: 1 },
        { label: '2 อย่าง = 2 โทเคน', tokens: 2 },
        { label: '3 อย่าง = 3 โทเคน', tokens: 3 },
      ],
      penaltyLabel: 'ไม่บอก = จ่าย 2 โทเคน',
      penaltyTokens: 2,
    },
  ],
};

const STORAGE_KEY = 'battle_of_wellbeing_cards_v3';

function loadAllCards() {
  try {
    // Purge outdated caches from v1/v2 or legacy cards
    localStorage.removeItem('battle_of_wellbeing_cards_v1');
    localStorage.removeItem('battle_of_wellbeing_cards_v2');

    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // If cached data contains old non-instant social media card, discard cache
      const hasOldCard = parsed?.yellow?.some(
        (c) => c.title && c.title.includes('วางแผนลดเวลาเล่นโซเชียล')
      );
      if (hasOldCard) {
        localStorage.removeItem(STORAGE_KEY);
        return JSON.parse(JSON.stringify(DEFAULT_CARDS));
      }
      if (parsed && parsed.red && parsed.blue && parsed.green && parsed.yellow) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not load custom cards from localStorage:', e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_CARDS));
}

function saveAllCards(cardsObj) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cardsObj));
  } catch (e) {
    console.warn('Could not save custom cards to localStorage:', e);
  }
}

function resetAllCardsToDefault() {
  localStorage.removeItem(STORAGE_KEY);
  return JSON.parse(JSON.stringify(DEFAULT_CARDS));
}

window.CATEGORY_META = CATEGORY_META;
window.DEFAULT_CARDS = DEFAULT_CARDS;
window.loadAllCards = loadAllCards;
window.saveAllCards = saveAllCards;
window.resetAllCardsToDefault = resetAllCardsToDefault;
