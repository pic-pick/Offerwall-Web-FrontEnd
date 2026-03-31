import cashwalkImage from '../assets/cashwalk-image.webp'
import cashwalkLogo from '../assets/cashwalk-logo.png'
import coupangImage from '../assets/coupang-image.jpg'
import coupangLogo from '../assets/coupang-logo.svg'
import musinsaImage from '../assets/musinsa-image.webp'
import musinsaLogo from '../assets/musinsa-logo.jpeg'
import mzImage from '../assets/mz-image.png'
import mzLogo from '../assets/mz-logo.png'
import naverImage from '../assets/naver-image.png'
import naverLogo from '../assets/naver-logo.svg'
import tossImage from '../assets/toss-image.png'
import tossLogo from '../assets/toss-logo.avif'

export type NavItem = {
  id: string
  label: string
  to: string
}

export type UserSummary = {
  currentPoints: number
  monthlyPoints: number
  completedMissions: number
  availableMissions: number
  newMissions: number
}

export type StatCard = {
  id: string
  pill: string
  label: string
  value: string
  helper: string
  helperTone: 'up' | 'muted'
  icon: 'grid' | 'wallet'
  iconTone: 'purple' | 'blue'
  to: string
}

export type BentoCard = {
  id: string
  subtitle: string
  title: string
  summaryLine?: string
  cta?: string
  variant: 'light' | 'slate'
  visual: 'bell' | 'cards'
  badge?: string
  progressPercent?: number
}

export type PromoSlide = {
  id: string
  titleLines: [string, string]
  meta: string
  visual: 'shield' | 'target' | 'bell'
  accent: 'blue' | 'violet' | 'emerald'
}

export type Category = {
  id: string
  label: string
  iconKey: 'shopping' | 'app' | 'survey' | 'review' | 'trial' | 'game' | 'health' | 'finance'
  tone: 'blue' | 'slate' | 'green' | 'purple' | 'orange' | 'teal' | 'amber'
  badge?: string
  badgeTone?: 'red' | 'blue'
}

export type Offer = {
  id: string
  categoryId: Category['id']
  thumbnailKey: 'shopping' | 'bank' | 'survey' | 'review' | 'delivery' | 'walking'
  imageSrc: string
  logoSrc: string
  category: string
  title: string
  description: string
  rewardPoints: number
  deadlineLabel: string
  participants: number
  progress: number
  thumbTone: 'orange' | 'blue' | 'green' | 'purple' | 'rose' | 'amber'
  progressTone: 'red' | 'blue' | 'green' | 'amber' | 'purple'
  badge?: string
  badgeTone?: 'red' | 'blue' | 'amber'
  ctaLabel: string
  ctaDisabled?: boolean
  listTag: string
  listSummary: string
  statusTone: 'green' | 'amber'
  steps: string[]
}

export type TipCard = {
  id: string
  label: string
  title: string
  variant: 'light' | 'blue' | 'amber'
  illustration: 'clipboard' | 'app-card' | 'simulator' | 'review' | 'target' | 'alarm'
}

export type HistorySummary = {
  id: string
  label: string
  value: string
  helper: string
}

export type HistoryEntry = {
  id: string
  brand: string
  title: string
  category: string
  status: 'completed' | 'review' | 'pending'
  points: number
  date: string
  note: string
  logoSrc: string
}

export type RewardHighlight = {
  id: string
  label: string
  value: string
  helper: string
}

export type RewardItem = {
  id: string
  brand: string
  title: string
  description: string
  pointsCost: number
  badge?: string
  availability: 'available' | 'almost' | 'locked'
  logoSrc: string
}

export type NoticeData = {
  title: string
  description: string
  date: string
  body: string[]
}

export type LevelOverview = {
  currentLevel: string
  nextLevel: string
  missionProgressLabel: string
  pointsProgressLabel: string
  summary: string
}

