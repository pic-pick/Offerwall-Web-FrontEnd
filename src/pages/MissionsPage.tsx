import { useEffect, useState } from 'react'

import { CategorySection, FeaturedOffersSection, NoticeBar, OfferDetailModal, OfferListSection, Toast } from '../components/OfferwallPage'
import { offers, type Offer } from '../data/mockData'

const sectionClass = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
const numberFormatter = new Intl.NumberFormat('ko-KR')

export function MissionsPage() {
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

  return (
    <>
      <section className={`${sectionClass} pt-10 sm:pt-12`}>
        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-[0_24px_48px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <div className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-[0.65rem] font-black tracking-wide text-blue-700">
                Mission Explorer
              </div>
              <h1 className="mt-4 text-4xl font-black tracking-[-0.06em] text-slate-900 sm:text-[3.4rem]">
                지금 바로 참여 가능한
                <br />
                모든 미션을 모아봤어요
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
                카테고리별로 빠르게 탐색하고, 높은 포인트 미션부터 바로 참여할 수 있는 미션 페이지입니다.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <MissionStatCard label="전체 미션" value={`${offers.length}개`} helper="실시간 참여 가능" />
              <MissionStatCard label="고포인트 미션" value="3개" helper="2,000P 이상" />
              <MissionStatCard label="평균 적립" value={`${numberFormatter.format(1583)}P`} helper="미션 1건 기준" />
            </div>
          </div>
        </div>
      </section>

      <CategorySection />
      <FeaturedOffersSection
        offers={offers}
        onOfferOpen={setSelectedOffer}
        title="추천 미션"
        subtitle="지금 성과가 좋은 미션부터 확인해보세요"
      />
      <OfferListSection offers={offers} onOfferOpen={setSelectedOffer} title="전체 미션 목록" />
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
    <article className="rounded-[1.5rem] bg-slate-50 p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)]">
      <div className="text-sm font-medium text-slate-500">{label}</div>
      <div className="mt-2 text-[1.9rem] leading-none font-black tracking-[-0.05em] text-slate-900">
        {value}
      </div>
      <div className="mt-2 text-xs font-medium text-slate-400">{helper}</div>
    </article>
  )
}
