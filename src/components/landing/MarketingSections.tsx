import Link from "@docusaurus/Link";
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
    "How much does it cost?",
    "The private pre-launch early-adopter license is currently presented at $49 as a one-time purchase. Checkout is not yet available from this website.",
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
      <div className={styles.sectionHeading}>
        <p className={styles.eyebrow}>THE PRODUCTION GAP</p>
        <h2 id="problem-title">
          Generating a voice is easy. Managing a whole voiceover is not.
        </h2>
        <p>
          A script, voice settings, downloads, and revisions quickly scatter
          across tools. One rewritten sentence can send you searching through
          the whole production.
        </p>
      </div>
      <div className={styles.problemGrid}>
        <article>
          <span>01</span>
          <strong>Disconnected clips</strong>
          <p>
            Every paragraph becomes another file to name, place, and remember.
          </p>
        </article>
        <article>
          <span>02</span>
          <strong>Lost casting choices</strong>
          <p>
            Voice and pacing decisions drift between scenes and future episodes.
          </p>
        </article>
        <article>
          <span>03</span>
          <strong>Expensive revisions</strong>
          <p>
            A small script improvement triggers unnecessary regeneration and
            reassembly.
          </p>
        </article>
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
      <div className={styles.sectionHeading}>
        <p className={styles.eyebrow}>HOW IT WORKS</p>
        <h2 id="workflow-title">
          From a blank page to a complete voiceover in five steps
        </h2>
      </div>
      <div className={styles.workflowGrid}>
        {workflow.map(([number, title, body]) => (
          <article key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <figure className={styles.wideScreenshot}>
        <img
          src="/img/product/create-project-modal-dark-linux.png"
          alt="Create a project dialog in the Qontent Tube dark workspace"
          loading="lazy"
        />
        <figcaption>
          Start with a project for a channel, client, course, or recurring
          series.
        </figcaption>
      </figure>
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
        <p className={styles.eyebrow}>REVISION WITHOUT CHAOS</p>
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
        aria-label="Illustration of one changed script passage"
      >
        <div>
          <small>BEFORE</small>
          <p>Our tools define what we can build.</p>
          <span className={styles.ready}>READY</span>
        </div>
        <div className={styles.revisionArrow}>→</div>
        <div>
          <small>AFTER</small>
          <p>Our systems define what is possible.</p>
          <span className={styles.outdated}>OUTDATED</span>
        </div>
        <div className={styles.regenerate}>↻ Regenerate this passage</div>
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
      <div className={styles.sectionHeading}>
        <p className={styles.eyebrow}>WHY IT FEELS DIFFERENT</p>
        <h2 id="benefits-title">Not another “generate and download” button</h2>
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
      <div className={styles.lifecycle} aria-label="Qontent Tube workflow">
        {["Draft", "Structure", "Cast", "Generate", "Review", "Revise"].map(
          (item, index) => (
            <div key={item}>
              <span>{index + 1}</span>
              <strong>{item}</strong>
            </div>
          ),
        )}
      </div>
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
          The current pre-launch offer is a one-time license for the Windows and
          Linux desktop application. Checkout is not yet available on this
          website.
        </p>
      </div>
      <div className={styles.priceCard}>
        <span className={styles.priceLabel}>Early-adopter license</span>
        <div>
          <strong>$49</strong>
          <span>one-time</span>
        </div>
        <ul>
          <li>Desktop app for Windows and Linux</li>
          <li>No recurring subscription</li>
          <li>Markdown-first, local workflow</li>
          <li>Reusable multi-voice rosters</li>
        </ul>
        <Link className={styles.primaryButton} to="/docs/getting-started">
          See how Qontent Tube works
        </Link>
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
        <Link className={styles.primaryButton} to="/docs/getting-started">
          Get started with Qontent Tube
        </Link>
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