export type LevelTier = {
  id: string
  name: string
  missionRequirement: string
  pointRequirement: string
  benefit: string
  tone: 'slate' | 'blue' | 'violet' | 'amber'
}

export type LevelBenefit = {
  id: string
  title: string
  description: string
}

export type TopMissionEntry = {
  id: string
  rank: number
  brand: string
  title: string
  category: string
  rewardPoints: number
  participants: number
  deadlineLabel: string
  highlight: string
  logoSrc: string
}

export const navItems: NavItem[] = [
  { id: 'offerwall', label: '오퍼월', to: '/' },
  { id: 'mission', label: '미션', to: '/missions' },
  { id: 'history', label: '히스토리', to: '/history' },
  { id: 'reward-shop', label: '리워드샵', to: '/reward-shop' },
]

export const userSummary: UserSummary = {
  currentPoints: 4850,
  monthlyPoints: 12400,
  completedMissions: 27,
  availableMissions: 48,
  newMissions: 9,
}

export const statCards: StatCard[] = [
  {
    id: 'available',
    pill: '지금 바로 참여 가능',
    label: '참여 가능 미션',
    value: '48',
    helper: '미션 탐색으로 이동',
    helperTone: 'up',
    icon: 'grid',
    iconTone: 'purple',
    to: '/missions',
  },
  {
    id: 'points',
    pill: '지금 교환 가능한 포인트',
    label: '보유 포인트',
    value: '4,850',
    helper: '리워드샵에서 확인',
    helperTone: 'muted',
    icon: 'wallet',
    iconTone: 'blue',
    to: '/reward-shop',
  },
]

export const bentoCards: BentoCard[] = [
  {
    id: 'level-up',
    subtitle: '더 많이 참여할수록',
    title: 'Gold 등급에서 다음 단계로',
    summaryLine: 'Platinum까지 13개 남음',
    cta: 'Platinum까지 13개 남음',
    variant: 'light',
    visual: 'bell',
    badge: 'G',
    progressPercent: 13,
  },
  {
    id: 'top10',
    subtitle: '이번 달 가장 핫한',
    title: '인기 미션 TOP 10은?',
    summaryLine: '캐시워크 앱 설치 후 첫 걷기 완료 · 450명 참여',
    variant: 'slate',
    visual: 'cards',
  },
]

export const promoSlides: PromoSlide[] = [
  {
    id: 'review-hot',
    titleLines: ['네이버 맛집 리뷰 3개 작성', '지금 바로 참여하기'],
    meta: '참여 201명 · D-1',
    visual: 'shield',
    accent: 'blue',
  },
  {
    id: 'bank-signup',
    titleLines: ['토스뱅크 가입 완료하고', '즉시 적립 시작하기'],
    meta: '참여 128명 · D-7',
    visual: 'target',
    accent: 'violet',
  },
  {
    id: 'walk-mission',
    titleLines: ['캐시워크 첫 걷기 미션', '오늘 안에 달성하기'],
    meta: '참여 450명 · D-5',
    visual: 'bell',
    accent: 'emerald',
  },
]

export const categories: Category[] = [
  { id: 'shopping', label: '쇼핑/구매', iconKey: 'shopping', tone: 'blue', badge: 'HOT', badgeTone: 'red' },
  { id: 'app', label: '앱 설치', iconKey: 'app', tone: 'slate' },
  { id: 'survey', label: '설문조사', iconKey: 'survey', tone: 'green', badge: 'N', badgeTone: 'blue' },
  { id: 'review', label: '리뷰 작성', iconKey: 'review', tone: 'purple' },
  { id: 'trial', label: '무료 체험', iconKey: 'trial', tone: 'orange' },
  { id: 'game', label: '게임 참여', iconKey: 'game', tone: 'blue' },
  { id: 'health', label: '운동/건강', iconKey: 'health', tone: 'teal' },
  { id: 'finance', label: '금융/카드', iconKey: 'finance', tone: 'amber' },
]

