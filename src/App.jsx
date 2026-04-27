import { useEffect, useMemo, useState } from 'react'

const ROADMAP_STEPS = [
  {
    id: 1,
    title: 'Setup wallet',
    subtitle: 'Phantom / MetaMask',
    description:
      'Skonfiguruj portfel i zapisz seed phrase offline. Używaj osobnego walleta do eksperymentów z DeFi.',
    tag: 'Start',
  },
  {
    id: 2,
    title: 'First swap basics',
    subtitle: 'DEX / slippage / fees',
    description:
      'Zrozum jak działa swap tokenów, poślizg ceny i opłaty sieciowe przed pierwszą transakcją.',
    tag: 'Trading',
  },
  {
    id: 3,
    title: 'Lending basics',
    subtitle: 'Supply / borrow',
    description:
      'Poznaj depozyty, pożyczki, collateral i ryzyko liquidacji przy korzystaniu z lendingu.',
    tag: 'Yield',
  },
  {
    id: 4,
    title: 'Airdrop farming intro',
    subtitle: 'On-chain activity',
    description:
      'Sprawdź jak działa aktywność on-chain i dlaczego użytkownicy robią taski pod potencjalne airdropy.',
    tag: 'Airdrops',
  },
  {
    id: 5,
    title: 'Security basics',
    subtitle: 'Scams / approvals / OPSEC',
    description:
      'Naucz się unikać phishingu, pilnować approvals i nie podpinać walleta do losowych stron.',
    tag: 'Safety',
  },
]

const TOOLS = [
  {
    name: 'Jupiter',
    url: 'https://jup.ag',
    description: 'Solana DEX aggregator do szukania najlepszych tras swapu.',
    badge: 'Solana',
  },
  {
    name: 'Uniswap',
    url: 'https://app.uniswap.org',
    description: 'Najbardziej rozpoznawalny DEX do swapów i eksploracji tokenów.',
    badge: 'Ethereum',
  },
  {
    name: 'Aave',
    url: 'https://app.aave.com',
    description: 'Popularny protokół lendingowy do supply i borrow.',
    badge: 'Lending',
  },
]

const TERMS = [
  {
    name: 'Swap',
    description: 'Wymiana jednego tokena na inny bezpośrednio przez smart contract.',
  },
  {
    name: 'LP (Liquidity Pool)',
    description: 'Pula płynności dostarczana przez użytkowników, która zasila handel na DEX.',
  },
  {
    name: 'Yield',
    description: 'Zysk lub zwrot generowany przez aktywa używane w protokołach DeFi.',
  },
  {
    name: 'Airdrop',
    description: 'Darmowa dystrybucja tokenów dla użytkowników spełniających określone warunki.',
  },
]

const STORAGE_KEY = 'crypto-roadmap-progress-v2'

function loadCompletedSteps() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function App() {
  const [completedSteps, setCompletedSteps] = useState(loadCompletedSteps)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedSteps))
    } catch {}
  }, [completedSteps])

  const toggleStep = (id) => {
    setCompletedSteps((prev) =>
      prev.includes(id) ? prev.filter((stepId) => stepId !== id) : [...prev, id]
    )
  }

  const progress = useMemo(() => {
    return Math.round((completedSteps.length / ROADMAP_STEPS.length) * 100)
  }, [completedSteps])

  return (
    <div className="page">
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />

      <main className="container">
        <section className="hero card">
          <div className="hero__top">
            <div className="brand-pill">
              <span className="brand-pill__dot" />
              Crypto Roadmap Tool
            </div>
            <div className="status-chip">{completedSteps.length}/{ROADMAP_STEPS.length} done</div>
          </div>

          <div className="hero__content">
            <div>
              <p className="eyebrow">DeFi starter roadmap</p>
              <h1>Dark mode crypto MVP dla początkującego użytkownika DeFi</h1>
              <p className="hero__text">
                Prosty roadmap tracker z localStorage, sekcją tools i podstawowymi terminami.
                Minimalistycznie, ale z nowocześniejszym klimatem crypto.
              </p>
            </div>

            <div className="hero__stats">
              <div className="stat-card">
                <span className="stat-label">Progress</span>
                <strong>{progress}%</strong>
              </div>
              <div className="stat-card">
                <span className="stat-label">Completed</span>
                <strong>{completedSteps.length}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="card section-card">
          <div className="section-head">
            <div>
              <p className="section-kicker">Main section</p>
              <h2>Roadmapa</h2>
            </div>
            <div className="progress-meta">{progress}% complete</div>
          </div>

          <div className="progress-wrap">
            <div className="progress-bar">
              <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="steps-grid">
            {ROADMAP_STEPS.map((step, index) => {
              const checked = completedSteps.includes(step.id)

              return (
                <article
                  key={step.id}
                  className={`step-card ${checked ? 'step-card--done' : ''}`}
                >
                  <div className="step-card__head">
                    <div className="step-number">0{index + 1}</div>
                    <span className="step-tag">{step.tag}</span>
                  </div>

                  <div className="step-main">
                    <label className="check-row">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleStep(step.id)}
                      />
                      <span className="custom-check" />
                      <span className="check-copy">
                        <strong>{step.title}</strong>
                        <small>{step.subtitle}</small>
                      </span>
                    </label>

                    <p className="step-description">{step.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="content-grid">
          <div className="card section-card">
            <div className="section-head">
              <div>
                <p className="section-kicker">Useful links</p>
                <h2>Tools</h2>
              </div>
            </div>

            <div className="tools-list">
              {TOOLS.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noreferrer"
                  className="tool-card"
                >
                  <div className="tool-card__head">
                    <strong>{tool.name}</strong>
                    <span>{tool.badge}</span>
                  </div>
                  <p>{tool.description}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="card section-card">
            <div className="section-head">
              <div>
                <p className="section-kicker">Glossary</p>
                <h2>Terms</h2>
              </div>
            </div>

            <div className="terms-list">
              {TERMS.map((term) => (
                <div key={term.name} className="term-card">
                  <strong>{term.name}</strong>
                  <p>{term.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
