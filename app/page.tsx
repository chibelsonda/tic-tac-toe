import { TicTacToe } from "@/components/TicTacToe";

export default function Home() {
  return (
    <main className="site-shell">
      <div className="ambient-shape ambient-shape-one" aria-hidden="true" />
      <div className="ambient-shape ambient-shape-two" aria-hidden="true" />

      <header className="masthead">
        <a className="wordmark" href="#game" aria-label="Pick a Side home">
          <span className="wordmark-mark" aria-hidden="true">VS</span>
          <span>Pick a Side</span>
        </a>
        <p className="masthead-note">Two players · One screen</p>
      </header>

      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">A tiny rivalry in three acts</p>
          <h1 id="page-title">
            Tic.<br />Tac.<br /><span>Toe.</span>
          </h1>
          <p className="hero-description">
            Take turns. Claim three. Earn bragging rights.
            No sign-up, no loading screen—just you, a worthy opponent,
            and nine little squares.
          </p>
          <div className="legend" aria-label="Player colors">
            <span><i className="legend-dot legend-x" /> Sword plays cobalt</span>
            <span><i className="legend-dot legend-o" /> Shield plays vermilion</span>
          </div>
        </div>

        <TicTacToe />
      </section>

      <footer className="footer">
        <p>Built with React + Next.js</p>
        <p>Best played with a competitive friend.</p>
      </footer>
    </main>
  );
}