export const offers: Offer[] = [
  {
    id: 'shop1',
    categoryId: 'shopping',
    thumbnailKey: 'shopping',
    imageSrc: musinsaImage,
    logoSrc: musinsaLogo,
    category: '쇼핑 / 구매',
    title: '무신사 첫 구매 5만원 이상',
    description: '첫 구매 후 영수증 인증 시 포인트 즉시 지급',
    rewardPoints: 3500,
    deadlineLabel: '마감 D-2',
    participants: 342,
    progress: 78,
    thumbTone: 'orange',
    progressTone: 'red',
    badge: 'HOT',
    badgeTone: 'red',
    ctaLabel: '참여하기',
    listTag: '쇼핑',
    listSummary: '영수증 인증 · 마감 D-2',
    statusTone: 'green',
    steps: [
      '무신사 앱 또는 웹사이트에 접속합니다.',
      '5만원 이상 상품을 첫 구매합니다.',
      '영수증 캡처 후 인증 버튼으로 제출합니다.',
      '검토 후 24시간 내 포인트가 지급됩니다.',
    ],
  },
  {
    id: 'app1',
    categoryId: 'finance',
    thumbnailKey: 'bank',
    imageSrc: tossImage,
    logoSrc: tossLogo,
    category: '앱 설치 / 가입',
    title: '토스뱅크 앱 설치 후 회원가입',
    description: '앱 다운로드 → 본인인증 → 회원가입 완료',
    rewardPoints: 2000,
    deadlineLabel: '마감 D-7',
    participants: 128,
    progress: 32,
    thumbTone: 'blue',
    progressTone: 'blue',
    badge: 'NEW',
    badgeTone: 'blue',
    ctaLabel: '참여하기',
    listTag: '앱 설치',
    listSummary: '앱 설치 · 마감 D-7',
    statusTone: 'green',
    steps: [
      '앱스토어에서 토스뱅크를 검색합니다.',
      '앱을 설치하고 실행합니다.',
      '본인인증 후 회원가입을 완료합니다.',
      '가입 완료 화면 스크린샷을 제출합니다.',
    ],
  },
  {
    id: 'survey1',
    categoryId: 'survey',
    thumbnailKey: 'survey',
    imageSrc: mzImage,
    logoSrc: mzLogo,
    category: '설문조사',
    title: 'MZ세대 소비 트렌드 설문 (약 5분)',
    description: '간단한 질문에 답하고 포인트를 받아가세요',
    rewardPoints: 800,
    deadlineLabel: '마감 D-14',
    participants: 89,
    progress: 20,
    thumbTone: 'green',
    progressTone: 'green',
    ctaLabel: '참여하기',
    listTag: '설문',
    listSummary: '설문 참여 · 마감 D-14',
    statusTone: 'green',
    steps: [
      '설문 페이지로 이동합니다.',
      '약 5분 동안 설문에 응답합니다.',
      '완료 후 확인 코드를 메모합니다.',
      '확인 코드 입력 후 포인트가 자동 지급됩니다.',
    ],
  },
  {
    id: 'review1',
    categoryId: 'review',
    thumbnailKey: 'review',
    imageSrc: naverImage,
    logoSrc: naverLogo,
    category: '리뷰 작성',
    title: '네이버 맛집 리뷰 3개 작성',
    description: '방문한 음식점 리뷰 작성 후 스크린샷 인증',
    rewardPoints: 1200,
    deadlineLabel: '마감 D-1',
    participants: 201,
    progress: 92,
    thumbTone: 'purple',
    progressTone: 'amber',
    badge: '마감임박',
    badgeTone: 'amber',
    ctaLabel: '마감 예정',
    ctaDisabled: true,
    listTag: '리뷰',
    listSummary: '리뷰 인증 · 마감 D-1',
    statusTone: 'amber',
    steps: [
      '네이버 지도 앱에서 방문한 맛집 3곳을 검색합니다.',
      '각 음식점에 리뷰를 50자 이상 작성합니다.',
      '리뷰 화면 스크린샷 3장을 저장합니다.',
      '인증 제출란에 스크린샷을 업로드합니다.',
    ],
  },
  {
    id: 'free1',
    categoryId: 'trial',
    thumbnailKey: 'delivery',
    imageSrc: coupangImage,
    logoSrc: coupangLogo,
    category: '무료 체험',
    title: '쿠팡이츠 첫 주문 무료 체험권 수령',
    description: '첫 주문 시 1만원 할인 쿠폰 수령 후 인증',
    rewardPoints: 1500,
    deadlineLabel: '마감 D-10',
    participants: 55,
    progress: 15,
    thumbTone: 'rose',
    progressTone: 'purple',
    badge: 'NEW',
    badgeTone: 'blue',
    ctaLabel: '참여하기',
    listTag: '체험',
    listSummary: '쿠폰 수령 · 마감 D-10',
    statusTone: 'green',
    steps: [
      '쿠팡이츠 앱을 설치하거나 실행합니다.',
      '첫 주문 시 1만원 할인 쿠폰을 수령합니다.',
      '쿠폰 적용 후 주문을 완료합니다.',
      '주문 완료 화면 스크린샷을 제출합니다.',
    ],
  },
  {
    id: 'app2',
    categoryId: 'health',
    thumbnailKey: 'walking',
    imageSrc: cashwalkImage,
    logoSrc: cashwalkLogo,
    category: '앱 설치',
    title: '캐시워크 앱 설치 후 첫 걷기 완료',
    description: '설치 후 1,000보 달성 시 포인트 지급',
    rewardPoints: 500,
    deadlineLabel: '마감 D-5',
    participants: 450,
    progress: 60,
    thumbTone: 'amber',
    progressTone: 'amber',
    ctaLabel: '참여하기',
    listTag: '앱 설치',
    listSummary: '첫 걷기 달성 · 마감 D-5',
    statusTone: 'green',
    steps: [
      '앱스토어에서 캐시워크를 설치합니다.',
      '앱을 실행하고 회원가입합니다.',
      '오늘 하루 1,000보를 걸어 달성합니다.',
      '달성 화면 스크린샷을 제출합니다.',
    ],
  },
]

