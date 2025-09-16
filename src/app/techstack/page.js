import { ScrollArea } from '@/components/scroll-area'
import { FloatingHeader } from '@/components/floating-header'
import { PageTitle } from '@/components/page-title'
import { GradientBg3 } from '@/components/gradient-bg'
import { JourneyCard } from '@/components/journey-card'
import { Database, Code2 } from 'lucide-react'
import { stacks } from '../../components/stack_local'

export default async function Home() {
  return (
    <ScrollArea useScrollAreaId>
      <GradientBg3 />
      <FloatingHeader scrollTitle="Tech Stack" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="Tech Stack" />
          <p>
            In the following I am presenting you my Tech Stack which I all learned by videos and courses on the internet as well what I learned on the job.<br></br>
            Youtube, Udemy and ChatGPT are your best friends when it comes to learning new skills.<br></br>I'm working hard everyday to further expand my skills.{' '}
          </p>
          <div className="flex flex-col items-stretch gap-12">
            {stacks.map((item, itemIndex) => (
              <div key={`data_${itemIndex}`} className="flex flex-col items-baseline gap-4">
                <div className="flex items-center">
                  <h2>{item.stack}</h2>
                  <hr className="my-0 ml-4 flex-1 border-dashed border-gray-200" />
                </div>
                <section>
                  {item.logs.map((log, logIndex) => (
                    <div key={`data_${itemIndex}_log_${logIndex}`} className="relative flex pb-8 last:pb-0">
                      {logIndex !== item.logs.length - 1 && (
                        <div className="absolute inset-0 flex w-6 items-center justify-center">
                          <div className="pointer-events-none h-full w-px border-l border-gray-200"></div>
                        </div>
                      )}
                      <div className="z-0 flex size-6 shrink-0 items-center justify-center rounded-full bg-black align-middle text-white">
                        {item.type === 'frameworks' ? <Code2 size={16} /> : <Database size={16} />}
                      </div>
                      <div className="grow pl-8">
                        <JourneyCard {...log} index={logIndex} href={log.href} />
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