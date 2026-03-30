import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

export default function BackButton({ to = '/products', label = 'Back to Products' }) {
  const navigate = useNavigate()
  return (
    <div className="mb-4 flex items-center gap-3">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-[var(--text-secondary)] hover:underline">
        <FiArrowLeft /> <span>Back</span>
      </button>
      <Link to={to} className="ml-3 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[var(--card-bg)] text-[var(--text-primary)] shadow-sm border border-[var(--borders)]">{label}</Link>
    </div>
  )
}
