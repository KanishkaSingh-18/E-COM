import React from 'react'

export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-[var(--card-bg)] rounded-xl p-8 card-shadow border border-[var(--borders)]">
      <div className="h-56 bg-[var(--bg-secondary)] rounded-md mb-4"></div>
      <div className="h-4 bg-[var(--bg-secondary)] rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-[var(--bg-secondary)] rounded w-1/2"></div>
    </div>
  )
}
