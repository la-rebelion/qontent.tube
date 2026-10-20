import { useState, type KeyboardEvent } from "react";
import styles from "./landing.module.css";

const shots = [
  {
    label: "Script editor",
    image: "/img/product/workspace-selected-roster-linux.png",
    alt: "Qontent Tube script editor with scenes, selected roster, and playback timeline",
    title: "Your script becomes the production plan",
    body: "Scenes, speakers, and visual directions stay readable in Markdown, with structure and runtime beside them.",
  },
  {
    label: "Cast roster",
    image: "/img/product/roster-settings-linux.png",
    alt: "Qontent Tube roster settings with narrator and expert voices",
    title: "Build a cast your audience recognizes",
    body: "Reuse narrator and character voices, including their speaking pace, across every script in a series.",
  },
  {
    label: "Preview",
    image: "/img/product/workspace-playback-preview-linux.png",
    alt: "Qontent Tube Markdown preview with the active spoken passage highlighted",
    title: "Review the words as your audience hears them",
    body: "Preview cleanly rendered scenes while playback follows the current passage and scene.",
  },
  {
    label: "Playback",
    image: "/img/product/workspace-playback-active-linux.png",
    alt: "Qontent Tube playback timeline with active scene and dialogue indicators",
    title: "Listen as one continuous voiceover",
    body: "Play, pause, seek, and move through the complete story without managing a folder of disconnected clips.",
  },
  {
    label: "Dark mode",
    image: "/img/product/workspace-dark-markdown-linux.png",
    alt: "Qontent Tube editor in dark mode with a Markdown script",
    title: "A workspace that fits how you create",
    body: "Choose light, dark, or system-matched themes for long writing and review sessions.",
  },
];

export default function ProductGallery() {
  const [active, setActive] = useState(0);
  const shot = shots[active];

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? shots.length - 1
          : (active + (event.key === "ArrowRight" ? 1 : -1) + shots.length) %
            shots.length;
    setActive(next);
    document.getElementById(`product-tab-${next}`)?.focus();
  }

  return (
    <div className={styles.gallery}>
      <div
        className={styles.tabList}
        role="tablist"
        aria-label="Product views"
        onKeyDown={handleKeyDown}
      >
        {shots.map((item, index) => (
          <button
            aria-controls="product-panel"
            aria-selected={active === index}
            className={styles.galleryTab}
            id={`product-tab-${index}`}
            key={item.label}
            onClick={() => setActive(index)}
            role="tab"
            tabIndex={active === index ? 0 : -1}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.label}
          </button>
        ))}
      </div>
      <div
        aria-labelledby={`product-tab-${active}`}
        className={styles.galleryPanel}
        id="product-panel"
        role="tabpanel"
      >
        <div className={styles.browserFrame} key={shot.image}>
          <div className={styles.browserTop}>
            <i />
            <i />
            <i />
          </div>
          <img src={shot.image} alt={shot.alt} loading="lazy" />
        </div>
        <div className={styles.galleryCaption}>
          <strong>{shot.title}</strong>
          <span>{shot.body}</span>
        </div>
      </div>
    </div>
  );
}
