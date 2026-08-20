import { Sidebar } from './components/layout/sidebar'
import { AudioEngine } from './components/player/audio-engine'
import { PlayerBar } from './components/player/player-bar'
import { SongGrid } from './features/library/components/song-grid'
import { mockSongs } from './services'

function App() {
  return (
    <>
      <AudioEngine />
      <Sidebar />
      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#17372d_0,_#18181b_32rem)] px-5 pb-40 pt-8 text-white md:ml-60 md:px-10">
        <div className="mx-auto max-w-6xl">
          <header className="mb-10">
            <p className="text-sm font-medium text-emerald-400">Made for you</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Good afternoon</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
              Fresh sounds for focus, late nights, and everything in between.
            </p>
          </header>
          <section>
            <div className="mb-5 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Trending now</h2>
                <p className="mt-1 text-sm text-zinc-400">The tracks everyone has on repeat.</p>
              </div>
              <button type="button" className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white">
                Show all
              </button>
            </div>
            <SongGrid songs={mockSongs} />
          </section>
        </div>
      </main>
      <PlayerBar />
    </>
  )
}

export default App
