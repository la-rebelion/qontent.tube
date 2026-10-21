import type { CSSProperties } from "react";
import styles from "./landing.module.css";

const clips = [
  {
    speaker: "NARRATOR · S1",
    tone: "teal",
    bars: [18, 30, 40, 24, 34, 44, 20, 36, 28, 42, 16, 32],
  },
  {
    speaker: "EXPERT · S1",
    tone: "orange",
    bars: [26, 44, 34, 18, 40, 22, 38, 30, 46, 20, 32, 24],
  },
  {
    speaker: "NARRATOR · S2",
    tone: "teal",
    bars: [34, 22, 42, 28, 38, 16, 30, 44, 26, 36, 20, 32],
  },
];

export default function HeroStudio() {
  return (
    <div
      className={styles.studio}
      role="img"
      aria-label="A Markdown script with narrator and expert lines lighting up as a playhead crosses a three-clip voice timeline"
    >
      <div className={styles.studioBar}>
        <span className={styles.documentIcon}>◇</span>
        <span className={styles.studioTitle}>launch-film.md</span>
        <span className={styles.studioTag}>Educational</span>
        <span className={styles.studioTag}>42 sec</span>
      </div>

      <div className={styles.studioBody}>
        <div className={styles.scriptPreview}>
          <span className={styles.syntaxTitle}># Ideas deserve a voice</span>
          <span className={styles.syntaxMeta}>## Scene 1 — The hook</span>
          <span className={styles.direction}>
            [ON SCREEN: A blank timeline comes alive.]
          </span>
          <div className={styles.scriptLine}>
            <strong>**NARRATOR:**</strong>
            <span>Every strong video begins with a story.</span>
          </div>
          <div
            className={`${styles.scriptLine} ${styles.scriptLineOrange}`}
            style={{ "--line-delay": "3s" } as CSSProperties}
          >
            <strong>**EXPERT:**</strong>
            <span>The right voice makes every idea feel clear.</span>
          </div>
          <span className={styles.syntaxMeta}>
            ## Scene 2 — The turning point
          </span>
          <div
            className={styles.scriptLine}
            style={{ "--line-delay": "6s" } as CSSProperties}
          >
            <strong>**NARRATOR:**</strong>
            <span>Now the whole production stays connected.</span>
          </div>
        </div>

        <aside className={styles.outlineRail}>
          <small>ROSTER</small>
          <div className={styles.rosterVoice}>
            <strong>
              <i className={styles.tealDot} /> NARRATOR
            </strong>
            <span>warm · 1.00×</span>
          </div>
          <div className={`${styles.rosterVoice} ${styles.rosterVoiceOrange}`}>
            <strong>
              <i className={styles.orangeDot} /> EXPERT
            </strong>
            <span>steady · 0.95×</span>
          </div>
          <small className={styles.sceneLabel}>SCENES</small>
          <span className={styles.sceneStatus}>
            <b>Scene 1</b>
            <i>ready</i>
          </span>
          <span className={styles.sceneStatus}>
            <b>Scene 2</b>
            <i>ready</i>
          </span>
        </aside>
      </div>

      <div className={styles.transport}>
        <div className={styles.transportMeta}>
          <span className={styles.playButton}>Ⅱ</span>
          <span>One continuous timeline · 3 clips · 2 voices</span>
        </div>
        <div className={styles.waveform}>
          {clips.map((clip) => (
            <div
              className={`${styles.waveClip} ${styles[clip.tone]}`}
              key={clip.speaker}
            >
              <div>
                {clip.bars.map((height, index) => (
                  <i
                    key={`${clip.speaker}-${index}`}
                    style={
                      {
                        "--bar-height": `${height}px`,
                        "--bar-delay": `${index * -0.09}s`,
                      } as CSSProperties
                    }
                  />
                ))}
              </div>
              <small>{clip.speaker}</small>
            </div>
          ))}
          <span className={styles.wavePlayhead} />
        </div>
      </div>
    </div>
  );
}
