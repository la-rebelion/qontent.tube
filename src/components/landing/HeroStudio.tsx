import styles from "./landing.module.css";

const scriptLines = [
  { speaker: "NARRATOR", text: "Every strong video begins with a story." },
  { speaker: "EXPERT", text: "The right voice makes every idea feel clear." },
  { speaker: "NARRATOR", text: "Now the whole production stays in one place." },
];

export default function HeroStudio() {
  return (
    <div
      className={styles.studio}
      aria-label="Animated preview of the Qontent Tube workspace"
    >
      <div className={styles.studioBar}>
        <span className={styles.windowDot} />
        <span className={styles.windowDot} />
        <span className={styles.windowDot} />
        <span className={styles.studioTitle}>launch-film.md</span>
        <span className={styles.liveBadge}>VOICE READY</span>
      </div>
      <div className={styles.studioBody}>
        <aside className={styles.projectRail}>
          <small>PROJECTS</small>
          <strong>Launch series</strong>
          <span className={styles.activeFile}>launch-film.md</span>
          <span>behind-scenes.md</span>
        </aside>
        <div className={styles.scriptPreview}>
          <span className={styles.syntaxMeta}>
            ## Scene 2 — The turning point
          </span>
          <span className={styles.direction}>
            [ON SCREEN: The workspace comes into focus.]
          </span>
          {scriptLines.map((line, index) => (
            <div
              className={styles.scriptLine}
              style={{ "--line-delay": `${index * 3}s` } as React.CSSProperties}
              key={line.text}
            >
              <strong>{line.speaker}:</strong>
              <span>{line.text}</span>
            </div>
          ))}
        </div>
        <aside className={styles.outlineRail}>
          <small>SCENES</small>
          <span>01 — The hook</span>
          <strong>02 — The turning point</strong>
          <small>ROSTER</small>
          <span>
            <i className={styles.tealDot} /> Narrator
          </span>
          <span>
            <i className={styles.orangeDot} /> Expert
          </span>
        </aside>
      </div>
      <div className={styles.transport}>
        <span className={styles.playButton}>▶</span>
        <span className={styles.time}>0:18</span>
        <span className={styles.timeline}>
          <i />
        </span>
        <span className={styles.time}>0:42</span>
      </div>
    </div>
  );
}
