"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { claimAlert } from "@/app/actions/volunteer"

export function ClaimAlertButton({ alertId }: { alertId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleClaim = async () => {
    setLoading(true)
    try {
      await claimAlert(alertId)
      router.refresh()
    } catch (error) {
      console.error("Error claiming alert:", error)
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleClaim} disabled={loading} className="flex-1">
      {loading ? "Claiming..." : "Claim This Alert"}
    </Button>
  )
}
