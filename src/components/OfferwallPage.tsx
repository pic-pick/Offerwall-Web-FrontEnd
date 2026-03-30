import { useEffect, useState, type KeyboardEvent as ReactKeyboardEvent, type SVGProps } from 'react'
import { Link, NavLink } from 'react-router-dom'

import {
  bentoCards,
  categories,
  companyInfo,
  footerLinks,
  navItems,
  notice,
  offers,
  statCards,
  tips,
  userSummary,
  type BentoCard,
  type Category,
  type Offer,
  type StatCard,
  type TipCard,
} from '../data/mockData'

type IconProps = SVGProps<SVGSVGElement>

const sectionClass = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
const numberFormatter = new Intl.NumberFormat('ko-KR')

const categoryToneClasses: Record<Category['tone'], string> = {
  blue: 'bg-blue-50 text-blue-700',
  slate: 'bg-slate-100 text-slate-700',
  green: 'bg-emerald-50 text-emerald-700',
  purple: 'bg-violet-50 text-violet-700',
  orange: 'bg-orange-50 text-orange-700',
  teal: 'bg-teal-50 text-teal-700',
  amber: 'bg-amber-50 text-amber-700',
}

const categoryBadgeClasses: Record<NonNullable<Category['badgeTone']>, string> = {
  red: 'bg-red-500 text-white',
  blue: 'bg-blue-600 text-white',
}

const offerToneClasses: Record<Offer['thumbTone'], string> = {
  orange: 'bg-orange-50',
  blue: 'bg-blue-50',
  green: 'bg-emerald-50',
  purple: 'bg-violet-50',
  rose: 'bg-fuchsia-50',
  amber: 'bg-amber-50',
}

const progressToneClasses: Record<Offer['progressTone'], string> = {
  red: 'bg-red-500',
  blue: 'bg-blue-600',
  green: 'bg-emerald-500',
  amber: 'bg-amber-500',
  purple: 'bg-violet-500',
}

const offerBadgeClasses: Record<NonNullable<Offer['badgeTone']>, string> = {
  red: 'bg-red-50 text-red-600 ring-1 ring-inset ring-red-100',
  blue: 'bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100',
  amber: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
}

const statusDotClasses: Record<Offer['statusTone'], string> = {
  green: 'bg-emerald-500',
  amber: 'bg-amber-500',
}

const tipCardClasses: Record<TipCard['variant'], string> = {
  light: 'bg-slate-50 text-slate-900 ring-1 ring-inset ring-white/80',
  blue: 'bg-blue-600 text-white shadow-[0_20px_60px_rgba(37,99,235,0.28)]',
  amber: 'bg-orange-50 text-slate-900 ring-1 ring-inset ring-orange-100',
}

const statIconToneClasses: Record<StatCard['iconTone'], string> = {
  purple: 'bg-violet-100 text-violet-700',
  blue: 'bg-blue-100 text-blue-700',
}

