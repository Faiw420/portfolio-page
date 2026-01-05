import { ScrollArea } from "@/components/scroll-area"
import { FloatingHeader } from "@/components/floating-header"
import { PageTitle } from "@/components/page-title"
import { GradientBg3 } from "@/components/gradient-bg"
import { analyticsHighlights } from "@/data/stats"

export default function StatsPage() {
  return (
    <ScrollArea useScrollAreaId>
      <GradientBg3 />
      <FloatingHeader scrollTitle="Analytics impact" />
      <div className="content-wrapper">
        <div className="content space-y-8">
          <PageTitle title="Analytics impact" />
          <p className="max-w-2xl text-sm text-gray-600 dark:text-gray-400">
            A sample of the outcomes I monitor to keep teams confident in the numbers they use every day. These highlights blend product
            analytics, operational usage, and process efficiency metrics.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {analyticsHighlights.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white/70 p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/60"
              >
                <span className="text-3xl font-semibold text-indigo-600 dark:text-indigo-300">{item.value}</span>
                <span className="text-base font-medium text-gray-900 dark:text-gray-200">{item.title}</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