export const tips: TipCard[] = [
  {
    id: 'survey-tip',
    label: '#설문 #빠른적립',
    title: '5분 설문으로\n800P 즉시 적립!',
    variant: 'light',
    illustration: 'clipboard',
  },
  {
    id: 'install-tip',
    label: '#앱설치 #자동지급',
    title: '앱 설치만 해도\n포인트 자동 지급',
    variant: 'light',
    illustration: 'app-card',
  },
  {
    id: 'simulator',
    label: '리워드 시뮬레이터',
    title: '이번 달 목표 달성하면\n예상 포인트는?',
    variant: 'blue',
    illustration: 'simulator',
  },
  {
    id: 'review-tip',
    label: '무료 참여 기회',
    title: '우리 브랜드 리뷰\n작성하고 포인트 받기',
    variant: 'light',
    illustration: 'review',
  },
  {
    id: 'targeting',
    label: '맞춤형 미션 추천',
    title: '내 관심사에 맞는\n미션 찾기',
    variant: 'light',
    illustration: 'target',
  },
  {
    id: 'partner',
    label: '파트너 알림 (새창)',
    title: '맞춤형 광고 미션이\n도착했습니다!',
    variant: 'amber',
    illustration: 'alarm',
  },
]

export const historySummary: HistorySummary[] = [
  {
    id: 'joined',
    label: '이번 달 참여',
    value: '18건',
    helper: '완료 12 · 검수중 4 · 대기 2',
  },
  {
    id: 'earned',
    label: '누적 적립',
    value: '24,850P',
    helper: '이번 주 +4,300P',
  },
  {
    id: 'conversion',
    label: '완료율',
    value: '67%',
    helper: '지난달 대비 +8%',
  },
]

