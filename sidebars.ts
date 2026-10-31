import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  guideSidebar: [
    "requirements",
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
    {
      type: "category",
      label: "Real captures (0.3)",
      collapsed: false,
      items: [
        "product-demo-workflow",
        "capture-scenes",
        "validate-and-approve",
        "ai-adaptation",
      ],
    },
    "files-and-storage",
    "desktop-and-troubleshooting",
  ],
};

export default sidebars;
