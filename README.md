# Offerwall Web Frontend

오퍼월 서비스의 메인 대시보드, 미션 탐색, 참여 내역, 리워드샵을 하나의 SPA로 구현한 포트폴리오 프로젝트입니다.  
광고/리워드 미션 플랫폼을 가정하고, 실제 서비스처럼 보이는 대시보드형 UI와 반응형 UX를 React + TypeScript + Tailwind CSS로 재구성했습니다.

## 프로젝트 개요

- **프로젝트 목표**
  - 오퍼월 서비스의 핵심 화면을 포트폴리오 수준으로 재구성
  - 데스크탑과 모바일에서 모두 자연스럽게 동작하는 SPA 구현
  - 실제 API 없이도 서비스 흐름을 확인할 수 있도록 목업 데이터 기반 UX 설계
- **핵심 키워드**
  - `React SPA`
  - `TypeScript`
  - `Tailwind CSS`
  - `Responsive Web`
  - `Mock Data`
  - `Dashboard UI`

## 주요 기능

### 1. 홈 `/`

오퍼월의 핵심 상태와 탐색 진입점을 한 화면에 모은 메인 대시보드입니다.

- **포인트 현황 히어로 카드**
  - 이번 달 적립 포인트를 큰 숫자로 강조
  - 현재 교환 가능 포인트를 보조 텍스트로 노출
  - 우측 시각 장식 요소를 통해 서비스형 대시보드 분위기 구성
- **HOT 프로모션 자동 슬라이드**
  - 데스크탑에서 3개의 프로모션이 자동 순환
  - dot 인디케이터 클릭 시 특정 슬라이드로 이동 가능
- **완료 미션 카드**
  - 월간 완료 미션 수를 강조
  - 카드 클릭 시 히스토리 페이지로 이동
- **통계 카드**
  - 참여 가능 미션, 보유 포인트를 요약 카드로 제공
  - 클릭 시 각 목적 페이지로 이동
- **요약 대시보드 카드**
  - `AdWall 등급 올리기`
  - `인기 미션 TOP 10은?`
  - 두 카드는 홈에서 요약 모달로 연결
- **카테고리 필터**
  - 홈에서도 카테고리 선택 가능
  - 선택한 카테고리에 맞춰 인기 미션과 리스트형 미션을 함께 필터링
  - 모바일에서는 가로 스와이프형 카테고리 UI 적용
- **인기 미션 카드 / 리스트형 미션**
  - 동일한 목업 데이터를 카드형과 리스트형으로 재사용
  - 클릭 시 상세 모달 오픈
- **미션 상세 모달**
  - 미션 정보, 예상 적립 포인트, 참여 단계 표시
  - 참여 버튼 클릭 시 토스트 피드백 제공
- **공지 바 + 공지 상세 모달**
  - 하단 공지 바를 통해 상세 공지 모달 오픈
- **미션 팁 섹션**
  - 정보성 카드 6개 제공
  - 현재는 상세 페이지 없이 콘텐츠 섹션 역할에 집중

### 2. 미션 페이지 `/missions`

참여 가능한 미션을 탐색하는 전용 페이지입니다.

- `Mission Explorer` 히어로 섹션
- 카테고리 필터 기반 미션 탐색
- 추천 미션 카드 그리드
- 전체 미션 목록
- 선택한 카테고리에 데이터가 없을 경우 빈 상태 UI 제공
- 미션 상세 모달 및 참여 토스트 재사용
- 모바일에서는 히어로를 더 컴팩트하게 줄이고, 카테고리를 한 줄 스와이프 UI로 최적화

### 3. 히스토리 페이지 `/history`

사용자의 참여/적립 이력을 확인하는 페이지입니다.

- 요약 KPI 카드
  - 이번 달 참여
  - 누적 적립
  - 완료율
- 최근 활동 내역 리스트
- 상태 배지
  - 적립 완료
  - 검수중
  - 추가 확인
- 모바일에서는 상단 KPI를 `2 + 1` 구조로 재배치

### 4. 리워드샵 페이지 `/reward-shop`

현재 포인트로 교환 가능한 리워드를 확인하는 페이지입니다.

- 상단 리워드샵 히어로
- 리워드 요약 카드
  - 현재 교환 가능 포인트
  - 이번 달 예상 교환
  - 가장 인기 있는 리워드
- 리워드 카드 목록
  - 즉시 교환
  - 조금만 더
  - 포인트 부족
