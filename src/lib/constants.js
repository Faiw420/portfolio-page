import { Github, LinkedinIcon, TwitterIcon, HomeIcon, GlobeIcon, LaptopIcon, UserIcon, BarChartIcon, FlaskConicalIcon } from "lucide-react"

export const PROFILES = {
  twitter: {
    title: "X (Twitter)",
    username: "faiwshoe",
    url: "https://twitter.com/intent/user?screen_name=faiwshoe",
    icon: <TwitterIcon size={16} />
  },
  github: {
    title: "GitHub",
    url: "https://github.com/Faiw420",
    icon: <Github size={16} />
  },
  linkedin: {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/timda/",
    icon: <LinkedinIcon size={16} />
  }
}

export const LINKS = [
  {
    href: "/",
    label: "Home",
    icon: <HomeIcon size={16} />
  },
  {
    href: "/journey",
    label: "Journey",
    icon: <GlobeIcon size={16} />
  },
  {
    href: "/techstack",
    label: "Tech Stack",
    icon: <LaptopIcon size={16} />
  },
  {
    href: "/about-you",
    label: "About",
    icon: <UserIcon size={16} />
  },
  {
    href: "/stats",
    label: "Stats",
    icon: <BarChartIcon size={16} />
  },
  {
    href: "/playground",
    label: "Playground",
    icon: <FlaskConicalIcon size={16} />
  }
]

export const KEYBOARD_SHORTCUTS = LINKS.reduce((acc, link, index) => {
  acc[`Digit${index + 1}`] = link.href
  return acc
}, {})

export const THEME_TOGGLE_KEY = "Digit0"

export const SCROLL_AREA_ID = "scroll-area"

