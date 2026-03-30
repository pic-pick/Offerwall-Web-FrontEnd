import { historyEntries, historySummary } from '../data/mockData'

const sectionClass = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
const numberFormatter = new Intl.NumberFormat('ko-KR')

const statusClasses = {
  completed: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  review: 'bg-amber-50 text-amber-700 ring-amber-100',
  pending: 'bg-blue-50 text-blue-700 ring-blue-100',
}

const statusLabels = {
  completed: '적립 완료',
  review: '검수중',
  pending: '추가 확인',
}

export function HistoryPage() {
  return (
    <>
      <section className={`${sectionClass} pt-10 sm:pt-12`}>
        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-[0_24px_48px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-10">
          <div className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-[0.65rem] font-black tracking-wide text-violet-700">
            Activity Log
          </div>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.06em] text-slate-900 sm:text-[3.2rem]">
            참여 내역과 적립 상태를
            <br />
            한 번에 확인해요
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
            완료된 미션, 검수중인 인증, 추가 확인이 필요한 미션까지 포트폴리오용 흐름으로 정리한 활동 페이지입니다.
          </p>
        </div>
      </section>

      <section className={`${sectionClass} py-8 sm:py-10`}>
        <div className="grid gap-4 md:grid-cols-3">
          {historySummary.map((item) => (
            <article key={item.id} className="rounded-[1.5rem] bg-white p-6 shadow-[0_16px_32px_rgba(15,23,42,0.05)] ring-1 ring-slate-200/70">
              <div className="text-sm font-medium text-slate-500">{item.label}</div>
              <div className="mt-3 text-[2rem] leading-none font-black tracking-[-0.05em] text-slate-900">
                {item.value}
              </div>
              <div className="mt-2 text-xs font-medium text-slate-400">{item.helper}</div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${sectionClass} pb-12`}>
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-[1.65rem] leading-none font-black tracking-[-0.05em] text-slate-900">
              최근 활동 내역
            </h2>
            <p className="mt-2 text-sm text-slate-400">최근 참여한 미션 순서대로 정리했습니다.</p>
          </div>
        </div>

        <div className="space-y-4">
          {historyEntries.map((entry) => (
            <article
              key={entry.id}
              className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-[0_14px_28px_rgba(15,23,42,0.04)] sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-14 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-2 shadow-[0_10px_20px_rgba(15,23,42,0.06)]">
                  <img src={entry.logoSrc} alt="" className="h-full w-full object-contain" />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-[0.16em] text-slate-400 uppercase">{entry.category}</div>
                  <h3 className="mt-1 text-lg font-black tracking-[-0.03em] text-slate-900">{entry.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{entry.note}</p>
                  <div className="mt-3 text-xs font-medium text-slate-400">{entry.brand} · {entry.date}</div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${statusClasses[entry.status]}`}>
                  {statusLabels[entry.status]}
                </span>
                <div className="mt-0 sm:mt-4">
                  <div className="text-[1.6rem] leading-none font-black tracking-[-0.05em] text-amber-500">
                    {numberFormatter.format(entry.points)}P
                  </div>
                  <div className="mt-1 text-xs font-medium text-slate-400">예상 적립 포인트</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
