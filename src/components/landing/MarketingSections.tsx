import Link from "@docusaurus/Link";
import type { CSSProperties } from "react";
import CheckoutButton from "./CheckoutButton";
import ProductGallery from "./ProductGallery";
import styles from "./landing.module.css";

const workflow = [
  [
    "01",
    "Write in simple Markdown",
    "Use scene headings, bold speaker cues, and bracketed production directions in a format that stays yours.",
  ],
  [
    "02",
    "Build your reusable cast",
    "Give each narrator or character a voice and speaking pace, then reuse that roster across scripts.",
  ],
  [
    "03",
    "See the production first",
    "Review scenes, speaker appearances, and estimated runtime before spending time generating audio.",
  ],
  [
    "04",
    "Generate what you need",
    "Create all missing narration or focus on one scene, speaker, or changed passage.",
  ],
  [
    "05",
    "Hear it as one story",
    "Play every ready clip as a continuous timeline while the current words stay highlighted.",
  ],
];

const benefits = [
  [
    "Your words stay yours",
    "Scripts remain ordinary Markdown files you can read, edit, move, and back up.",
  ],
  [
    "Revisions stop feeling like rework",
    "Changed dialogue becomes outdated without disturbing narration that is still current.",
  ],
  [
    "Every voice remains consistent",
    "Reusable rosters keep voice and pace decisions together across an entire series.",
  ],
  [
    "Long scripts become navigable",
    "Jump through scenes, speaker appearances, and estimated runtimes without losing context.",
  ],
  [
    "Bring the editor you love",
    "Add or edit Markdown in your content folder and reconcile it safely with the workspace.",
  ],
  [
    "Runs on your machine",
    "The desktop app keeps projects and audio local on Windows and Linux.",
  ],
];

const uses = [
  "YouTube explainers & educational channels",
  "Mini documentaries & video essays",
  "Product walkthroughs & software tutorials",
  "News, trend & commentary videos",
  "Top-ten lists & story compilations",
  "Animated stories & recurring characters",
  "Course lessons & training material",
  "Shorts, Reels & social narration",
  "Podcasts with scripted segments",
  "Multi-speaker experiments",
];

const looseFiles = [
  ["narration_final_v3.mp3", "teal", "6%", "10%", "-4deg", "0s"],
  ["expert_take4_REAL.wav", "orange", "47%", "23%", "3deg", "-1.2s"],
  ["scene2_line7 (1).mp3", "teal", "13%", "42%", "2deg", "-2.4s"],
  ["which_voice_was_this.mp3", "red", "40%", "59%", "-2deg", "-3.1s"],
  ["intro_OLD_dont_use.wav", "orange", "8%", "76%", "5deg", "-0.6s"],
];

const lifecycle = [
  "Draft the idea",
  "Organize into scenes",
  "Assign the cast",
  "Plan the runtime",
  "Generate narration",
  "Review the flow",
  "Improve weak moments",
  "Regenerate only what changed",
];

const faqs = [
  [
    "What is Qontent Tube?",
    "Qontent Tube is a desktop voice studio that turns scene-based Markdown scripts into organized, multi-voice narration. It connects scenes, speakers, reusable voices, generation state, and playback in one workspace.",
  ],
  [
    "How do I format a script?",
    "Use a # title, ## scene headings, standalone bold speaker cues such as **NARRATOR:**, and bracketed production notes such as [ON SCREEN: …]. Production notes remain visible but are never spoken.",
  ],
  [
    "Can I use multiple voices and characters?",
    "Yes. Build a roster for a channel, show, course, or series, then give each narrator or character a voice and speaking pace that can be reused across scripts.",
  ],
  [
    "What happens when I change a line?",
    "Qontent Tube marks narration affected by the text, voice, or pace change as outdated. Regenerate that passage while every unchanged clip stays in place.",
  ],
  [
    "Can I write scripts in my own editor?",
    "Yes. Add or update top-level Markdown files in the project content folder, then refresh the project. Missing files remain visible so they can be restored safely.",
  ],
  [
    "Which operating systems are supported?",
    "The packaged desktop release targets Windows x64 and Linux x64. The application runs locally and opens its workspace in your browser.",
  ],
  [
    "What do I need before buying?",
    "For voice generation you need your own Deepgram API key and internet access. Finished video rendering also needs ffmpeg 5+ with libx264 and AAC, plus Chrome, Chromium, or Edge. AI drafting and automatic scene images use optional third-party AI credentials; manual alternatives are available.",
  ],
  [
    "How much does it cost?",
    "Private pre-launch early-adopter access is $49 as a one-time purchase. It covers the private v0.x pre-launch period only; it does not include or guarantee a public-release license. Public-release features may be limited or require a separate purchase.",
  ],
];