- 포인트 상태에 따른 CTA 문구 분기
- 모바일에서는 요약 카드를 `2 + 1` 구조로 재배치

## 공통 UX / 인터랙션

- **SPA 라우팅**
  - `react-router-dom` 기반 라우트 전환
  - 페이지 이동 시 새로고침 없이 화면 전환
- **공통 레이아웃**
  - `AppShell`에서 헤더, 푸터, 배경, 스크롤 탑 버튼 공통 적용
- **모바일 네비게이션**
  - 햄버거 버튼 기반 드롭다운 메뉴
  - `오퍼월 / 미션 / 히스토리 / 리워드샵` 이동 지원
- **스크롤 탑 버튼**
  - 일정 스크롤 이후 표시
  - 클릭 시 상단 이동
- **모달 UX**
  - ESC 닫기
  - 배경 클릭 닫기
  - 모달 오픈 시 body scroll lock
- **대시보드 요약 모달**
  - 모바일에서 바텀시트형으로 표시
  - 데스크탑에서는 중앙 모달로 표시

## SPA 구조

이 프로젝트는 여러 HTML 페이지를 따로 만드는 방식이 아니라, 하나의 React 앱 안에서 라우터와 상태를 조합해 화면을 전환하는 구조입니다.

### 1. 라우터 구조

`src/App.tsx`에서 `BrowserRouter`와 `Routes`를 사용해 4개의 메인 라우트를 구성합니다.

- `/` → `OfferwallPage`
- `/missions` → `MissionsPage`
- `/history` → `HistoryPage`
- `/reward-shop` → `RewardShopPage`

모든 라우트는 `AppShell`로 감싸져 있어 공통 레이아웃을 공유합니다.

```tsx
BrowserRouter
└── Routes
    ├── "/" -> AppShell -> OfferwallPage
    ├── "/missions" -> AppShell -> MissionsPage
    ├── "/history" -> AppShell -> HistoryPage
    └── "/reward-shop" -> AppShell -> RewardShopPage
```

### 2. 공통 레이아웃 구조

`src/components/AppShell.tsx`가 모든 페이지의 공통 wrapper 역할을 맡습니다.

- `Header`
- `main`
- `Footer`
- `ScrollToTopButton`
- 페이지 전환 시 스크롤 상단 이동
- 상단 배경 그래디언트와 전역 레이아웃 처리

즉, 페이지별 콘텐츠만 바뀌고 전체 서비스의 프레임은 유지되는 SPA 구조입니다.

### 3. 컴포넌트 계층

홈 화면과 공용 UI의 중심은 `src/components/OfferwallPage.tsx`입니다.

```tsx
App
└── BrowserRouter
    └── Routes
        ├── "/" 
        │   └── AppShell
        │       ├── Header
        │       ├── OfferwallPage
        │       │   ├── HeroSection
        │       │   ├── StatsSection
        │       │   ├── CategorySection
        │       │   ├── FeaturedOffersSection
        │       │   ├── OfferListSection
        │       │   ├── TipsSection
        │       │   ├── NoticeBar
        │       │   ├── OfferDetailModal
        │       │   ├── NoticeDetailModal
        │       │   ├── DashboardSummaryModal
        │       │   └── Toast
        │       ├── Footer
        │       └── ScrollToTopButton
        ├── "/missions" -> AppShell -> MissionsPage
        ├── "/history" -> AppShell -> HistoryPage
        └── "/reward-shop" -> AppShell -> RewardShopPage
```

### 4. 라우터 상태와 페이지 내부 상태의 분리

이 프로젝트는 역할을 두 단계로 나눕니다.

- **라우터가 담당하는 것**
  - 어떤 페이지를 보여줄지
  - `/`, `/missions`, `/history`, `/reward-shop` 전환
- **페이지 내부 state가 담당하는 것**
  - 어떤 미션 상세 모달이 열렸는지
  - 공지 모달이 열렸는지
  - 대시보드 요약 모달이 열렸는지
  - 카테고리가 무엇으로 선택됐는지
  - 토스트가 노출 중인지

예를 들어 홈에서는 다음 상태를 직접 관리합니다.

- `selectedOffer`
- `selectedCategory`
- `noticeOpen`
- `activeDashboardModal`
- `toastVisible`

즉, 이 프로젝트의 SPA는 `페이지 전환은 Router`, `상세 인터랙션은 컴포넌트 state`로 분리된 구조입니다.

## 기술 스택

### Frontend

