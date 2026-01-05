import { Database, Code2 } from "lucide-react"

import { ScrollArea } from "@/components/scroll-area"
import { FloatingHeader } from "@/components/floating-header"
import { PageTitle } from "@/components/page-title"
import { GradientBg3 } from "@/components/gradient-bg"
import { JourneyCard } from "@/components/journey-card"
import { techStack } from "@/data/techstack"

export default function TechStackPage() {
  return (
    <ScrollArea useScrollAreaId>
      <GradientBg3 />
      <FloatingHeader scrollTitle="Tech Stack" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="Tech Stack" />
          <p>
            Here's a snapshot of the tools and platforms I have learned through online courses, experimentation, and on-the-job practice.
            Youtube, Udemy, and ChatGPT have all been instrumental in keeping my skills sharp.
          </p>
          <div className="flex flex-col items-stretch gap-12">
            {techStack.map((stack, stackIndex) => (
              <div key={`stack_${stack.category}`} className="flex flex-col items-baseline gap-4">
                <div className="flex items-center">
                  <h2>{stack.category}</h2>
                  <hr className="my-0 ml-4 flex-1 border-dashed border-gray-200" />
                </div>
                <section>
                  {stack.entries.map((entry, entryIndex) => (
                    <div key={`stack_${stackIndex}_entry_${entryIndex}`} className="relative flex pb-8 last:pb-0">
                      {entryIndex !== stack.entries.length - 1 && (
                        <div className="absolute inset-0 flex w-6 items-center justify-center">
                          <div className="pointer-events-none h-full w-px border-l border-gray-200" />
                        </div>
                      )}
                      <div className="z-0 flex size-6 shrink-0 items-center justify-center rounded-full bg-black text-white">
                        {stack.type === "frameworks" ? <Code2 size={16} /> : <Database size={16} />}
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

