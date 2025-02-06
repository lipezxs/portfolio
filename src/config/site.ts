export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vite + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Início",
      href: "/",
    },
    {
      label: "Sobre mim",
      href: "/docs",
    },
    {
      label: "Conhecimentos",
      href: "/pricing",
    },
    {
      label: "Projetos",
      href: "/blog",
    },
    {
      label: "Fale comigo!",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Início",
      href: "/",
    },
    {
      label: "Sobre mim",
      href: "/docs",
    },
    {
      label: "Conhecimentos",
      href: "/pricing",
    },
    {
      label: "Projetos",
      href: "/blog",
    },
    {
      label: "Fale comigo!",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/frontio-ai/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
