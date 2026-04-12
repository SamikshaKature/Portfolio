import { motion } from 'framer-motion'

interface Social {
  label: string
  url: string
}

interface MetaData {
  name: string
  tagline: string
  location: string
  email: string
  socials: Social[]
}

interface HeaderProps {
  data: MetaData
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as number[] },
  }),
}

export default function Header({ data }: HeaderProps) {
  return (
    <div className="pt-2">
      {/* Name */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0}
        className="font-sans font-black text-4xl sm:text-5xl tracking-tight leading-none mb-3"
      >
        {data.name}
      </motion.h1>

      {/* Tagline */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.08}
        className="font-mono text-sm text-[#777] mb-6 tracking-wide"
      >
        {data.tagline}
      </motion.p>

      {/* Social links */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.16}
        className="flex flex-wrap items-center gap-x-5 gap-y-2"
      >
        <a
          href={`mailto:${data.email}`}
          className="font-mono text-xs text-[#0D0D0D] underline-offset-4 hover:underline transition-all"
        >
          {data.email}
        </a>

        <span className="text-[#D5D3D0] select-none">·</span>

        {data.socials.map((s) => (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#777] hover:text-[#0D0D0D] transition-colors group inline-flex items-center gap-0.5"
          >
            {s.label}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">
              ↗
            </span>
          </a>
        ))}
      </motion.div>
    </div>
  )
}
