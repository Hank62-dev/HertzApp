import { Disc3, Home, Library, Search } from 'lucide-react'

const navigation = [
  { label: 'Home', icon: Home, active: true },
  { label: 'Search', icon: Search, active: false },
  { label: 'Your Library', icon: Library, active: false },
]

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-60 border-r border-white/5 bg-black p-5 md:block">
      <div className="flex items-center gap-3 px-2 text-xl font-bold tracking-tight text-white">
        <span className="grid size-9 place-items-center rounded-xl bg-emerald-400 text-zinc-950">
          <Disc3 size={22} />
        </span>
        Hertz
      </div>
      <nav className="mt-10 space-y-1">
        {navigation.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              active ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