export const historyEntries: HistoryEntry[] = [
  {
    id: 'entry-musinsa',
    brand: 'MUSINSA',
    title: '무신사 첫 구매 5만원 이상',
    category: '쇼핑 / 구매',
    status: 'completed',
    points: 3500,
    date: '2026.03.29',
    note: '영수증 인증 완료, 즉시 적립',
    logoSrc: musinsaLogo,
  },
  {
    id: 'entry-toss',
    brand: 'Toss Bank',
    title: '토스뱅크 앱 설치 후 회원가입',
    category: '앱 설치 / 가입',
    status: 'review',
    points: 2000,
    date: '2026.03.28',
    note: '가입 스크린샷 검수중',
    logoSrc: tossLogo,
  },
  {
    id: 'entry-mz',
    brand: 'MZ Panel',
    title: 'MZ세대 소비 트렌드 설문',
    category: '설문조사',
    status: 'completed',
    points: 800,
    date: '2026.03.27',
    note: '설문 응답 완료',
    logoSrc: mzLogo,
  },
  {
    id: 'entry-naver',
    brand: 'NAVER',
    title: '네이버 맛집 리뷰 3개 작성',
    category: '리뷰 작성',
    status: 'pending',
    points: 1200,
    date: '2026.03.26',
    note: '추가 리뷰 확인 필요',
    logoSrc: naverLogo,
  },
  {
    id: 'entry-coupang',
    brand: 'Coupang Eats',
    title: '쿠팡이츠 첫 주문 무료 체험권',
    category: '무료 체험',
    status: 'completed',
    points: 1500,
    date: '2026.03.25',
    note: '첫 주문 인증 완료',
    logoSrc: coupangLogo,
  },
]

export const rewardHighlights: RewardHighlight[] = [
  {
    id: 'balance',
    label: '현재 교환 가능 포인트',
    value: '4,850P',
    helper: '즉시 교환 가능',
  },
  {
    id: 'monthly',
    label: '이번 달 예상 교환',
    value: '2건',
    helper: '평균 교환 단가 2,000P',
  },
  {
    id: 'best',
    label: '가장 인기 있는 리워드',
    value: '네이버페이',
    helper: '최근 7일 교환 128건',
  },
]

export const rewardItems: RewardItem[] = [
  {
    id: 'reward-naver',
    brand: 'NAVER',
    title: '네이버페이 5,000원',
    description: '간편 결제 포인트로 즉시 교환',
    pointsCost: 5000,
    badge: '추천',
    availability: 'almost',
    logoSrc: naverLogo,
  },
  {
    id: 'reward-coupang',
    brand: 'Coupang',
    title: '쿠팡이츠 3,000원 할인권',
    description: '첫 주문/재주문 모두 사용 가능',
    pointsCost: 2800,
    badge: '즉시 교환',
    availability: 'available',
    logoSrc: coupangLogo,
  },
  {
    id: 'reward-musinsa',
    brand: 'MUSINSA',
    title: '무신사 10,000원 쿠폰',
    description: '패션 카테고리 인기 리워드',
    pointsCost: 7500,
    availability: 'locked',
    logoSrc: musinsaLogo,
  },
  {
    id: 'reward-toss',
    brand: 'Toss',
    title: '토스 포인트 3,000P 전환',
    description: '계정 연동 후 바로 전환',
    pointsCost: 3000,
    badge: '인기',
    availability: 'available',
    logoSrc: tossLogo,
  },
  {
    id: 'reward-cashwalk',
    brand: 'Cashwalk',
    title: '캐시워크 쿠폰팩',
    description: '헬스/걷기 챌린지 보상 번들',
    pointsCost: 2400,
    availability: 'available',
    logoSrc: cashwalkLogo,
  },
  {
    id: 'reward-panel',
    brand: 'MZ Panel',
    title: '설문 전용 프리미엄 미션권',
    description: '고단가 설문 우선 노출',
    pointsCost: 4200,
    availability: 'almost',
    logoSrc: mzLogo,
  },
]

