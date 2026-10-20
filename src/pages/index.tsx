import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import LandingPage from "@site/src/components/landing/LandingPage";
import { faqStructuredData } from "@site/src/components/landing/MarketingSections";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Qontent Tube",
      url: "https://qontent.tube/",
      applicationCategory: "MultimediaApplication",
      applicationSubCategory: "Voiceover and narration production",
      operatingSystem: "Windows, Linux",
      description:
        "Qontent Tube turns scene-based Markdown scripts into organized, multi-voice narration with reusable voice rosters and continuous playback.",
      featureList: [
        "Markdown scripts with scenes, speakers, and production notes",
        "Reusable voice rosters for narrators and characters",
        "Scene and speaker outline with estimated runtime",
        "Targeted narration generation and stale-audio detection",
        "Continuous playback with active script highlighting",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqStructuredData,
    },
  ],
};

export default function Home(): React.ReactNode {
  return (
    <Layout
      title="Turn Markdown scripts into multi-voice narration"
      description="Write the story, cast reusable voices, and hear your Markdown script as one continuous narration."
    >
      <Head>
        <link rel="canonical" href="https://qontent.tube/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Qontent Tube — Multi-voice narration from Markdown"
        />
        <meta
          property="og:description"
          content="Write the story. Cast the voices. Press play."
        />
        <meta
          property="og:image"
          content="https://qontent.tube/img/product/workspace-playback-preview-linux.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      <LandingPage />
    </Layout>
  );
}
