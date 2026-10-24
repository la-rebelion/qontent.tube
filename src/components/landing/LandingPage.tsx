import useBrokenLinks from "@docusaurus/useBrokenLinks";
import HeroStudio from "./HeroStudio";
import {
  AnswerSection,
  BenefitsSection,
  FaqSection,
  FirstWinSection,
  PricingSection,
  ProblemSection,
  ProductSection,
  RoadmapSection,
  RevisionSection,
  StorySection,
  UseCasesSection,
  WorkflowSection,
} from "./MarketingSections";
import styles from "./landing.module.css";

export default function LandingPage() {
  const { collectAnchor } = useBrokenLinks();
  ["top", "how-it-works", "product", "use-cases", "pricing", "faq"].forEach(
    collectAnchor,
  );

  return (
    <>
      <header className={styles.hero} id="top">
        <div className={styles.heroGlow} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.prelaunchPill}>
              <span /> Private pre-launch · early-adopter access
            </p>
            <h1>
              Faceless videos should never feel <em>voiceless.</em>
            </h1>
            <p className={styles.heroLead}>
              Qontent Tube turns your Markdown script into an organized,
              multi-voice voiceover—ready to generate, review, revise, and play
              from one focused desktop workspace.
            </p>
            <p className={styles.heroMantra}>
              Write the story. Cast the voices. Press play.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#pricing">
                Get early access — $49 <span aria-hidden="true">→</span>
              </a>
              <a className={styles.ghostButton} href="#how-it-works">
                <span aria-hidden="true">▶</span> See how it works
              </a>
            </div>
            <ul className={styles.heroProof} aria-label="Product highlights">
              <li>Runs locally on Windows and Linux</li>
              <li>Plain Markdown scripts you own</li>
              <li>One-time pre-launch purchase</li>
              <li>Limited to 25 early-adopter licenses</li>
            </ul>
          </div>
          <div className={styles.heroVisual}>
            <HeroStudio />
          </div>
        </div>
      </header>
      <main className={styles.landing}>
        <AnswerSection />
        <ProblemSection />
        <WorkflowSection />
        <ProductSection />
        <RevisionSection />
        <BenefitsSection />
        <RoadmapSection />
        <UseCasesSection />
        <FirstWinSection />
        <PricingSection />
        <FaqSection />
        <StorySection />
      </main>
    </>
  );
}
