import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
  title: "Qontent Tube",
  tagline: "Turn Markdown scripts into multi-voice video narration",
  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },
  favicon: "img/qontent-tube-logo.png",
  url: "https://qontent.tube",
  baseUrl: "/",
  customFields: {
    checkoutApiUrl:
      process.env.QONTENT_CHECKOUT_API_URL ?? "https://api.qontent.tube",
    turnstileSiteKey:
      process.env.QONTENT_TURNSTILE_SITE_KEY ?? "0x4AAAAAAFfNdTc-k72PeqX-",
  },
  organizationName: "la-rebelion",
  projectName: "qontent-tube-website",
  onBrokenLinks: "throw",
  onBrokenAnchors: "throw",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    localeConfigs: {
      en: {
        label: "English",
        htmlLang: "en-US",
      },
      es: {
        label: "Español",
        htmlLang: "es-MX",
      },
    },
  },
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "docs",
        },
        blog: {
          routeBasePath: "blog",
          showReadingTime: true,
          blogTitle: "Qontent Tube Blog",
          blogDescription:
            "Notes on writing, casting, and producing multi-voice narration.",
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: "img/product/workspace-playback-preview-linux.png",
    metadata: [
      {
        name: "description",
        content:
          "Qontent Tube is a desktop voice studio for turning scene-based Markdown scripts into organized, multi-voice narration.",
      },
      { name: "theme-color", content: "#0c2028" },
    ],
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Qontent Tube",
      logo: {
        alt: "Qontent Tube logo",
        src: "img/qontent-tube-logo.png",
      },
      items: [
        { href: "/#how-it-works", label: "How it works", position: "left" },
        { href: "/#product", label: "Product", position: "left" },
        { href: "/#use-cases", label: "Use cases", position: "left" },
        { href: "/#pricing", label: "Pricing", position: "left" },
        { href: "/#faq", label: "FAQ", position: "left" },
        {
          type: "docSidebar",
          sidebarId: "guideSidebar",
          label: "Docs",
          position: "right",
        },
        { to: "/blog", label: "Blog", position: "right" },
        {
          to: "/docs/getting-started",
          label: "Get started",
          position: "right",
          className: "navbar__cta",
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  scripts: [
    {
      src: "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",
      async: true,
      defer: true,
    },
  ],
};

export default config;
