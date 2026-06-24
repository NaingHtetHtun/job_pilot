"use client"

import { useState } from "react"

type Props = {
  isConnected?: boolean
}

export function ConnectedAccounts({ isConnected = false }: Props) {
  const [connected, setConnected] = useState(isConnected)
  const [isLoading, setIsLoading] = useState(false)

  function handleConnect() {
    setIsLoading(true)
    window.open("https://linkedin.com", "_blank")
    setTimeout(() => {
      setConnected(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <h2 className="text-base font-semibold text-text-primary">Connected Accounts</h2>
      <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-linkedin-light">
            <svg className="size-5 text-linkedin" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">LinkedIn</p>
            {connected && (
              <p className="text-xs text-text-muted">Connected</p>
            )}
          </div>
        </div>
        {connected ? (
          <button
            type="button"
            onClick={() => setConnected(false)}
            className="text-xs text-text-muted underline underline-offset-2 hover:text-text-secondary"
          >
            Disconnect
          </button>
        ) : (
          <button
            type="button"
            onClick={handleConnect}
            disabled={isLoading}
            className="rounded-lg bg-linkedin px-4 py-2 text-sm font-medium text-linkedin-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {isLoading ? "Connecting..." : "Connect"}
          </button>
        )}
      </div>
    </div>
  )
}
