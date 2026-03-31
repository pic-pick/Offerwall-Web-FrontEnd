import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { CategorySection, FeaturedOffersSection, NoticeBar, OfferDetailModal, OfferListSection, Toast } from '../components/OfferwallPage'
import { categories, offers, type Category, type Offer } from '../data/mockData'

const sectionClass = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
const numberFormatter = new Intl.NumberFormat('ko-KR')
type CategoryFilterId = Category['id'] | 'all'

export function MissionsPage() {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilterId>('all')
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

  const filteredOffers = selectedCategory === 'all'
    ? offers
    : offers.filter((offer) => offer.categoryId === selectedCategory)
  const featuredOffers = filteredOffers.slice(0, 3)
  const selectedCategoryLabel = selectedCategory === 'all'
    ? '전체'
    : categories.find((category) => category.id === selectedCategory)?.label ?? '선택한'
  const highPointCount = filteredOffers.filter((offer) => offer.rewardPoints >= 2000).length
  const averageReward = filteredOffers.length > 0
    ? Math.round(filteredOffers.reduce((sum, offer) => sum + offer.rewardPoints, 0) / filteredOffers.length)
    : 0

  return (
    <>
      <section className={`${sectionClass} pt-10 sm:pt-12`}>
        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-[0_24px_48px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="grid gap-5 sm:gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <div className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-[0.65rem] font-black tracking-wide text-blue-700">
                Mission Explorer
              </div>
              <h1 className="mt-3 text-[2rem] leading-tight font-black tracking-[-0.06em] text-slate-900 sm:mt-4 sm:text-4xl lg:text-[3.4rem]">
                지금 바로 참여 가능한
                <br />
                모든 미션을 모아봤어요
              </h1>
            </div>

            <div className="hidden grid-cols-3 gap-2 sm:grid sm:gap-3">
              <MissionStatCard
                label={selectedCategory === 'all' ? '전체 미션' : `${selectedCategoryLabel} 미션`}
                value={`${filteredOffers.length}개`}
                helper={selectedCategory === 'all' ? '실시간 참여 가능' : '선택 카테고리 기준'}
              />
              <MissionStatCard
                label="고포인트 미션"
                value={`${highPointCount}개`}
                helper="2,000P 이상"
              />
              <MissionStatCard
                label="평균 적립"
                value={`${numberFormatter.format(averageReward)}P`}
                helper="미션 1건 기준"
              />
            </div>
          </div>
        </div>
      </section>

      <CategorySection
        includeAllOption
        showAllOnMobile
        mobileScrollable
        mobileCategoryStyle="prominent"
        selectedCategoryId={selectedCategory}
        onSelectCategory={setSelectedCategory}
        title="카테고리 바로가기"
        subtitle="관심 있는 미션만 빠르게 골라볼 수 있어요"
      />
      {filteredOffers.length > 0 ? (
        <>
          <FeaturedOffersSection
            offers={featuredOffers}
            onOfferOpen={setSelectedOffer}
            title={selectedCategory === 'all' ? '추천 미션' : `${selectedCategoryLabel} 추천 미션`}
            subtitle="지금 성과가 좋은 미션부터 확인해보세요"
          />
          <OfferListSection
            offers={filteredOffers}
            onOfferOpen={setSelectedOffer}
            title={selectedCategory === 'all' ? '전체 미션 목록' : `${selectedCategoryLabel} 미션 목록`}
          />
        </>
      ) : (
        <MissionsEmptyState categoryLabel={selectedCategoryLabel} onReset={() => setSelectedCategory('all')} />
      )}
      <NoticeBar />

      <OfferDetailModal
        offer={selectedOffer}
        onClose={() => setSelectedOffer(null)}
        onJoin={() => {
          setSelectedOffer(null)
          setToastVisible(true)
        }}
      />
      <Toast visible={toastVisible} message="미션에 참여했어요. 포인트를 확인하세요." />
    </>
  )
}

function MissionsEmptyState({
  categoryLabel,
  onReset,
}: {
  categoryLabel: string
  onReset: () => void
}) {
  return (
    <section className={`${sectionClass} py-8 sm:py-10`}>
      <div className="rounded-[1.8rem] border border-dashed border-slate-200 bg-white/80 px-6 py-10 text-center shadow-[0_12px_32px_rgba(15,23,42,0.04)]">
        <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[0.65rem] font-black tracking-wide text-slate-700">
          {categoryLabel}
        </div>
        <h2 className="mt-4 text-[1.6rem] leading-tight font-black tracking-[-0.05em] text-slate-900">
          이 카테고리에는 아직 노출 중인 미션이 없어요
        </h2>
        <p className="mt-3 text-sm text-slate-500">
          다른 카테고리를 선택하거나 전체 미션으로 다시 확인해보세요.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            전체 미션 보기
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </section>
  )
}

function MissionStatCard({
  label,
  value,
  helper,
}: {
  label: string
  value: string
  helper: string
}) {
  return (
    <article className="rounded-[1.2rem] bg-slate-50 p-3 shadow-[0_12px_28px_rgba(15,23,42,0.04)] sm:rounded-[1.5rem] sm:p-5">
      <div className="text-[11px] font-medium text-slate-500 sm:text-sm">{label}</div>
      <div className="mt-1.5 text-[1.25rem] leading-none font-black tracking-[-0.05em] text-slate-900 sm:mt-2 sm:text-[1.9rem]">
        {value}
      </div>
      <div className="mt-1.5 text-[10px] leading-4 font-medium text-slate-400 sm:mt-2 sm:text-xs">{helper}</div>
    </article>
  )
}
