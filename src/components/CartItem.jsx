import React from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { formatINR } from '../utils/currency'

export default function CartItem({ item, onRemove, onUpdate }) {
    // item expected shape: { id, title, price, qty, image } or { productId, quantity, price }
    const id = item.id || item.productId
    const title = item.title || item.name || item.name
    const price = item.price
    const qty = item.qty || item.quantity || 1

    return (
        <div className="flex items-center justify-between bg-[var(--card-bg)] rounded-2xl p-4 shadow-sm border border-[var(--borders)]">
            <div className="flex items-center gap-4">
                <img src={item.image} alt={title} className="w-20 h-20 object-cover rounded-md" />
                <div>
                    <div className="font-semibold text-[var(--text-primary)]">{title}</div>
                    <div className="text-sm text-[var(--text-secondary)]">{formatINR(price)}</div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-md overflow-hidden border-[var(--borders)]">
                    <button onClick={() => onUpdate(id, Math.max(1, qty - 1))} className="px-3 py-2 text-[var(--text-secondary)]">−</button>
                    <div className="px-4 py-2 text-[var(--text-primary)]">{qty}</div>
                    <button onClick={() => onUpdate(id, qty + 1)} className="px-3 py-2 text-[var(--text-secondary)]">+</button>
                </div>

                <div className="text-right">
                    <div className="font-bold text-indigo-600">{formatINR(price * qty)}</div>
                    <button onClick={() => onRemove(id)} className="mt-2 text-sm text-[var(--text-secondary)] flex items-center gap-2"><FiTrash2 /> Remove</button>
                </div>
            </div>
        </div>
    )
}