export function OfferwallPage() {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [toastVisible, setToastVisible] = useState(false)

  useEffect(() => {
    if (!selectedOffer) {
      document.body.style.overflow = ''
      return
    }

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedOffer(null)
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [selectedOffer])

  useEffect(() => {
    if (!toastVisible) {
      return
    }

    const timeoutId = window.setTimeout(() => setToastVisible(false), 2800)
    return () => window.clearTimeout(timeoutId)
  }, [toastVisible])

  const featuredOffers = offers.slice(0, 3)
  const listOffers = offers.slice(0, 3)
  const tipPreview = tips.slice(0, 3)

  const handleOfferOpen = (offer: Offer) => setSelectedOffer(offer)
  const handleOfferJoin = () => {
    setSelectedOffer(null)
    setToastVisible(true)
  }

  return (
    <>
      <HeroSection />
      <StatsSection />
      <CategorySection actionTo="/missions" />
      <FeaturedOffersSection offers={featuredOffers} onOfferOpen={handleOfferOpen} actionTo="/missions" />
      <TipsSection items={tipPreview} />
      <OfferListSection offers={listOffers} onOfferOpen={handleOfferOpen} actionTo="/missions" />
      <NoticeBar />

      <OfferDetailModal
        offer={selectedOffer}
        onClose={() => setSelectedOffer(null)}
        onJoin={handleOfferJoin}
      />

      <Toast visible={toastVisible} message="미션에 참여했어요. 포인트를 확인하세요." />
    </>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className={`${sectionClass} flex h-16 items-center justify-between gap-4`}>
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white shadow-[0_12px_24px_rgba(37,99,235,0.24)]">
            A
          </div>
          <span className="text-xl font-black tracking-[-0.04em] text-slate-900">
            Ad<span className="text-blue-600">Wall</span>
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <nav className="hidden items-center gap-4 text-sm font-medium text-slate-500 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `transition hover:text-slate-900 ${isActive ? 'text-slate-900' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-700">
              <CoinIcon className="size-3.5" />
              <span>{numberFormatter.format(userSummary.currentPoints)}P</span>
            </div>
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white shadow-[0_8px_20px_rgba(99,102,241,0.24)]"
              aria-label="사용자 프로필"
            >
              김
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export function HeroSection() {
  return (
    <section id="hero" className={`${sectionClass} pt-10 sm:pt-12`}>
      <div className="grid gap-4 lg:grid-cols-[1fr_1.45fr_0.95fr]">
        <div className="group relative overflow-hidden rounded-[2rem] bg-slate-50 p-8 shadow-[0_16px_48px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(15,23,42,0.08)]">
          <Pill>HOT 프로모션</Pill>
          <h1 className="mt-1 text-[1.6rem] leading-[1.25] font-black tracking-[-0.05em] text-slate-900">
            지금 참여하면
            <br />
            2배 포인트!
          </h1>
          <p className="mt-3 text-sm text-slate-500">오늘 자정까지 한정 이벤트</p>
          <div className="mt-6 flex items-center gap-1.5">
            <Dot active />
            <Dot />
            <Dot />
          </div>
          <div className="absolute right-0 bottom-0 flex h-32 w-32 items-center justify-center rounded-tl-[3rem] bg-linear-to-br from-blue-100 to-blue-50 text-blue-500 transition duration-300 group-hover:scale-105">
            <ShieldCheckIcon className="size-11" />
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-[2rem] bg-blue-600 p-8 text-white shadow-[0_24px_64px_rgba(37,99,235,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_72px_rgba(37,99,235,0.34)] sm:p-10">
          <div className="max-w-[21rem] sm:max-w-[24rem] lg:pr-32">
            <Pill inverse>이번 달 적립</Pill>
            <h2 className="mt-3 text-[1.9rem] leading-none font-black tracking-[-0.05em] sm:text-[2.2rem]">
              내 포인트 현황
            </h2>
            <div className="mt-5 flex items-end gap-2">
              <span className="text-5xl leading-none font-black tracking-[-0.08em] sm:text-[4.25rem]">
                {numberFormatter.format(userSummary.monthlyPoints)}
              </span>
              <span className="pb-2 text-lg font-semibold text-blue-100">P ›</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/20 pt-5 text-sm font-semibold text-blue-100 sm:flex-row sm:items-center sm:gap-5">
            <AnchorAction to="/missions">미션 참여</AnchorAction>
            <Divider />
            <AnchorAction to="/reward-shop">포인트 교환</AnchorAction>
            <Divider />
            <AnchorAction to="/history">내 현황</AnchorAction>
          </div>

          <div className="pointer-events-none absolute right-5 bottom-6 hidden h-40 w-40 translate-y-1 sm:block">
            <div className="absolute inset-0 rounded-full bg-blue-400/45 blur-3xl" />
            <div className="absolute inset-4 rotate-12 rounded-[1.7rem] bg-linear-to-br from-white to-blue-100 shadow-[0_20px_48px_rgba(15,23,42,0.18)] transition duration-500 group-hover:rotate-0">
              <div className="absolute -top-3 right-3 rounded-full bg-white px-3 py-1 text-[0.65rem] font-bold whitespace-nowrap text-blue-600 shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
                참여 가능 {userSummary.availableMissions}개
              </div>
              <div className="flex h-full items-center justify-center text-blue-600">
                <ChartIcon className="size-14" />
              </div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-[2rem] bg-slate-50 p-8 shadow-[0_16px_48px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(15,23,42,0.08)]">
          <h2 className="text-[1.5rem] leading-none font-black tracking-[-0.05em] text-slate-900">
            완료 미션
          </h2>
          <div className="mt-4 flex items-center gap-2 text-5xl leading-none font-black tracking-[-0.08em] text-slate-900">
            <span>{numberFormatter.format(userSummary.completedMissions)}</span>
            <ChevronRightIcon className="mt-2 size-5 text-slate-400" />
          </div>
          <p className="mt-16 text-sm text-slate-500">이번 달 완료된 미션 수</p>

          <div className="absolute right-6 top-1/2 flex size-20 -translate-y-1/2 items-center justify-center rounded-full bg-linear-to-br from-blue-400 to-blue-600 text-3xl text-white shadow-[0_16px_32px_rgba(37,99,235,0.28)] transition duration-300 group-hover:scale-105">
            ✓
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        <Dot active />
        <Dot />
        <Dot />
      </div>
    </section>
  )
}

export function StatsSection() {
  return (
    <section className={`${sectionClass} py-6`}>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <StatSummaryCard key={card.id} card={card} />
        ))}

        <div className="space-y-3 xl:col-span-2">
          {bentoCards.map((card) => (
            <BentoSummaryCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function CategorySection({ actionTo = '/missions' }: { actionTo?: string }) {
  return (
    <section className={`${sectionClass} py-8 sm:py-10`}>
      <SectionHeader title="이런 미션은 어떠세요?" actionLabel="전체보기" actionTo={actionTo} />

      <div className="grid grid-cols-4 gap-x-4 gap-y-5 sm:grid-cols-4 lg:grid-cols-8">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className="group flex flex-col items-center gap-2.5 rounded-2xl px-1 py-2 text-center"
          >
            <span
              className={`relative flex size-16 items-center justify-center rounded-full shadow-[0_8px_16px_rgba(15,23,42,0.04)] transition duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_14px_24px_rgba(15,23,42,0.1)] ${categoryToneClasses[category.tone]}`}
            >
              {renderCategoryIcon(category.iconKey, 'size-7')}
              {category.badge && category.badgeTone ? (
                <span
                  className={`absolute -top-1 -right-1 rounded-full px-1.5 py-0.5 text-[0.55rem] font-black tracking-wide ${categoryBadgeClasses[category.badgeTone]}`}
                >
                  {category.badge}
                </span>
              ) : null}
            </span>
            <span className="text-xs font-semibold text-slate-700">{category.label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export function FeaturedOffersSection({
  offers,
  onOfferOpen,
  title = '지금 인기 미션',
  subtitle = '마감 임박 · 고포인트 미션',
  actionLabel = '전체 보기',
  actionTo,
}: {
  offers: Offer[]
  onOfferOpen: (offer: Offer) => void
  title?: string
  subtitle?: string
  actionLabel?: string
  actionTo?: string
}) {
  return (
    <section id="featured-offers" className={`${sectionClass} py-8 sm:py-10`}>
      <SectionHeader
        title={title}
        subtitle={subtitle}
        actionLabel={actionLabel}
        actionTo={actionTo}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} onOpen={onOfferOpen} />
        ))}
      </div>
    </section>
  )
}

export function TipsSection({ items = tips }: { items?: TipCard[] }) {
  return (
    <section id="tips" className={`${sectionClass} py-8 sm:py-10`}>
      <div className="mb-5 flex items-center gap-2">
        <h2 className="text-2xl font-black tracking-[-0.05em] text-slate-900 sm:text-[1.7rem]">
          모르면 손해, <span className="text-blue-600">놓치면 안되는 미션 팁</span>
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((tip) => (
          <TipInsightCard key={tip.id} card={tip} />
        ))}
      </div>
    </section>
  )
}

export function OfferListSection({
  offers,
  onOfferOpen,
  title = '세상에 이런 미션이',
  actionLabel = '전체 보기',
  actionTo,
}: {
  offers: Offer[]
  onOfferOpen: (offer: Offer) => void
  title?: string
  actionLabel?: string
  actionTo?: string
}) {
  return (
    <section id="offer-list" className={`${sectionClass} py-8 sm:py-10`}>
      <SectionHeader title={title} actionLabel={actionLabel} actionTo={actionTo} />

      <div className="space-y-3">
        {offers.map((offer) => (
          <button
            key={offer.id}
            type="button"
            onClick={() => onOfferOpen(offer)}
            className="flex w-full items-center gap-4 rounded-3xl border border-slate-200/80 bg-white px-4 py-4 text-left shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition duration-200 hover:border-blue-200 hover:shadow-[0_18px_28px_rgba(15,23,42,0.08)] sm:px-5"
          >
            <OfferThumbnail offer={offer} layout="compact" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-slate-900 sm:text-[0.95rem]">{offer.title}</div>
              <div className="mt-1 text-xs text-slate-500 sm:text-sm">{offer.listSummary}</div>
            </div>
            <div className={`hidden size-2 shrink-0 rounded-full sm:block ${statusDotClasses[offer.statusTone]}`} />
            <div className="shrink-0 text-right">
              <div className="text-lg font-black tracking-[-0.04em] text-amber-500">
                {numberFormatter.format(offer.rewardPoints)}P
              </div>
              <div className="text-xs font-medium text-slate-400">{offer.listTag}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

export function NoticeBar() {
  return (
    <section className={`${sectionClass} pb-12`}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 rounded-2xl border-y border-slate-200 bg-white/70 px-5 py-4 text-left shadow-[0_12px_20px_rgba(15,23,42,0.03)] transition hover:bg-white"
      >
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
            <InfoIcon className="size-4 text-slate-700" />
            <span>{notice.title}</span>
            <ChevronRightIcon className="size-3.5 text-slate-500" />
          </div>
          <span className="truncate text-sm text-slate-600">{notice.description}</span>
        </div>
        <span className="shrink-0 text-xs text-slate-400">{notice.date}</span>
      </button>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/90 py-12 sm:py-16">
      <div className={`${sectionClass} space-y-8`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm transition hover:text-blue-600 ${link.emphasized ? 'font-extrabold text-slate-900' : 'font-medium text-slate-700'}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="text-left lg:text-right">
            <div className="text-sm font-bold text-slate-900">
              고객센터 <strong className="ml-2 text-2xl tracking-[-0.04em]">{companyInfo.phone}</strong>
            </div>
            <div className="mt-1 text-xs text-slate-500">{companyInfo.email}</div>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-1.5 text-xs leading-6 text-slate-400">
            <p>
              <span className="font-bold text-slate-700">{companyInfo.name}</span> | {companyInfo.address} | {companyInfo.ceo}
            </p>
            <p>
              사업자등록번호 {companyInfo.businessNumber} | 통신판매업신고 {companyInfo.salesReport}
            </p>
            <p>COPYRIGHT© ADWALL SERVICE ALL RIGHTS RESERVED.</p>
          </div>

          <div className="flex size-11 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-400">
            WA
          </div>
        </div>
      </div>
    </footer>
  )
}

function SectionHeader({
  title,
  subtitle,
  actionLabel,
  actionTo,
}: {
  title: string
  subtitle?: string
  actionLabel?: string
  actionTo?: string
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-[1.65rem] leading-none font-black tracking-[-0.05em] text-slate-900">{title}</h2>
        {subtitle ? <p className="mt-2 text-sm text-slate-400">{subtitle}</p> : null}
      </div>
      {actionTo && actionLabel ? (
        <Link to={actionTo} className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700">
          <span>{actionLabel}</span>
          <ChevronRightIcon className="size-4" />
        </Link>
      ) : null}
    </div>
  )
}

function StatSummaryCard({ card }: { card: StatCard }) {
  return (
    <article className="overflow-hidden rounded-[1.6rem] bg-slate-50 p-5 shadow-[0_12px_32px_rgba(15,23,42,0.04)]">
      <div className="flex min-h-[9.75rem] flex-col justify-between">
        <div>
          <div className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-[0.6rem] font-black tracking-wide text-white">
            {card.pill}
          </div>
          <div className="mt-4 text-sm font-medium text-slate-500">{card.label}</div>
          <div className="mt-1.5 flex items-center gap-1.5 text-[1.7rem] leading-none font-black tracking-[-0.05em] text-slate-900">
            <span>{card.value}</span>
            <ChevronRightIcon className="mt-1 size-4 text-slate-400" />
          </div>
          <div className={`mt-2 text-xs font-semibold ${card.helperTone === 'up' ? 'text-emerald-600' : 'text-slate-400'}`}>
            {card.helper}
          </div>
        </div>

        <div className="flex justify-end">
          <div className={`flex size-12 items-center justify-center rounded-2xl ${statIconToneClasses[card.iconTone]}`}>
            {card.icon === 'grid' ? <GridIcon className="size-5" /> : <WalletIcon className="size-5" />}
          </div>
        </div>
      </div>
    </article>
  )
}

function BentoSummaryCard({ card }: { card: BentoCard }) {
  return (
    <article
      className={`flex items-center justify-between gap-4 rounded-[1.6rem] px-6 py-5 shadow-[0_12px_32px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(15,23,42,0.08)] ${card.variant === 'light' ? 'border border-slate-200/80 bg-white' : 'bg-slate-50'}`}
    >
      <div>
        <p className="text-xs font-medium text-slate-500">{card.subtitle}</p>
        <h3 className="mt-1 text-xl font-black tracking-[-0.04em] text-slate-900">{card.title}</h3>
        {card.cta ? (
          <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-slate-900">
            <span>{card.cta}</span>
            <ChevronRightIcon className="size-4" />
          </p>
        ) : null}
        {card.id === 'level-up' ? (
          <div className="mt-3 flex items-center gap-1.5">
            <Dot active />
            <Dot />
            <Dot />
          </div>
        ) : null}
      </div>

      {card.visual === 'bell' ? (
        <div className="relative">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-[0_12px_24px_rgba(15,23,42,0.06)]">
            <MessageIcon className="size-7" />
          </div>
          {card.badge ? (
            <div className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[0.6rem] font-black text-white">
              {card.badge}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="relative h-16 w-24 shrink-0">
          <div className="absolute right-2 top-2 h-10 w-16 rotate-[12deg] rounded-xl bg-linear-to-br from-violet-600 to-indigo-500 shadow-[0_12px_24px_rgba(79,70,229,0.22)]" />
          <div className="absolute right-0 top-0 h-10 w-16 -rotate-[6deg] rounded-xl bg-linear-to-br from-blue-400 to-blue-600 shadow-[0_12px_24px_rgba(37,99,235,0.2)]">
            <div className="absolute right-2 top-1.5 size-3 rounded-full bg-white/30" />
          </div>
          <div className="absolute right-0 -top-2 flex size-6 items-center justify-center rounded-full bg-red-500 text-white shadow-[0_8px_16px_rgba(239,68,68,0.2)]">
            <HeartIcon className="size-3.5" />
          </div>
        </div>
      )}
    </article>
  )
}

function OfferCard({ offer, onOpen }: { offer: Offer; onOpen: (offer: Offer) => void }) {
  const handleKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpen(offer)
    }
  }

  return (
    <article
      tabIndex={0}
      onClick={() => onOpen(offer)}
      onKeyDown={handleKeyDown}
      className="group relative overflow-hidden rounded-[1.6rem] border border-slate-200/80 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_36px_rgba(15,23,42,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-400/50"
    >
      {offer.badge && offer.badgeTone ? (
        <span className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[0.65rem] font-black tracking-wide ${offerBadgeClasses[offer.badgeTone]}`}>
          {offer.badge}
        </span>
      ) : null}

      <OfferThumbnail offer={offer} layout="hero" />

      <div className="space-y-3 px-5 py-4">
        <div>
          <div className="text-[0.65rem] font-bold tracking-[0.18em] text-slate-400 uppercase">{offer.category}</div>
          <h3 className="mt-1.5 text-[0.95rem] leading-6 font-black tracking-[-0.03em] text-slate-900">
            {offer.title}
          </h3>
          <p className="mt-1.5 text-sm leading-6 text-slate-500">{offer.description}</p>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs text-slate-400">
            <span>참여 {numberFormatter.format(offer.participants)}명</span>
            <span>{offer.deadlineLabel}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className={`h-full rounded-full ${progressToneClasses[offer.progressTone]}`} style={{ width: `${offer.progress}%` }} />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-end gap-1">
            <span className="text-2xl leading-none font-black tracking-[-0.05em] text-amber-500">
              {numberFormatter.format(offer.rewardPoints)}
            </span>
            <span className="pb-0.5 text-xs font-semibold text-slate-400">P</span>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onOpen(offer)
            }}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition ${offer.ctaDisabled ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            {offer.ctaLabel}
          </button>
        </div>
      </div>
    </article>
  )
}

function TipInsightCard({ card }: { card: TipCard }) {
  return (
    <article
      className={`relative overflow-hidden rounded-[1.8rem] p-7 shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(15,23,42,0.1)] ${tipCardClasses[card.variant]}`}
    >
      <div className={`text-sm font-medium ${card.variant === 'blue' ? 'text-blue-100' : 'text-slate-500'}`}>
        {card.label}
      </div>
      <h3 className="mt-2 text-xl leading-[1.35] font-black tracking-[-0.04em] whitespace-pre-line">
        {card.title}
      </h3>

      <div className="mt-8 flex justify-end">{renderTipIllustration(card)}</div>
    </article>
  )
}

export function OfferDetailModal({
  offer,
  onClose,
  onJoin,
}: {
  offer: Offer | null
  onClose: () => void
  onJoin: () => void
}) {
  if (!offer) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-modal-title"
        className="w-full max-w-md overflow-hidden rounded-[1.8rem] bg-white shadow-[0_32px_80px_rgba(15,23,42,0.24)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-6">
          <div className="flex items-start gap-4">
            <OfferThumbnail offer={offer} layout="modal" />
            <div>
              <h2 id="offer-modal-title" className="text-lg font-black tracking-[-0.04em] text-slate-900">
                {offer.title}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{offer.category}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="모달 닫기"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="mb-5 flex items-center gap-3 rounded-2xl bg-amber-100 px-4 py-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-white/80 text-amber-600 shadow-[0_8px_20px_rgba(251,191,36,0.18)]">
              <CoinIcon className="size-6" />
            </div>
            <div>
              <div className="text-3xl leading-none font-black tracking-[-0.08em] text-amber-600">
                {numberFormatter.format(offer.rewardPoints)}P
              </div>
              <div className="mt-1 text-xs font-medium text-amber-800">참여 완료 시 즉시 지급</div>
            </div>
          </div>

          <ol className="space-y-3">
            {offer.steps.map((step, index) => (
              <li key={step} className="flex gap-3 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-black text-blue-600">
                  {index + 1}
                </span>
                <span className="text-sm leading-6 text-slate-600">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex gap-3 border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onJoin}
            className="flex-[1.6] rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            미션 참여하기
          </button>
        </div>
      </div>
    </div>
  )
}

export function Toast({ visible, message }: { visible: boolean; message: string }) {
  return (
    <div
      className={`fixed bottom-7 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold whitespace-nowrap text-white shadow-[0_16px_32px_rgba(15,23,42,0.2)] transition duration-300 ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-16 opacity-0'}`}
    >
      <span className="flex size-5 items-center justify-center rounded-full bg-white/12">
        <CheckIcon className="size-3" />
      </span>
      {message}
    </div>
  )
}

export function ScrollToTopButton({ visible }: { visible: boolean }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed right-4 bottom-5 z-40 flex size-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-[0_12px_28px_rgba(15,23,42,0.12)] transition duration-200 hover:bg-slate-50 sm:right-8 sm:bottom-8 ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-5 opacity-0'}`}
      aria-label="맨 위로 이동"
    >
      <ChevronUpIcon className="size-5" />
    </button>
  )
}

function Pill({
  children,
  inverse = false,
}: {
  children: string
  inverse?: boolean
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[0.65rem] font-black tracking-wide ${inverse ? 'bg-white/18 text-white ring-1 ring-inset ring-white/12' : 'bg-slate-900 text-white'}`}
    >
      {children}
    </span>
  )
}

function Dot({ active = false }: { active?: boolean }) {
  return (
    <span
      className={`block h-1.5 rounded-full transition-all ${active ? 'w-5 bg-slate-900' : 'w-2 bg-slate-300'}`}
    />
  )
}

function AnchorAction({ to, children }: { to: string; children: string }) {
  return (
    <Link to={to} className="transition hover:text-white">
      {children}
    </Link>
  )
}

function Divider() {
  return <span className="hidden h-5 w-px bg-white/20 sm:block" />
}

function OfferThumbnail({
  offer,
  layout,
}: {
  offer: Offer
  layout: 'hero' | 'compact' | 'modal'
}) {
  if (layout === 'hero') {
    return (
      <div className={`relative aspect-[16/10] min-h-36 overflow-hidden ${offerToneClasses[offer.thumbTone]}`}>
        <img
          src={offer.imageSrc}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/72 via-slate-950/16 to-transparent" />
        <div className="absolute right-4 bottom-4 flex items-center gap-2 rounded-2xl border border-white/35 bg-white/88 px-3 py-2 shadow-[0_18px_32px_rgba(15,23,42,0.18)] backdrop-blur-sm">
          <div className="flex size-9 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5">
            <img
              src={offer.logoSrc}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <div className="text-[0.6rem] font-semibold tracking-[0.12em] text-slate-400 uppercase">
              {offer.listTag}
            </div>
            <div className="text-sm font-bold text-slate-900">{numberFormatter.format(offer.rewardPoints)}P</div>
          </div>
        </div>
      </div>
    )
  }

  const wrapperClasses = `flex shrink-0 items-center justify-center rounded-2xl ${offerToneClasses[offer.thumbTone]} ${layout === 'modal' ? 'size-16' : 'size-12'}`
  const panelClasses = layout === 'modal' ? 'h-12 w-12 rounded-[1.15rem]' : 'h-9 w-9 rounded-[0.95rem]'

  return (
    <div className={wrapperClasses}>
      <div className={`flex items-center justify-center overflow-hidden bg-white shadow-[0_10px_20px_rgba(15,23,42,0.12)] ${panelClasses}`}>
        <img
          src={offer.logoSrc}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain p-1.5"
        />
      </div>
    </div>
  )
}

function renderCategoryIcon(iconKey: Category['iconKey'], className: string) {
  switch (iconKey) {
    case 'shopping':
      return <ShoppingBagIcon className={className} />
    case 'app':
      return <SmartphoneIcon className={className} />
    case 'survey':
      return <ClipboardIcon className={className} />
    case 'review':
      return <StarIcon className={className} />
    case 'trial':
      return <GiftIcon className={className} />
    case 'game':
      return <GamepadIcon className={className} />
    case 'health':
      return <ActivityIcon className={className} />
    case 'finance':
      return <CreditCardIcon className={className} />
  }
}

function renderTipIllustration(card: TipCard) {
  switch (card.illustration) {
    case 'clipboard':
      return (
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-slate-100 bg-white shadow-[0_16px_24px_rgba(15,23,42,0.08)]">
          <ClipboardIcon className="size-10 text-blue-600" />
          <span className="absolute -right-2 -bottom-2 flex size-7 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-white">
            <CheckIcon className="size-3" />
          </span>
        </div>
      )
    case 'app-card':
      return (
        <div className="relative flex h-[4.75rem] w-[5.4rem] rotate-6 items-center justify-center rounded-[1.35rem] bg-blue-600 shadow-[0_18px_32px_rgba(37,99,235,0.24)]">
          <div className="h-[3.5rem] w-[3rem] rounded-[0.9rem] border border-white/30 bg-white/16 p-2 backdrop-blur-sm">
            <div className="flex gap-1">
              <span className="size-1 rounded-full bg-white/60" />
              <span className="size-1 rounded-full bg-white/60" />
            </div>
            <div className="mt-2 flex justify-center text-white">
              <SmartphoneIcon className="size-5" />
            </div>
            <div className="mt-2 h-1 rounded-full bg-white/25" />
          </div>
        </div>
      )
    case 'simulator':
      return (
        <div className="flex size-[4.75rem] items-center justify-center rounded-[1.4rem] border border-white/30 bg-white/15 backdrop-blur-sm">
          <TrendUpIcon className="size-10 text-white" />
        </div>
      )
    case 'review':
      return (
        <div className="relative flex h-16 w-24 items-center justify-center overflow-hidden rounded-t-full border-4 border-slate-200 border-b-0 bg-linear-to-t from-slate-200 to-white">
          <div className="absolute bottom-0 left-1/2 h-12 w-1 -translate-x-1/2 -rotate-45 rounded-full bg-slate-800" />
          <div className="absolute -bottom-1.5 left-1/2 size-3.5 -translate-x-1/2 rounded-full bg-slate-800" />
        </div>
      )
    case 'target':
      return (
        <div className="relative flex size-20 items-center justify-center rounded-[1.4rem] bg-slate-900">
          <div className="absolute inset-2 rounded-[1rem] border-2 border-dashed border-slate-600" />
          <TargetIcon className="size-10 text-blue-400" />
        </div>
      )
    case 'alarm':
      return (
        <div className="relative">
          <div className="flex size-[4.75rem] items-center justify-center rounded-full bg-amber-100 text-orange-500">
            <BellIcon className="size-10" />
          </div>
          <div className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[0.6rem] font-black text-white">
            1
          </div>
        </div>
      )
  }
}

function ChevronRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function ChevronUpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m18 15-6-6-6 6" />
    </svg>
  )
}

function ShieldCheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function ChartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  )
}

function GridIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

function WalletIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  )
}

function MessageIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function TrendUpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 7h6v6" />
      <path d="m22 7-8.5 8.5-5-5L2 17" />
    </svg>
  )
}

function ClipboardIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  )
}

function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function CoinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="12" cy="6" rx="6.5" ry="3.5" />
      <path d="M5.5 6v5c0 1.9 2.9 3.5 6.5 3.5s6.5-1.6 6.5-3.5V6" />
      <path d="M5.5 11v5c0 1.9 2.9 3.5 6.5 3.5s6.5-1.6 6.5-3.5v-5" />
    </svg>
  )
}

function HeartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 21s-6.7-4.3-9.2-8.1C.7 9.8 2 5.8 5.7 4.6c2.2-.7 4.1.2 5.3 1.7 1.2-1.5 3.1-2.4 5.3-1.7 3.7 1.2 5 5.2 2.9 8.3C18.7 16.7 12 21 12 21Z" />
    </svg>
  )
}

function ShoppingBagIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 8h12l-1 11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  )
}

function SmartphoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10 5.5h4" />
      <circle cx="12" cy="18.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z" />
    </svg>
  )
}

function GiftIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
      <path d="M12 8H8.5a2.5 2.5 0 1 1 0-5c2 0 3.5 2 3.5 5Z" />
      <path d="M12 8h3.5a2.5 2.5 0 1 0 0-5C13.5 3 12 5 12 8Z" />
    </svg>
  )
}

function GamepadIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6.5 10h11a4.5 4.5 0 0 1 4.4 5.6l-1 3.7a2 2 0 0 1-3.3 1l-2.5-2.2a3 3 0 0 0-2-.7h-2.2a3 3 0 0 0-2 .7l-2.5 2.2a2 2 0 0 1-3.3-1l-1-3.7A4.5 4.5 0 0 1 6.5 10Z" />
      <path d="M8 14v3" />
      <path d="M6.5 15.5h3" />
      <circle cx="16.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="16.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function ActivityIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12h4l2-4 4 8 2-4h6" />
    </svg>
  )
}

function CreditCardIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M2.5 10h19" />
      <path d="M7 15h3" />
    </svg>
  )
}

function TargetIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function BellIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10.268 21a2 2 0 0 0 3.464 0" />
      <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
    </svg>
  )
}

function InfoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  )
}
