import Link from 'next/link'

import { NavigationLink } from '@/components/navigation-link'
import { ThemeToggle } from '@/components/theme-toggle.jsx'
import { PROFILES, LINKS } from '@/lib/constants'

export const MenuContent = () => (
  <div className="flex w-full flex-col text-sm">
    <div className="flex flex-col gap-4">
      <Link href="/" className="link-card inline-flex items-center gap-2 p-2">
        <img
          src="/assets/me.jpeg"
          alt="Tim Darmstädter"
          width={40}
          height={40}
          loading="lazy"
          className="rounded-full border shadow-sm"
          // eslint-disable-next-line react/no-unknown-property
          nopin="nopin"
        />
        <div className="flex flex-col">
          <span className="font-semibold tracking-tight">Tim Darmstädter</span>
          <span className="text-gray-600">Data Analyst</span>
        </div>
      </Link>
      <div className="flex items-center justify-between rounded-md px-2 py-1 transition-colors hover:bg-gray-200 dark:hover:bg-gray-800">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
            Theme
          </span>
          <span className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Light / Dark
          </span>
        </div>
        <ThemeToggle className="ml-2 shrink-0" />
      </div>
      <div className="flex flex-col gap-1">
        {LINKS.map((link, linkIndex) => (
          <NavigationLink
            key={link.href}
            href={link.href}
            label={link.label}
            icon={link.icon}
            shortcutNumber={linkIndex + 1}
          />
        ))}
      </div>
    </div>
    <hr />
    <div className="flex flex-col gap-2 text-sm">
      <span className="px-2 text-xs font-medium leading-relaxed text-gray-600">Online</span>
      <div className="flex flex-col gap-1">
        {Object.values(PROFILES).map((profile) => (
          <NavigationLink key={profile.url} href={profile.url} label={profile.title} icon={profile.icon} />
        ))}
      </div>
    </div>
  </div>
)
