// Swizzled from @docusaurus/theme-classic Footer to preserve the product footer
// across marketing, documentation, and blog routes.
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

export default function Footer(): React.ReactNode {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Link className={styles.brand} to="/" aria-label="Qontent Tube home">
          <img src="/img/qontent-tube-logo.png" alt="" />
          <span>
            <strong>Qontent Tube</strong>
            <small>Markdown-first voice studio</small>
          </span>
        </Link>
        <nav className={styles.links} aria-label="Footer navigation">
          <a href="/#how-it-works">How it works</a>
          <a href="/#product">Product</a>
          <a href="/#pricing">Pricing</a>
          <Link to="/docs/getting-started">Docs</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </nav>
        <span className={styles.copyright}>
          © 2026 <a href="https://rebelion.la">La Rebelion Labs</a> · Qontent
          Tube
        </span>
      </div>
    </footer>
  );
}
