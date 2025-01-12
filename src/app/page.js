import { Suspense } from 'react'

import { ScrollArea } from '@/components/scroll-area'
import { ScreenLoadingSpinner } from '@/components/screen-loading-spinner'
import { FloatingHeader } from '@/components/floating-header'
import { PageTitle } from '@/components/page-title'
import { GradientBg2 } from '@/components/gradient-bg'


export default async function Home() {

  return (
    <ScrollArea useScrollAreaId>
      <GradientBg2 />
      <FloatingHeader scrollTitle="Tim Darmstädter"/>
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="Welcome! Nice to see you." className="lg:hidden" />
          <p>
            Hi 👋 I'm Tim.
          </p>
          <img 
            src="../../assets/me.jpeg" 
            alt="A photo of Tim Darmstädter" 
            className="my-4 max-w-xs rounded-lg shadow-lg"
          />
          <p>
            I'm a data analyst at <a href="https://www.essity.com" target="_blank" rel="noopener noreferrer"><strong>essity</strong></a>. Previously, I worked as a Controller at <a href="https://www.ewr-netz.de" target="_blank" rel="noopener noreferrer"><strong>EWR Netz GmbH</strong>.</a>
          </p>
          <p>
            In my current role, I work with data to help the business make better decisions. I'm responsible for providing daily data and insights to over 300 users in the company.
          </p>
          <p>
            I'm passionate about data, analytics, and technology. I'm always looking for ways to improve my skills and learn new things.
          </p>
          <p>
            I'm currently learning Python, SQL, and Power BI. I'm also interested in learning more about data science, machine learning, and artificial intelligence.
          </p>
          <p>
            In my free time, I enjoy reading, writing, and learning new things. I'm also a big fan of movies, TV shows, and video games.
          </p>
          <p>
            Feel free to contact me through socials on the left if you have any questions or would like to connect. I'm always open to new opportunities and collaborations.
          </p>
          <Suspense fallback={<ScreenLoadingSpinner />}>
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  )
}
