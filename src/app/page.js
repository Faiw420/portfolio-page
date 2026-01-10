import Image from "next/image"

import { ScrollArea } from "@/components/scroll-area"
import { GradientBg2 } from "@/components/gradient-bg"
import { FloatingHeader } from "@/components/floating-header"
import { PageTitle } from "@/components/page-title"
import { LiveVisitors } from "@/components/live-visitors"
import AgeCounter from "@/components/age-counter"
import { homeContent } from "@/data/home"

export default function Home() {
  const { hero, facts, toolkit, projects, recentProjects, cta } = homeContent

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
            <AgeCounter />
            <LiveVisitors />
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">About Me</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-1 rounded-2xl border border-dashed border-teal-300 bg-teal-50/70 p-4 text-teal-900 dark:border-teal-500/30 dark:bg-teal-900/20 dark:text-teal-100"
                >
                  <span className="text-sm font-medium text-teal-600 dark:text-teal-400">{fact.label}</span>
                  <span className="text-lg font-semibold">{fact.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Toolkit</h2>
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
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Projects</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {projects.map((project) => (
                <div key={project.title} className="rounded-2xl border border-gray-200 bg-white/70 p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{project.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Recent Projects</h2>
            <ul className="space-y-3 rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
              {recentProjects.map((project) => (
                <li key={project} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="mt-1 size-2.5 rounded-full bg-teal-500" aria-hidden />
                  <span>{project}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3 rounded-2xl border border-teal-300 bg-teal-50/70 p-6 shadow-sm dark:border-teal-500/30 dark:bg-teal-900/20">
            <h2 className="text-base font-semibold text-teal-900 dark:text-teal-100">{cta.title}</h2>
            <p className="text-sm text-teal-700 dark:text-teal-300">{cta.description}</p>
          </section>
        </div>
      </div>
    </ScrollArea>
  )
}

