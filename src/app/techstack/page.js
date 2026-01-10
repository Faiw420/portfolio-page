import { ScrollArea } from "@/components/scroll-area"
import { FloatingHeader } from "@/components/floating-header"
import { PageTitle } from "@/components/page-title"
import { GradientBg3 } from "@/components/gradient-bg"
import { techStack } from "@/data/techstack"

const levelColors = {
  Advanced: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
  Intermediate: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
  Beginner: "bg-gray-50 text-gray-500 dark:bg-gray-800/50 dark:text-gray-400",
}

export default function TechStackPage() {
  return (
    <ScrollArea useScrollAreaId>
      <GradientBg3 />
      <FloatingHeader scrollTitle="Tech Stack" />
      <div className="content-wrapper">
        <div className="content space-y-10">
          <PageTitle title="Tech Stack" />
          <p className="text-gray-600 dark:text-gray-400">
            Tools and technologies I work with.
          </p>

          <div className="space-y-8">
            {techStack.map((category) => (
              <section key={category.category} className="space-y-4">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                  {category.category}
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between rounded-xl border border-gray-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/70"
                    >
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {item.name}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${levelColors[item.level]}`}>
                        {item.level}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

