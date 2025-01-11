import Home from '@/app/page'
import {
  Github,
  LinkedinIcon,
  HomeIcon,
  GlobeIcon,
  LaptopIcon,
  TargetIcon,
  BarChartIcon,
} from 'lucide-react'

export const PROFILES = {
  twitter: {
    title: 'X (Twitter)',
    username: 'onurschu',
    url: 'https://twitter.com/intent/user?screen_name=faiwshoe',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#000000"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    )
  },
  github: {
    title: 'GitHub',
    url: 'https://github.com/Faiw420',
    icon: <Github size={16} />
  },
  linkedin: {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/timda/',
    icon: <LinkedinIcon size={16} />
  },
}

export const TWEETS_COLLECTION_ID = 15896982

export const COLLECTION_IDS = [
  18259129,
  15968768,
  23598938,
  16949672,
  15807896,
  15807897,
  15969648,
  16338467,
  TWEETS_COLLECTION_ID,
  25589709,
  17139082,
  22029101,
  39696243
]

export const LINKS = [
  {
    href: '/',
    label: 'Home',
    icon: <HomeIcon size={16} />
  },
  {
    href: '/journey',
    label: 'Journey',
    icon: <GlobeIcon size={16} />
  },
  {
    href: '/techstack',
    label: 'Techstack',
    icon: <LaptopIcon size={16} />
  },
  // {
  //   href: '/about-you',
  //   label: 'About you',
  //   icon: <TargetIcon size={16} />
  // },
  // {
  //   href: '/stats',
  //   label: 'Stats',
  //   icon: <BarChartIcon size={16} />
  // },
]


export const SCROLL_AREA_ID = 'scroll-area'
export const MOBILE_SCROLL_THRESHOLD = 20
export const SUPABASE_TABLE_NAME = 'pages'

export const SUBMIT_BOOKMARK_FORM_TITLE = 'Submit a bookmark'
export const SUBMIT_BOOKMARK_FORM_DESCRIPTION =
  "Send me a website you like and if I like it too, you'll see it in the bookmarks list. With respect, please do not submit more than 5 websites a day."
export const MAX_BOOKMARK_SUBMISSIONS_PER_DAY = 5
export const BOOKMARK_SUBMISSION_COUNT_COOKIE_NAME = 'formSubmissionCount'

export const CONTENT_TYPES = {
  PAGE: 'page',
  POST: 'post',
  LOGBOOK: 'logbook'
}
