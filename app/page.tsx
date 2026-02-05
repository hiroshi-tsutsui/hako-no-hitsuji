import BattleArena from './components/BattleArena';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-200 dark:bg-slate-950 p-4">
      <h1 className="text-5xl font-black text-slate-800 dark:text-slate-100 mb-2 tracking-tighter italic uppercase transform -skew-x-6">
        Kanji Combat
      </h1>
      <p className="text-slate-500 mb-8 font-mono text-sm">Type fast. Strike hard. No mercy.</p>
      <BattleArena />
      <p className="mt-12 text-slate-400 text-xs">Educational Fleet: App 2/11</p>
    </div>
  )
}
