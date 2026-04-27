export const ease = [0.22, 1, 0.36, 1] as const;

export const dur = {
  xs: 0.2,
  sm: 0.35,
  md: 0.55,
  lg: 0.8,
  xl: 1.2,
} as const;

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: dur.md, ease, delay },
});

export const stagger = (children = 0.08) => ({
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.1 },
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren: children } },
  },
});

export const item = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: dur.md, ease } },
};

// Page transition (used in app/template.tsx)
export const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease, delay: 0.05 } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25, ease } },
};
