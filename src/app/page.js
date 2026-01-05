import Image from "next/image"

import { ScrollArea } from "@/components/scroll-area"
import { GradientBg2 } from "@/components/gradient-bg"
import { FloatingHeader } from "@/components/floating-header"
import { PageTitle } from "@/components/page-title"
import { homeContent } from "@/data/home"

export default function Home() {
  const { hero, metrics, toolkit, focusAreas, wins, cta } = homeContent

  return (
    <ScrollArea useScrollAreaId>
      <GradientBg2 />
      <FloatingHeader scrollTitle="Tim Darmstaedter" />
      <div className="content-wrapper">
        <div className="content space-y-10">
          <PageTitle title="Welcome! Nice to see you." className="lg:hidden" />

          <section className="grid gap-6 rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <p className="text-2xl font-semibold">{hero.greeting}</p>
                <p className="max-w-2xl text-gray-600 dark:text-gray-400">{hero.subheading}</p>
              </div>
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                width={160}
                height={160}
                priority
                className="mx-auto h-auto w-32 rounded-xl border border-gray-200 shadow-lg dark:border-gray-800 md:mx-0"
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{hero.intro}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Impact at a Glance</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex flex-col gap-1 rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/60 p-4 text-indigo-900 dark:border-indigo-500/40 dark:bg-indigo-500/10 dark:text-indigo-200"
                >
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <span className="text-sm text-indigo-700/80 dark:text-indigo-200/70">{metric.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Analytics Toolkit</h2>
            <div className="flex flex-wrap gap-2">
              {toolkit.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-600 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {tool}
                </span>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Where I Drive Insight</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {focusAreas.map((area) => (
                <div key={area.title} className="rounded-2xl border border-gray-200 bg-white/70 p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{area.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{area.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Recent Wins</h2>
            <ul className="space-y-3 rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
              {wins.map((win) => (
                <li key={win} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="mt-1 size-2.5 rounded-full bg-indigo-500" aria-hidden />
                  <span>{win}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3 rounded-2xl border border-indigo-200 bg-indigo-50/70 p-6 shadow-sm dark:border-indigo-500/40 dark:bg-indigo-500/10">
            <h2 className="text-base font-semibold text-indigo-900 dark:text-indigo-200">{cta.title}</h2>
            <p className="text-sm text-indigo-900/80 dark:text-indigo-100/80">{cta.description}</p>
          </section>
        </div>
      </div>
    </ScrollArea>
  )
}

