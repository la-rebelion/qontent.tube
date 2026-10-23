import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  guideSidebar: [
    "getting-started",
    "writing-scripts",
    "rosters-and-voices",
    "generation-and-playback",
    {
      type: "category",
      label: "Studio & animation (0.2)",
      collapsed: false,
      items: [
        "studio-and-stage",
        "storyboards",
        "ai-drafting",
        "themes",
        "characters",
        "languages",
        "mobile-formats",
        "rendering",
      ],
    },
    "files-and-storage",
    "desktop-and-troubleshooting",
  ],
};

export default sidebars;