export function AnswerSection() {
  return (
    <section className={styles.answerSection} aria-labelledby="what-title">
      <p className={styles.eyebrow}>MARKDOWN TO VOICE</p>
      <h2 id="what-title">What is Qontent Tube?</h2>
      <p className={styles.answerLead}>
        Qontent Tube is a desktop voice studio for creators who build narrated
        videos from scripts.
      </p>
      <p>
        It reads a small, predictable Markdown structure, connects each speaker
        to a reusable voice roster, shows the shape and estimated runtime of the
        production, and plays generated dialogue as one continuous timeline.
      </p>
      <div className={styles.answerLinks}>
        <Link to="/docs/getting-started">Start your first voiceover →</Link>
        <Link to="/docs/writing-scripts">See the script format →</Link>
      </div>
    </section>
  );
}

export function ProblemSection() {
  return (
    <section className={styles.problemSection} aria-labelledby="problem-title">
      <div className={styles.problemCopy}>
        <p className={`${styles.eyebrow} ${styles.orange}`}>THE PROBLEM</p>
        <h2 id="problem-title">
          Generating a voice is easy. Managing a whole voiceover is not.
        </h2>
        <p>
          You have the idea, the script, maybe even the visuals. Then comes the
          slow part: naming files, matching clips to scenes, remembering every
          voice—and doing it again when one sentence changes.
        </p>
        <ul>
          <li>The script lives in one document.</li>
          <li>Voice settings live somewhere else.</li>
          <li>Every paragraph becomes another download.</li>
          <li>Scenes and clips lose their connection.</li>
          <li>A small rewrite creates another round of manual work.</li>
          <li>More narrators multiply the confusion.</li>
        </ul>
      </div>
      <div className={styles.fileChaos} aria-hidden="true">
        <span className={styles.fileChaosLabel}>
          UNSORTED AUDIO / FINAL / FINAL-2
        </span>
        {looseFiles.map(([name, tone, left, top, rotation, delay]) => (
          <span
            className={`${styles.looseFile} ${styles[tone]}`}
            key={name}
            style={
              {
                left,
                top,
                "--file-rotation": rotation,
                "--file-delay": delay,
              } as CSSProperties
            }
          >
            <i /> {name}
          </span>
        ))}
      </div>
    </section>
  );
}

