import { ScrollArea } from '@/components/scroll-area'
import { FloatingHeader } from '@/components/floating-header'
import { PageTitle } from '@/components/page-title'
import { GradientBg3 } from '@/components/gradient-bg'
import { JourneyCard } from '@/components/journey-card'

export default async function Home() {
  return (
    <ScrollArea useScrollAreaId>
      <GradientBg3 />
      <FloatingHeader scrollTitle="Google Analytics Analysis (Work in Progress" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="Google Analytics Analysis" />
          <div className="analytics-info">
            <JourneyCard title="Sessions"/>
            <JourneyCard title="Users"/>
            <JourneyCard title="Page Views"/>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}