import { rewardHighlights, rewardItems, userSummary } from '../data/mockData'

const sectionClass = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
const numberFormatter = new Intl.NumberFormat('ko-KR')

const availabilityClasses = {
  available: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  almost: 'bg-amber-50 text-amber-700 ring-amber-100',
  locked: 'bg-slate-100 text-slate-500 ring-slate-200',
}

const availabilityLabels = {
  available: '즉시 교환',
  almost: '조금만 더',
  locked: '포인트 부족',
}

export function RewardShopPage() {
  return (
    <>
      <section className={`${sectionClass} pt-10 sm:pt-12`}>
        <div className="overflow-hidden rounded-[2rem] bg-slate-900 p-8 text-white shadow-[0_28px_60px_rgba(15,23,42,0.16)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <div className="inline-flex rounded-full bg-white/12 px-3 py-1 text-[0.65rem] font-black tracking-wide text-blue-100">
                Reward Shop
              </div>
              <h1 className="mt-4 text-4xl font-black tracking-[-0.06em] sm:text-[3.2rem]">
                지금 포인트로
                <br />
                바로 교환 가능한 리워드
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                현재 보유 포인트와 교환 가능한 아이템을 한 화면에서 비교할 수 있는 리워드샵 페이지입니다.
              </p>
            </div>

            <div className="rounded-[1.6rem] bg-white/8 p-6 ring-1 ring-white/10">
              <div className="text-sm font-medium text-blue-100">현재 포인트</div>
              <div className="mt-3 text-[2.6rem] leading-none font-black tracking-[-0.08em]">
                {numberFormatter.format(userSummary.currentPoints)}P
              </div>
              <div className="mt-2 text-sm text-slate-300">즉시 교환 가능한 리워드를 우선 정렬했습니다.</div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionClass} py-8 sm:py-10`}>
        <div className="grid gap-4 md:grid-cols-3">
          {rewardHighlights.map((item) => (
            <article key={item.id} className="rounded-[1.5rem] bg-white p-6 shadow-[0_16px_32px_rgba(15,23,42,0.05)] ring-1 ring-slate-200/70">
              <div className="text-sm font-medium text-slate-500">{item.label}</div>
              <div className="mt-3 text-[1.9rem] leading-none font-black tracking-[-0.05em] text-slate-900">
                {item.value}
              </div>
              <div className="mt-2 text-xs font-medium text-slate-400">{item.helper}</div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${sectionClass} pb-12`}>
        <div className="mb-5">
          <h2 className="text-[1.65rem] leading-none font-black tracking-[-0.05em] text-slate-900">
            교환 가능한 리워드
          </h2>
          <p className="mt-2 text-sm text-slate-400">포인트 상태에 따라 바로 교환 가능한 리워드와 목표 리워드를 함께 보여줍니다.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rewardItems.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-[1.6rem] border border-slate-200/80 bg-white shadow-[0_16px_30px_rgba(15,23,42,0.05)]"
            >
              <div className="flex items-center justify-between bg-slate-50 px-5 py-4">
                <div className="flex size-12 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-[0_8px_18px_rgba(15,23,42,0.08)]">
                  <img src={item.logoSrc} alt="" className="h-full w-full object-contain" />
                </div>
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${availabilityClasses[item.availability]}`}>
                  {availabilityLabels[item.availability]}
                </span>
              </div>

              <div className="space-y-4 px-5 py-5">
                <div>
                  <div className="text-[0.65rem] font-bold tracking-[0.16em] text-slate-400 uppercase">{item.brand}</div>
                  <h3 className="mt-1.5 text-lg font-black tracking-[-0.03em] text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
                </div>

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-[1.8rem] leading-none font-black tracking-[-0.05em] text-amber-500">
                      {numberFormatter.format(item.pointsCost)}P
                    </div>
                    <div className="mt-1 text-xs font-medium text-slate-400">
                      {item.badge ? item.badge : '교환 기준 포인트'}
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`rounded-xl px-4 py-2 text-sm font-bold transition ${item.availability === 'locked' ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    {item.availability === 'locked' ? '포인트 모으기' : '교환하기'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
