'use client'

import { memo, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { ArrowLeftIcon } from 'lucide-react'

import { Button } from '@/components/ui/button.jsx'
import { SCROLL_AREA_ID } from '@/lib/constants'

const MobileDrawer = dynamic(() => import('@/components/mobile-drawer').then((mod) => mod.MobileDrawer), {
  ssr: false
})

const MOBILE_SCROLL_THRESHOLD = 24

export const FloatingHeader = memo(({ scrollTitle, title, goBackLink, children }) => {
  const [transformValues, setTransformValues] = useState({ translateY: 0, opacity: scrollTitle ? 0 : 1 })

  useEffect(() => {
    const scrollAreaElem = document.querySelector(`#${SCROLL_AREA_ID}`)

    const onScroll = (event) => {
      const scrollY = event.target.scrollTop
      const translateY = Math.max(100 - scrollY, 0)
      const opacity = Math.min(Math.max((scrollY - MOBILE_SCROLL_THRESHOLD) / 80, 0), 1)
      setTransformValues({ translateY, opacity })
    }

    if (scrollTitle) {
      scrollAreaElem?.addEventListener('scroll', onScroll, { passive: true })
    }

    return () => scrollAreaElem?.removeEventListener('scroll', onScroll)
  }, [scrollTitle])

  return (
    <header className="sticky inset-x-0 top-0 z-10 mx-auto flex h-12 w-full shrink-0 items-center overflow-hidden border-b bg-white text-sm font-medium dark:border-gray-800 dark:bg-gray-950 lg:hidden">
      <div className="flex size-full items-center px-3">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex flex-1 items-center gap-1">
            {goBackLink ? (
              <Button variant="ghost" size="icon" className="shrink-0" asChild>
                <Link href={goBackLink} title="Go back">
                  <ArrowLeftIcon size={16} />
                </Link>
              </Button>
            ) : (
              <MobileDrawer />
            )}
            <div className="flex flex-1 items-center justify-between">
              {scrollTitle && (
                <span
                  className="line-clamp-2 font-semibold tracking-tight"
                  style={{ transform: `translateY(${transformValues.translateY}%)`, opacity: transformValues.opacity }}
                >
                  {scrollTitle}
                </span>
              )}
              {title && (
                <Balancer ratio={0.35}>
                  <span className="line-clamp-2 font-semibold tracking-tight">{title}</span>
                </Balancer>
              )}
            </div>
          </div>
          {children ? <div className="flex min-w-[50px] justify-end">{children}</div> : null}
        </div>
      </div>
    </header>
  )
})

