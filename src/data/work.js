// Case studies. Keep them factual: context → what I did → outcome.
// Grouped on the Work page by `category`, in the order of WORK_CATEGORIES.
export const WORK_CATEGORIES = [
  { id: 'professional', label: 'Professional' },
  { id: 'education', label: 'Education' },
  { id: 'side', label: 'Side projects' }
]

export const work = [
  {
    slug: 'sales-reporting',
    category: 'professional',
    period: '2023 – today',
    org: 'Essity Health & Medical',
    title: 'Sales reporting for 300+ field reps',
    summary:
      'Power BI reporting that gives sales representatives across Germany, Austria and Switzerland the numbers they need for their territory, every day.',
    points: [
      'Model and prepare sales data with SQL',
      'Build and maintain Power BI reports used across the DACH sales organisation',
      'Automate recurring data deliveries instead of sending spreadsheets around'
    ],
    stack: ['Power BI', 'SQL', 'Power Automate'],
    featured: true
  },
  {
    slug: 'grid-controlling',
    category: 'professional',
    period: '2020 – 2023',
    org: 'EWR Netz GmbH',
    title: 'Cost controlling for electricity & gas grids',
    summary:
      'Controlling and cost approval for regulated electricity and gas grids with around €150M in annual revenue.',
    points: [
      'Cost optimisation and approval processes for grid operations',
      'Automated recurring controlling workflows with Excel/VBA and later Python',
      'First contact with "data as a product" – the starting point for moving into analytics'
    ],
    stack: ['Excel / VBA', 'Python'],
    featured: true
  },
  {
    slug: 'masters-thesis',
    category: 'education',
    period: '2026',
    org: 'M.Sc. Data Science',
    title: 'Analyzing and Predicting Sustained Attention in Digital Advertising',
    summary:
      'A cross-platform empirical analysis beyond exposure-based metrics. Final thesis of my M.Sc. in Data Science. Data and results are under NDA.',
    points: [],
    stack: ['Data Science', 'Predictive modelling', 'Digital advertising']
  },
  {
    slug: 'thesis',
    category: 'education',
    period: '2020',
    org: 'DHBW Mannheim',
    title: 'Bachelor thesis: revenue optimisation under regulation',
    summary:
      'Bachelor thesis on how German electricity and gas grid operators can optimise revenue within the incentive-regulation framework.',
    points: [],
    stack: ['Research', 'Regulation', 'Modelling']
  },
  {
    slug: 'homelab',
    category: 'side',
    period: 'Ongoing',
    org: 'Home lab',
    title: 'Self-hosted home infrastructure',
    summary:
      'A Raspberry Pi 4 running paperless-ngx for a paperless home office, Home Assistant, a Mealie recipe server for the family and the Umami instance behind this site’s stats.',
    points: [],
    stack: ['Docker', 'Raspberry Pi', 'paperless-ngx', 'Home Assistant', 'Umami'],
    featured: true
  },
  {
    slug: 'this-site',
    category: 'side',
    period: 'Ongoing',
    org: 'Personal',
    title: 'This portfolio',
    summary:
      'Built with Astro and Tailwind CSS. The Stats page reads live data from my self-hosted Umami instance – a small analytics dashboard about its own visitors.',
    points: [],
    stack: ['Astro', 'Tailwind CSS', 'Umami API'],
    href: 'https://github.com/Faiw420/portfolio-page',
    featured: true
  }
]
