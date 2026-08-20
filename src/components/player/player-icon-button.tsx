import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface PlayerIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  active?: boolean
  children: ReactNode
}

export function PlayerIconButton({
  label,
  active = false,
  children,
  className = '',
  ...props
}: PlayerIconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`grid size-9 place-items-center rounded-full transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35 ${
        active ? 'text-emerald-400' : 'text-zinc-300 hover:text-white'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
