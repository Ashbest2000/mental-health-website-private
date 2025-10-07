"use client"

import { Button } from "@/components/ui/button"
import { markAlertResolved } from "@/app/actions/admin"
import { useState } from "react"

export function MarkAlertResolvedButton({ alertId }: { alertId: string }) {
  const [loading, setLoading] = useState(false)

  const handleResolve = async () => {
    setLoading(true)
    await markAlertResolved(alertId)
    setLoading(false)
    window.location.reload()
  }

  return (
    <Button onClick={handleResolve} disabled={loading}>
      {loading ? "Marking as Resolved..." : "Mark as Resolved"}
    </Button>
  )
}
