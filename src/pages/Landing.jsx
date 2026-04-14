import { useNavigate } from 'react-router-dom'
import styles from './Landing.module.css'

export default function Landing() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/dashboard')
  }

  const features = [
    {
      icon: '⚡',
      title: 'Smart Breakdown',
      desc: 'AI-powered task decomposition',
    },
    {
      icon: '🎯',
      title: 'Focus Mode',
      desc: 'Pomodoro timer + distraction-free',
    },
    {
      icon: '📊',
      title: 'Analytics',
      desc: 'Understand your productivity',
    },
    {
      icon: '🔥',
      title: 'Habit Streaks',
      desc: 'Build consistency & momentum',
    },
    {
      icon: '📋',
      title: 'Sub-tasks',
      desc: 'Break complex work down',
    },
    {
      icon: '⚠️',
      title: 'Smart Warnings',
      desc: 'Never miss deadlines again',
    },
  ]

  return (
    <div className={styles.landing}>
      {/* Animated Background Shapes */}
      <div className={styles.background}>
        <div className={styles.shape1} aria-hidden="true" />
        <div className={styles.shape2} aria-hidden="true" />
        <div className={styles.shape3} aria-hidden="true" />
        <div className={styles.shape4} aria-hidden="true" />
        <div className={styles.shape5} aria-hidden="true" />
        <div className={styles.gridBg} aria-hidden="true" />
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Header Badge */}
        <div className={styles.badge}>
          <span className={styles.badgeText}>✨ New: AI Task Breakdown</span>
        </div>

        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Manage Your Work.
            <br />
            <span className={styles.highlight}>No Overwhelm</span>
          </h1>

          <p className={styles.subtitle}>
            The only todo app built for students who actually want to finish their work.
            Smart breakdowns. Focus mode. Habit tracking. All in one place.
          </p>

          <div className={styles.ctaButtons}>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={handleGetStarted}
            >
              Get Started Free <span className={styles.arrow}>→</span>
            </button>
            <a href="#features" className={`${styles.btn} ${styles.btnSecondary}`}>
              <span className={styles.playIcon}>▶</span> See Features
            </a>
          </div>

          {/* Trust Badges */}
          <div className={styles.trustBadges}>
            <span className={styles.trustBadge}>✓ 100% Offline</span>
            <span className={styles.trustBadge}>✓ No Ads</span>
            <span className={styles.trustBadge}>✓ Data Stays Private</span>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.stats}>
          <div className={styles.statItem}>
            <div className={styles.statValue}>3x</div>
            <div className={styles.statLabel}>More Tasks Completed</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>47%</div>
            <div className={styles.statLabel}>Better Focus Sessions</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>90%</div>
            <div className={styles.statLabel}>Deadline Hit Rate</div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className={styles.features}>
          <h2 className={styles.sectionTitle}>Everything You Need</h2>
          <p className={styles.sectionSubtitle}>
            Built for students. Obsessed with completion.
          </p>

          <div className={styles.featureGrid}>
            {features.map((feature, idx) => (
              <div key={idx} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className={styles.howItWorks}>
          <h2 className={styles.sectionTitle}>How It Works</h2>

          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <h3>Add a Task Naturally</h3>
              <p>Type how you think: "Prepare for exam in 2 weeks"</p>
            </div>
            <div className={styles.stepNum}>→</div>

            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <h3>AI Breaks It Down</h3>
              <p>Get 8 concrete subtasks with deadlines</p>
            </div>
            <div className={styles.stepNum}>→</div>

            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <h3>Enter Focus Mode</h3>
              <p>One task, Pomodoro timer, zero distractions</p>
            </div>
            <div className={styles.stepNum}>→</div>

            <div className={styles.step}>
              <div className={styles.stepNum}>4</div>
              <h3>Build Your Streak</h3>
              <p>Track progress, unlock achievements, stay motivated</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2>Stop Planning. Start Finishing.</h2>
            <p>Join students who actually complete their work.</p>
            <button className={styles.ctaButton} onClick={handleGetStarted}>
              Get Started Free <span>→</span>
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>No credit card required. No ads. Your data stays on your device.</p>
      </footer>
    </div>
  )
}