export const levelOverview: LevelOverview = {
  currentLevel: 'Gold',
  nextLevel: 'Platinum',
  missionProgressLabel: '이번 달 27 / 40개 미션 완료',
  pointsProgressLabel: '누적 36,800P / 50,000P',
  summary: '지금 페이스를 유지하면 이번 주 안에 Platinum 등급에 도달할 수 있어요.',
}

export const levelTiers: LevelTier[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    missionRequirement: '가입 후 기본 등급',
    pointRequirement: '0P',
    benefit: '기본 미션 참여, 신규 미션 알림',
    tone: 'slate',
  },
  {
    id: 'silver',
    name: 'Silver',
    missionRequirement: '월 10개 미션',
    pointRequirement: '10,000P',
    benefit: '검수 우선 처리, 추천 미션 노출 강화',
    tone: 'blue',
  },
  {
    id: 'gold',
    name: 'Gold',
    missionRequirement: '월 25개 미션',
    pointRequirement: '30,000P',
    benefit: '고단가 미션 우선 제공, 특별 배지 지급',
    tone: 'violet',
  },
  {
    id: 'platinum',
    name: 'Platinum',
    missionRequirement: '월 40개 미션',
    pointRequirement: '50,000P',
    benefit: '파트너 한정 미션, 리워드 교환 우선권',
    tone: 'amber',
  },
]

export const levelBenefits: LevelBenefit[] = [
  {
    id: 'priority-review',
    title: '검수 우선 처리',
    description: '등급이 높아질수록 인증 검수와 적립 반영 속도가 빨라집니다.',
  },
  {
    id: 'exclusive-offers',
    title: '고단가 미션 우선 노출',
    description: '전환율이 좋은 쇼핑/금융 계열 미션을 먼저 추천받을 수 있습니다.',
  },
  {
    id: 'reward-perks',
    title: '리워드 교환 혜택',
    description: '상위 등급은 교환 가능 리워드 범위와 우선권이 더 넓어집니다.',
  },
]

