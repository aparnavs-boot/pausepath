import './App.css'
import BreakReminder from './components/BreakReminder'
import MoodMusic from './components/MoodMusic'
import TalkSpace from './components/TalkSpace'
import BackgroundEffects from './components/effects/BackgroundEffects'
import RelaxRecharge from './components/RelaxRecharge/RelaxRecharge'
import SoulStories from './components/SoulStories/SoulStories'
import QuotePopup from './components/Interactions/QuotePopup'
import DailyAffirmation from './components/Interactions/DailyAffirmation'
import { useAppContext } from './context/AppContext'
import { Moon, Sun } from 'lucide-react'

function App() {
  const { theme, toggleTheme } = useAppContext();

  return (
    <div className="app-container">
      <BackgroundEffects theme={theme} />
      <QuotePopup />

      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 flex items-center justify-center cursor-pointer w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-transform z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? (
          <Sun className="text-yellow-400 fill-yellow-400" size={24} strokeWidth={2} />
        ) : (
          <Moon className="text-indigo-600 fill-indigo-100" size={24} strokeWidth={2} />
        )}
      </button>

      <header className="app-header">
        <h1>PausePath 🍃</h1>
        <p className="mb-6">Your mindful break companion.</p>
        <DailyAffirmation />
      </header>

      <main className="dashboard">
        <section className="dashboard-section relax-section glass-panel col-span-full xl:col-span-2">
          <RelaxRecharge />
        </section>

        <section className="dashboard-section story-section glass-panel col-span-full">
          <SoulStories />
        </section>

        <section className="dashboard-section break-section glass-panel">
          <BreakReminder />
        </section>

        <section className="dashboard-section music-section glass-panel">
          <MoodMusic />
        </section>

        <section className="dashboard-section talk-section glass-panel">
          <TalkSpace />
        </section>
      </main>

      <footer className="app-footer">
        <p>Take a deep breath. You're doing great.</p>
      </footer>
    </div>
  )
}

export default App
