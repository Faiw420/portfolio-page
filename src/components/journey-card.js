export const JourneyCard = ({ title, description, image, index }) => (
  <div className="word-break-word flex flex-col">
    <span className="font-semibold tracking-tight">{title}</span>
    {description && <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{description}</p>}
    {image?.url && (
      <div className="mt-2.5 overflow-hidden rounded-xl bg-white dark:bg-gray-900">
        <img
          src={image.url}
          alt={image.title || image.description || title}
          width={image.width}
          height={image.height}
          loading={index < 1 ? 'eager' : 'lazy'}
          className="animate-reveal"
          // eslint-disable-next-line react/no-unknown-property
          nopin="nopin"
        />
      </div>
    )}
  </div>
)