export function WorkflowSection() {
  return (
    <section
      className={styles.workflowSection}
      id="how-it-works"
      aria-labelledby="workflow-title"
    >
      <div className={`${styles.sectionHeading} ${styles.workflowHeading}`}>
        <p className={styles.eyebrow}>HOW IT WORKS</p>
        <h2 id="workflow-title">
          From a blank page to a complete voiceover in five steps
        </h2>
      </div>
      <div className={styles.workflowStage}>
        <figure className={styles.markdownSpecimen}>
          <figcaption>
            <span>notes-app-ideas.md</span>
            <b>plain Markdown</b>
          </figcaption>
          <pre>
            <span># Why Great Ideas Never Leave the Notes App</span>
            {"\n\n"}
            <span>## Scene 1 — The unfinished idea</span>
            {"\n\n"}
            <i>[ON SCREEN: A phone filled with half-written notes.]</i>
            {"\n\n"}
            <strong>**NARRATOR:**</strong>
            {"\n"}
            You probably do not need more ideas. You need a better way to finish
            the ones you already have.{"\n\n"}
            <span>## Scene 2 — The hidden cost</span>
            {"\n\n"}
            <i>[ON SCREEN: Notes become unfinished project folders.]</i>
            {"\n\n"}
            <strong>**NARRATOR:**</strong>
            {"\n"}
            Every unfinished draft asks you to make the same decisions again.
          </pre>
          <div className={styles.markdownLegend}>
            <span>
              <i /> headings shape the outline
            </span>
            <span>
              <i /> bold names set the speaker
            </span>
            <span>
              <i /> brackets are never spoken
            </span>
          </div>
        </figure>
        <ol className={styles.workflowList}>
          {workflow.map(([number, title, body], index) => (
            <li key={number}>
              <span className={index > 2 ? styles.stepAccent : undefined}>
                {Number(number)}
              </span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ProductSection() {
  return (
    <section
      className={styles.productSection}
      id="product"
      aria-labelledby="product-title"
    >
      <div className={styles.sectionHeading}>
        <p className={styles.eyebrow}>THE WORKSPACE</p>
        <h2 id="product-title">Quiet, focused, and built around the script</h2>
        <p>
          Projects stay on the left, the script remains at the center, structure
          sits on the right, and playback is always within reach.
        </p>
      </div>
      <ProductGallery />
    </section>
  );
}

export function RevisionSection() {
  return (
    <section
      className={styles.revisionSection}
      aria-labelledby="revision-title"
    >
      <div className={styles.revisionCopy}>
        <p className={`${styles.eyebrow} ${styles.orange}`}>
          REVISION WITHOUT CHAOS
        </p>
        <h2 id="revision-title">Change one sentence. Regenerate one clip.</h2>
        <p>
          Freshness follows the words, voice, pace, and generation version.
          Qontent Tube shows exactly what needs attention and keeps everything
          else ready.
        </p>
        <Link className={styles.textLink} to="/docs/generation-and-playback">
          Learn how generation state works →
        </Link>
      </div>
      <div
        className={styles.revisionDemo}
        role="img"
        aria-label="One edited script passage cycles from ready to outdated, regenerating, and ready again while surrounding passages remain ready"
      >
        <div className={styles.revisionHeader}>
          <strong>SCENE 2 — THE HIDDEN COST</strong>
          <span>3 passages</span>
        </div>
        <div className={styles.revisionRow}>
          <p>
            <small>NARRATOR</small>Every unfinished draft asks you to decide
            again.
          </p>
          <span className={styles.ready}>Ready</span>
        </div>
        <div className={`${styles.revisionRow} ${styles.revisionChanging}`}>
          <p>
            <small>EXPERT</small>
            <span className={styles.oldLine}>
              The cost is not time. It is momentum.
            </span>
            <span className={styles.newLine}>
              The real cost is lost momentum.<i>▍</i>
            </span>
          </p>
          <span className={styles.revisionStates}>
            <b className={styles.stateReady}>Ready</b>
            <b className={styles.stateOutdated}>Outdated</b>
            <b className={styles.stateGenerating}>↻ Regenerating</b>
            <b className={styles.stateDone}>✓ Ready · new</b>
          </span>
        </div>
        <div className={styles.revisionRow}>
          <p>
            <small>NARRATOR</small>So finish one idea before you chase the next.
          </p>
          <span className={styles.ready}>Ready</span>
        </div>
        <div className={styles.revisionFooter}>
          2 clips kept · 1 regenerated · 0 files renamed
        </div>
      </div>
    </section>
  );
}

export function BenefitsSection() {
  return (
    <section
      className={styles.benefitsSection}
      aria-labelledby="benefits-title"
    >
      <div className={`${styles.sectionHeading} ${styles.benefitsHeading}`}>
        <p className={styles.eyebrow}>WHY CREATORS FEEL THE DIFFERENCE</p>
        <h2 id="benefits-title">Not another “generate and download” button</h2>
        <p>
          Voice generation is useful. A dependable voiceover workflow is
          transformative. Qontent Tube is designed around the life of a script.
        </p>
      </div>
      <div className={styles.benefitsGrid}>
        {benefits.map(([title, body], index) => (
          <article key={title}>
            <span>0{index + 1}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <ol
        className={styles.lifecycle}
        aria-label="The life of a script in Qontent Tube"
      >
        {lifecycle.map((item, index) => (
          <li key={item}>
            <span className={index > 3 ? styles.lifecycleWarm : undefined}>
              {item}
            </span>
            {index < lifecycle.length - 1 && <i aria-hidden="true">→</i>}
          </li>
        ))}
      </ol>
    </section>
  );
}

export function RoadmapSection() {
  return (
    <section
      className={styles.roadmapSection}
      id="whats-next"
      aria-labelledby="roadmap-title"
    >
      <div className={styles.roadmapHeading}>
        <div>
          <p className={styles.roadmapStatus}>
            <span aria-hidden="true" /> IN DESIGN · V0.2
          </p>
          <p className={styles.eyebrow}>MARKDOWN → VOICE → ANIMATION</p>
          <h2 id="roadmap-title">
            Your script is about to step onto the stage.
          </h2>
        </div>
        <p>
          Today, Qontent Tube gives your Markdown a cast and a voice. Next, the
          same script becomes editable scenes you can preview, style, and render
          locally into a finished video.
        </p>
      </div>

      <div className={styles.roadmapGallery}>
        <figure className={styles.roadmapFeature}>
          <div className={styles.roadmapImageFrame}>
            <img
              src="/img/roadmap/studio-v020.png"
              alt="Concept preview of the upcoming Qontent Tube Studio with a Markdown script, animated stage, mobile adaptation controls, and multi-track timeline"
              loading="lazy"
            />
          </div>
          <figcaption>
            <span>01 · STUDIO + RENDER</span>
            <h3>Hear it. See it. Ship it.</h3>
            <p>
              Voice-driven timing, a scene timeline, wide and vertical previews,
              and local MP4 rendering from one workspace.
            </p>
          </figcaption>
        </figure>

        <div className={styles.roadmapCompanions}>
          <figure>
            <div className={styles.roadmapImageFrame}>
              <img
                src="/img/roadmap/themes-v020.png"
                alt="Concept preview of the upcoming theme editor with color tokens, contrast checks, and live wide and mobile previews"
                loading="lazy"
              />
            </div>
            <figcaption>
              <span>02 · THEMES</span>
              <h3>Make every frame feel like yours.</h3>
              <p>Reusable colors, accessible contrast, and live previews.</p>
            </figcaption>
          </figure>
          <figure>
            <div className={styles.roadmapImageFrame}>
              <img
                src="/img/roadmap/characters-v020.png"
                alt="Concept preview of the upcoming character builder with generated variations, expressions, voice assignment, and animation rig controls"
                loading="lazy"
              />
            </div>
            <figcaption>
              <span>03 · CHARACTERS</span>
              <h3>Build a cast your audience remembers.</h3>
              <p>Reusable characters with expressions, voices, and motion.</p>
            </figcaption>
          </figure>
        </div>
      </div>

      <ol className={styles.roadmapMilestones} aria-label="Planned milestones">
        <li>
          <span>M1</span>
          <strong>Stage + local video render</strong>
        </li>
        <li>
          <span>M2 · v0.2</span>
          <strong>Storyboards, themes + characters</strong>
        </li>
        <li>
          <span>M3 · v0.3</span>
          <strong>Languages + mobile adaptation</strong>
        </li>
      </ol>
      <p className={styles.roadmapNote}>
        These are working product sketches. The details may evolve; the
        direction will not.
      </p>
    </section>
  );
}

export function UseCasesSection() {
  return (
    <section
      className={styles.useCasesSection}
      id="use-cases"
      aria-labelledby="uses-title"
    >
      <div className={styles.useCasesIntro}>
        <p className={styles.eyebrow}>MADE FOR FACELESS CREATORS</p>
        <h2 id="uses-title">Made for the formats you publish every day</h2>
        <p>
          Use one familiar narrator or a full cast for interviews, debates,
          stories, and character-led formats.
        </p>
      </div>
      <ul className={styles.useCasesGrid}>
        {uses.map((use) => (
          <li key={use}>{use}</li>
        ))}
      </ul>
    </section>
  );
}

export function FirstWinSection() {
  return (
    <section
      className={styles.firstWinSection}
      aria-labelledby="first-win-title"
    >
      <div className={styles.screenshotFrame}>
        <img
          src="/img/product/empty-state-dark-linux.png"
          alt="Qontent Tube start screen saying Write the script. Hear the roster."
          loading="lazy"
        />
      </div>
      <div>
        <p className={`${styles.eyebrow} ${styles.orange}`}>
          THE FIVE-MINUTE FIRST WIN
        </p>
        <h2 id="first-win-title">
          Hear your first multi-voice draft in five minutes
        </h2>
        <ol>
          <li>Create a project for your channel or series.</li>
          <li>Add a roster and choose a narrator voice.</li>
          <li>Write a title, two scenes, and two short passages.</li>
          <li>Select the roster and check the outline.</li>
          <li>Generate the narration, press play, and listen.</li>
        </ol>
        <Link className={styles.textLink} to="/docs/getting-started">
          Follow the complete guide →
        </Link>
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section
      className={styles.pricingSection}
      id="pricing"
      aria-labelledby="pricing-title"
    >
      <div className={styles.pricingCopy}>
        <p className={`${styles.eyebrow} ${styles.orange}`}>
          PRIVATE PRE-LAUNCH
        </p>
        <h2 id="pricing-title">
          An early-adopter license for creators who want to shape the workflow
        </h2>
        <p>
          The current $49 offer is a one-time purchase for early-adopter access
          to the private Windows and Linux v0.x pre-launch releases. Pay
          securely through Stripe and use the same email for access delivery.
        </p>
        <p>
          You may keep using any v0.x build you legitimately obtain. Access to
          new downloads and private-beta updates lasts only while the program is
          active and does not automatically convert into a public-release
          license.
        </p>
      </div>
      <div className={styles.priceCard}>
        <div className={styles.priceCardTop}>
          <span className={styles.priceLabel}>Pre-launch early access</span>
          <span className={styles.priceBadge}>Private release</span>
        </div>
        <div>
          <strong>$49</strong>
          <span>one-time</span>
        </div>
        <ul>
          <li>Desktop app for Windows and Linux</li>
          <li>No recurring subscription</li>
          <li>Markdown-first, local workflow</li>
          <li>Reusable multi-voice rosters</li>
          <li>Private pre-launch v0.x access</li>
          <li>Pre-launch updates while the program runs</li>
        </ul>
        <aside className={styles.purchaseRequirements}>
          <strong>Check before you buy</strong>
          <p>
            Voice generation requires your own Deepgram API key and internet
            access. Video rendering also requires ffmpeg 5+ with H.264/AAC and
            Chrome, Chromium, or Edge. Optional AI and image features use your
            own provider access; provider fees are not included.
          </p>
          <Link to="/docs/requirements">Review every requirement →</Link>
        </aside>
        <p className={styles.licenseDisclosure}>
          Private-beta features may change or be restricted in the public
          release. Your purchase covers private v0.x access and does not
          automatically include the public release.{" "}
          <Link to="/terms">Read the terms.</Link>
        </p>
        <CheckoutButton />
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className={styles.faqSection} id="faq" aria-labelledby="faq-title">
      <p className={styles.eyebrow}>FAQ</p>
      <h2 id="faq-title">Questions creators ask</h2>
      <div className={styles.faqList}>
        {faqs.map(([question, answer], index) => (
          <details key={question} open={index === 0}>
            <summary>
              <span>{question}</span>
              <i aria-hidden="true">+</i>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function StorySection() {
  return (
    <section className={styles.storySection} aria-labelledby="story-title">
      <div className={styles.storyCopy}>
        <p className={`${styles.eyebrow} ${styles.orange}`}>WHY WE BUILT IT</p>
        <h2 id="story-title">
          The hardest part should be finding the story—not managing dozens of
          audio fragments after you find it.
        </h2>
        <p>
          Qontent Tube grew from making faceless videos with a different voice
          for every character and narrator. Small edits kept turning into large
          production chores, so we built a workspace where the script stays at
          the heart of the process and recurring voices feel like a cast.
        </p>
      </div>
      <div className={styles.finalCta}>
        <img src="/img/qontent-tube-logo.png" alt="" />
        <h2>
          One script. One cast. <span>One continuous story.</span>
        </h2>
        <p>
          Spend less time organizing clips and more time making videos people
          want to finish.
        </p>
        <CheckoutButton />
        <small>Windows x64 · Linux x64 · local-first</small>
      </div>
    </section>
  );
}

export const faqStructuredData = faqs.map(([name, text]) => ({
  "@type": "Question",
  name,
  acceptedAnswer: { "@type": "Answer", text },
}));