export const topMissionEntries: TopMissionEntry[] = [
  {
    id: 'top-musinsa',
    rank: 1,
    brand: 'MUSINSA',
    title: '무신사 첫 구매 5만원 이상',
    category: '쇼핑 / 구매',
    rewardPoints: 3500,
    participants: 342,
    deadlineLabel: '마감 D-2',
    highlight: '전환율 1위',
    logoSrc: musinsaLogo,
  },
  {
    id: 'top-toss',
    rank: 2,
    brand: 'Toss Bank',
    title: '토스뱅크 앱 설치 후 회원가입',
    category: '금융 / 카드',
    rewardPoints: 2000,
    participants: 128,
    deadlineLabel: '마감 D-7',
    highlight: '신규 인기',
    logoSrc: tossLogo,
  },
  {
    id: 'top-naver',
    rank: 3,
    brand: 'NAVER',
    title: '네이버 맛집 리뷰 3개 작성',
    category: '리뷰 작성',
    rewardPoints: 1200,
    participants: 201,
    deadlineLabel: '마감 D-1',
    highlight: '마감 임박',
    logoSrc: naverLogo,
  },
  {
    id: 'top-coupang',
    rank: 4,
    brand: 'Coupang Eats',
    title: '쿠팡이츠 첫 주문 무료 체험권 수령',
    category: '무료 체험',
    rewardPoints: 1500,
    participants: 55,
    deadlineLabel: '마감 D-10',
    highlight: '재참여율 상승',
    logoSrc: coupangLogo,
  },
  {
    id: 'top-mz',
    rank: 5,
    brand: 'MZ Panel',
    title: 'MZ세대 소비 트렌드 설문 참여',
    category: '설문조사',
    rewardPoints: 800,
    participants: 89,
    deadlineLabel: '마감 D-14',
    highlight: '완료율 우수',
    logoSrc: mzLogo,
  },
  {
    id: 'top-cashwalk',
    rank: 6,
    brand: 'Cashwalk',
    title: '캐시워크 첫 걷기 미션 완료',
    category: '운동 / 건강',
    rewardPoints: 500,
    participants: 450,
    deadlineLabel: '마감 D-5',
    highlight: '참여자 최다',
    logoSrc: cashwalkLogo,
  },
  {
    id: 'top-musinsa-style',
    rank: 7,
    brand: 'MUSINSA',
    title: '스타일 추천 상품 찜하기',
    category: '쇼핑 / 구매',
    rewardPoints: 700,
    participants: 174,
    deadlineLabel: '마감 D-6',
    highlight: '가벼운 참여형',
    logoSrc: musinsaLogo,
  },
  {
    id: 'top-toss-check',
    rank: 8,
    brand: 'Toss',
    title: '계좌 연결 후 혜택 확인하기',
    category: '금융 / 카드',
    rewardPoints: 900,
    participants: 142,
    deadlineLabel: '마감 D-9',
    highlight: '초보자 추천',
    logoSrc: tossLogo,
  },
  {
    id: 'top-naver-place',
    rank: 9,
    brand: 'NAVER',
    title: '장소 저장 후 리뷰 예정 등록',
    category: '리뷰 작성',
    rewardPoints: 600,
    participants: 97,
    deadlineLabel: '마감 D-4',
    highlight: '진입 난이도 낮음',
    logoSrc: naverLogo,
  },
  {
    id: 'top-coupang-coupon',
    rank: 10,
    brand: 'Coupang',
    title: '첫 주문 쿠폰 다운로드 인증',
    category: '무료 체험',
    rewardPoints: 650,
    participants: 118,
    deadlineLabel: '마감 D-12',
    highlight: '체험형 인기',
    logoSrc: coupangLogo,
  },
]

export const notice: NoticeData = {
  title: '알려드려요',
  description: 'AdWall 개인정보처리방침 변경 예정 공지',
  date: '2026.01.30',
  body: [
    '2026년 4월 15일부터 AdWall 개인정보처리방침이 개정될 예정입니다. 이번 개정은 리워드 지급 검수 과정에서 수집되는 인증 자료의 보관 기간과 처리 목적을 보다 명확하게 안내하기 위한 변경입니다.',
    '회원이 제출한 스크린샷과 영수증 이미지는 기존과 동일하게 미션 검수 및 부정 참여 방지 목적으로만 활용되며, 개정 이후에는 보관 기간과 파기 절차가 문서에 구체적으로 명시됩니다.',
    '시행 전까지 주요 변경 사항 요약본과 전체 약관 전문을 별도 공지로 다시 안내할 예정이며, 변경 내용에 동의하지 않는 경우 시행일 전까지 고객센터를 통해 문의할 수 있습니다.',
  ],
}

export const footerLinks = [
  { label: '회사소개', href: '#' },
  { label: '개인정보처리방침', href: '#', emphasized: true },
  { label: '이용약관', href: '#' },
  { label: '데이터보안정책', href: '#' },
  { label: '저작권 정책', href: '#' },
  { label: '사이트맵', href: '#' },
]

export const companyInfo = {
  phone: '1588-0000',
  email: 'support@adwall.kr',
  name: 'AdWall(주)',
  address: '서울특별시 강남구 테헤란로 456 (역삼동 78-9)',
  ceo: '대표이사 박애드',
  businessNumber: '456-78-01234',
  salesReport: '2026-서울강남-1234',
}
