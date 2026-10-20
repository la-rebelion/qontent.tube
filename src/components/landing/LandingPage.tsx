import Link from "@docusaurus/Link";
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
            <p className={styles.heroEyebrow}>
              <span /> MARKDOWN-FIRST VOICE STUDIO
            </p>
            <h1>
              Faceless videos should never feel <em>voiceless.</em>
            </h1>
            <p className={styles.heroLead}>
              Write the story. Cast the voices. Press play. Qontent Tube turns
              scene-based Markdown into an organized, multi-voice production you
              can revise without rebuilding.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} to="/docs/getting-started">
                Get started
              </Link>
              <a className={styles.ghostButton} href="#how-it-works">
                See how it works <span>↓</span>
              </a>
            </div>
            <div className={styles.platforms} aria-label="Supported platforms">
              <span>Windows x64</span>
              <i /> <span>Linux x64</span>
              <i /> <span>Local-first</span>
            </div>
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
        <UseCasesSection />
        <FirstWinSection />
        <PricingSection />
        <FaqSection />
        <StorySection />
      </main>
    </>
  );
}
