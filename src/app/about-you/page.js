import { ScrollArea } from "@/components/scroll-area"
import { FloatingHeader } from "@/components/floating-header"
import { PageTitle } from "@/components/page-title"
import { GradientBg3 } from "@/components/gradient-bg"
import AgeCounter from "@/components/age-counter"
import { aboutContent } from "@/data/about"

export default function AboutPage() {
  const { intro, quickFacts, currentFocus, values } = aboutContent

  return (
    <ScrollArea useScrollAreaId>
      <GradientBg3 />
      <FloatingHeader scrollTitle="About" />
      <div className="content-wrapper">
        <div className="content space-y-10">
          <PageTitle title="About Tim" />
          <p className="max-w-2xl text-sm text-gray-600 dark:text-gray-400">{intro}</p>

          <section className="grid gap-4 rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/60 md:grid-cols-2">
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Quick facts</h2>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {quickFacts.map((fact) => (
                  <li key={fact.label} className="flex justify-between gap-4">
                    <span className="font-medium text-gray-500 dark:text-gray-400">{fact.label}</span>
                    <span className="text-right">{fact.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Live counter</h2>
              <AgeCounter />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Currently focused on</h2>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {currentFocus.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 size-2 rounded-full bg-indigo-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Working principles</h2>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {values.map((value) => (
                <li key={value} className="flex items-start gap-2">
                  <span className="mt-1 size-2 rounded-full bg-emerald-500" aria-hidden />
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </ScrollArea>
  )
}

