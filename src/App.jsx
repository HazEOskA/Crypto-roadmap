import { useEffect, useState } from 'react'

const ROADMAP_STEPS = [
  {
    id: 1,
    title: 'Setup wallet',
    subtitle: 'Phantom / MetaMask',
    description: 'Skonfiguruj podstawowy portfel do korzystania z aplikacji DeFi.',
  },
  {
    id: 2,
    title: 'First swap basics',
    subtitle: 'Jak działa swap',
    description: 'Poznaj zamianę jednego tokena na drugi i podstawy slippage.',
  },
  {
    id: 3,
    title: 'Lending basics',
    subtitle: 'Pożyczki i depozyty',
    description: 'Zobacz jak działa lending, collateral i oprocentowanie.',
  },
  {
    id: 4,
    title: 'Airdrop farming intro',
    subtitle: 'Aktywność on-chain',
    description: 'Dowiedz się, czym są airdropy i jak użytkownicy kwalifikują się do nich.',
  },
  {
    id: 5,
    title: 'Security basics',
    subtitle: 'Scamy i approvals',
    description: 'Zrozum approvals, phishing i podstawy bezpieczeństwa w DeFi.',
  },
]

const TOOLS = [
  {
    name: 'Jupiter',
    url: 'https://jup.ag',
    description: 'Solana DEX aggregator',
  },
  {
    name: 'Uniswap',
    url: 'https://app.uniswap.org',
    description: 'Ethereum DEX',
  },
  {
    name: 'Aave',
    url: 'https://app.aave.com',
    description: 'Lending protocol',
  },
]

const TERMS = [
  {
    name: 'Swap',
    description: 'Wymiana jednego tokena na drugi bezpośrednio w protokole.',
  },
  {
    name: 'LP (liquidity pool)',
    description: 'Pula płynności dostarczana przez użytkowników dla handlu na DEX.',
  },
  {
    name: 'Yield',
    description: 'Zwrot lub zysk generowany przez aktywa w DeFi.',
  },
  {
    name: 'Airdrop',
    description: 'Darmowa dystrybucja tokenów dla użytkowników spełniających warunki.',
  },
]

const STORAGE_KEY = 'crypto-roadmap-progress'

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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedSteps))
  }, [completedSteps])

  const toggleStep = (id) => {
    setCompletedSteps((prev) =>
      prev.includes(id) ? prev.filter((stepId) => stepId !== id) : [...prev, id]
    )
  }

  const progress = Math.round((completedSteps.length / ROADMAP_STEPS.length) * 100)

  return (
    <div className="app-shell" style={{ padding: '24px' }}>
      <div
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          display: 'grid',
          gap: '24px',
        }}
      >
        <header
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '24px',
          }}
        >
          <p
            style={{
              color: 'var(--accent)',
              fontSize: 'var(--text-sm)',
              marginBottom: '8px',
            }}
          >
            Crypto Roadmap Tool
          </p>
          <h1
            style={{
              fontSize: 'var(--text-xl)',
              marginBottom: '12px',
            }}
          >
            Minimalistyczny roadmap starter dla początkującego DeFi usera
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Prosty tracker progresu z localStorage, listą narzędzi i podstawowymi terminami.
          </p>
        </header>

        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              alignItems: 'center',
              marginBottom: '16px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h2 style={{ fontSize: 'var(--text-lg)' }}>Roadmapa</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                Odznaczaj kolejne etapy nauki.
              </p>
            </div>
            <div
              style={{
                color: 'var(--accent)',
                fontWeight: 700,
                fontSize: 'var(--text-sm)',
              }}
            >
              {progress}%
            </div>
          </div>

          <div
            style={{
              width: '100%',
              height: '10px',
              background: 'var(--surface-3)',
              borderRadius: '999px',
              overflow: 'hidden',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--accent-dim), var(--accent))',
                transition: 'width var(--transition)',
              }}
            />
          </div>

          <div style={{ display: 'grid', gap: '12px' }}>
            {ROADMAP_STEPS.map((step) => {
              const checked = completedSteps.includes(step.id)

              return (
                <label
                  key={step.id}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'flex-start',
                    padding: '16px',
                    borderRadius: '16px',
                    border: '1px solid var(--border)',
                    background: checked ? 'var(--accent-bg)' : 'var(--surface-2)',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleStep(step.id)}
                    style={{
                      marginTop: '4px',
                      width: '18px',
                      height: '18px',
                      accentColor: '#00d4a8',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        gap: '8px',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        marginBottom: '4px',
                      }}
                    >
                      <strong
                        style={{
                          fontSize: 'var(--text-base)',
                          textDecoration: checked ? 'line-through' : 'none',
                        }}
                      >
                        {step.title}
                      </strong>
                      <span
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {step.subtitle}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </label>
              )
            })}
          </div>
        </section>

        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '24px',
          }}
        >
          <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: '16px' }}>Tools</h2>

          <div style={{ display: 'grid', gap: '12px' }}>
            {TOOLS.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'block',
                  padding: '16px',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  background: 'var(--surface-2)',
                }}
              >
                <strong style={{ display: 'block', marginBottom: '4px' }}>{tool.name}</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                  {tool.description}
                </span>
              </a>
            ))}
          </div>
        </section>

        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '24px',
          }}
        >
          <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: '16px' }}>Terms</h2>

          <div style={{ display: 'grid', gap: '12px' }}>
            {TERMS.map((term) => (
              <div
                key={term.name}
                style={{
                  padding: '16px',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  background: 'var(--surface-2)',
                }}
              >
                <strong style={{ display: 'block', marginBottom: '6px', color: 'var(--accent)' }}>
                  {term.name}
                </strong>
                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                  {term.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
