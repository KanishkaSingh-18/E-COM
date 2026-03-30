import React from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null
  return (
    <nav className="text-sm mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-[var(--text-secondary)]">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-center gap-2">
            {idx > 0 && <span className="text-[var(--text-muted)]">/</span>}
            {it.to ? (
              <Link to={it.to} className="hover:underline text-[var(--text-secondary)]">{it.label}</Link>
            ) : (
              <span className="text-[var(--text-primary)]">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
