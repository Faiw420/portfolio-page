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
      <FloatingHeader scrollTitle="Work in Progress" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="Work in Progress" />
          <p>More info about you coming soon...</p>
        </div>
      </div>
    </ScrollArea>
  )
}