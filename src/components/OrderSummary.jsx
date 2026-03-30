import React, { useMemo } from 'react'
import { formatINR } from '../utils/currency'

export default function OrderSummary({ cart = [], taxRate = 0.1, onProceed }) {
    const subtotal = useMemo(() => cart.reduce((s, p) => s + (p.price * (p.qty || p.quantity || 1)), 0), [cart])
    const tax = useMemo(() => subtotal * taxRate, [subtotal, taxRate])
    const total = useMemo(() => subtotal + tax, [subtotal, tax])

    return (
        <div className="bg-[var(--card-bg)] rounded-xl shadow-md p-6 border border-[var(--borders)]">
            <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Order summary</h3>
            <div className="space-y-3 text-[var(--text-secondary)]">
                <div className="flex items-center justify-between text-sm"> <div>Subtotal</div> <div>{formatINR(subtotal)}</div> </div>
                <div className="flex items-center justify-between text-sm"> <div>Tax ({Math.round(taxRate * 100)}%)</div> <div>{formatINR(tax)}</div> </div>
                <div className="border-t pt-3 mt-3 flex items-center justify-between text-lg font-semibold"> <div>Total</div> <div>{formatINR(total)}</div> </div>
            </div>

            <button onClick={onProceed} className="mt-6 w-full px-4 py-3 btn-primary rounded">Proceed to Payment</button>
        </div>
    )
}