- **React 19**
  - 컴포넌트 기반 화면 구성
  - 상태 기반 인터랙션 처리
- **TypeScript**
  - 목업 데이터와 컴포넌트 props 타입 안정성 확보
- **React Router DOM 7**
  - 홈, 미션, 히스토리, 리워드샵 라우팅
- **Tailwind CSS 4**
  - 유틸리티 클래스 기반 UI 구현
  - 반응형 레이아웃과 상태 스타일링 처리
- **Pretendard**
  - 한국어 중심 UI를 위한 전역 폰트 적용

### Build / Tooling

- **Vite 8**
  - 빠른 개발 서버와 프로덕션 빌드
- **@tailwindcss/vite**
  - Tailwind CSS와 Vite 통합
- **ESLint 9**
  - 기본 정적 코드 검증

## 구현 포인트

### 1. 목업 데이터 중심 설계

`src/data/mockData.ts`에서 페이지별 데이터를 관리합니다.

- 네비게이션
- 사용자 요약 정보
- 통계 카드 / 대시보드 카드
- 프로모션 슬라이드
- 카테고리
- 오퍼 카드 데이터
- 팁 카드
- 히스토리 데이터
- 리워드 데이터
- 공지 데이터

즉, 화면을 먼저 완성하고 나중에 API로 교체하기 쉬운 구조를 목표로 했습니다.

### 2. 공통 UI 재사용

홈에서 만든 UI를 다른 페이지에서도 재사용하도록 구성했습니다.

- `CategorySection`
- `FeaturedOffersSection`
- `OfferListSection`
- `NoticeBar`
- `OfferDetailModal`
- `Toast`
- `ScrollToTopButton`

이 구조 덕분에 홈과 미션 페이지가 다른 화면이면서도 같은 서비스처럼 보이도록 맞출 수 있습니다.

### 3. 반응형 최적화

단순히 축소하는 방식이 아니라, 모바일과 데스크탑에서 정보 우선순위를 다르게 설계했습니다.

- 홈 모바일
  - 프로모션보다 포인트/완료 미션/요약 정보 우선
- 카테고리
  - 모바일: 스와이프형
  - 데스크탑: 그리드형
- 히스토리/리워드 요약 카드
  - 모바일: `2 + 1`
  - 데스크탑: 3열
- 햄버거 메뉴
  - 모바일 전용 드롭다운 메뉴 제공

### 4. 서비스형 UI 디테일

- 카드별 shadow depth 분리
- badge / helper text / KPI 숫자 계층 정리
- hover와 transition을 과하지 않게 적용
- 이미지 크기가 제각각이어도 `object-cover` / `object-contain`으로 안전하게 수용

## 프로젝트 구조

```bash
src
├── components
│   ├── AppShell.tsx
│   └── OfferwallPage.tsx
├── pages
│   ├── MissionsPage.tsx
│   ├── HistoryPage.tsx
│   └── RewardShopPage.tsx
├── data
│   └── mockData.ts
├── assets
│   └── ...images / logos
├── App.tsx
├── main.tsx
└── index.css
```

### 주요 파일 역할

- **`src/App.tsx`**
  - 라우트 정의
- **`src/components/AppShell.tsx`**
  - 공통 레이아웃, 스크롤 리셋, 스크롤 탑 버튼
- **`src/components/OfferwallPage.tsx`**
  - 홈 화면과 공통 UI 컴포넌트의 핵심 구현
- **`src/pages/*`**
  - 라우트별 개별 페이지
- **`src/data/mockData.ts`**
  - 목업 데이터와 타입 정의

## 실행 방법

### 1. 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 프로덕션 빌드

```bash
npm run build
```

### 4. 린트 확인

```bash
npm run lint
```

## 사용한 스크립트

- `npm run dev` : Vite 개발 서버 실행
- `npm run build` : TypeScript 빌드 후 Vite 프로덕션 빌드
- `npm run lint` : ESLint 실행
- `npm run preview` : 빌드 결과 미리보기


## 요약

이 프로젝트는 단순한 정적 랜딩 페이지가 아니라,

- 홈 대시보드
- 미션 탐색
- 참여 내역
- 리워드샵

까지 이어지는 오퍼월 서비스 흐름을 하나의 React SPA로 구성한 프론트엔드 포트폴리오입니다.  
목업 데이터 기반이지만 실제 서비스처럼 탐색, 상세 보기, 상태 확인, 반응형 사용 경험을 모두 보여주는 데 초점을 두었습니다.
