import { ScrollArea } from "@/components/scroll-area"
import { JourneyCard } from "@/components/journey-card"
import { FloatingHeader } from "@/components/floating-header"
import { PageTitle } from "@/components/page-title"
import { GradientBg3 } from "@/components/gradient-bg"
import { journeyTimeline } from "@/data/journey"

export default function JourneyPage() {
  return (
    <ScrollArea useScrollAreaId>
      <GradientBg3 />
      <FloatingHeader scrollTitle="Curriculum vitae" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="Curriculum vitae" />
          <p>
            My journey started in <strong>1998</strong> and it is still going. I'm excited to see where I will be in the next decade.
          </p>
          <div className="flex flex-col items-stretch gap-12">
            {journeyTimeline.map((item, itemIndex) => (
              <div key={`timeline_${item.year}`} className="flex flex-col items-baseline gap-6 md:flex-row md:gap-12">
                <div className="flex items-center">
                  <h2>{item.year}</h2>
                  <hr className="my-0 ml-4 flex-1 border-dashed border-gray-200" />
                </div>
                <section>
                  {item.entries.map((entry, entryIndex) => (
                    <div key={`timeline_${itemIndex}_entry_${entryIndex}`} className="relative flex pb-8 last:pb-0">
                      {entryIndex !== item.entries.length - 1 && (
                        <div className="absolute inset-0 flex w-6 items-center justify-center">
                          <div className="pointer-events-none h-full w-px border-l border-gray-200" />
                        </div>
                      )}
                      <div className="z-0 flex size-6 shrink-0 items-center justify-center rounded-full bg-black text-white">
                        <span className="text-xs font-semibold">+</span>
                      </div>
                      <div className="grow pl-8">
                        <JourneyCard {...entry} index={entryIndex} />
                      </div>
                    </div>
                  ))}
                </section>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

