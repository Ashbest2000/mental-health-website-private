"use client"

import { Button } from "@/components/ui/button"
import { approveVolunteer } from "@/app/actions/admin"
import { useState } from "react"

export function ApproveVolunteerButton({ volunteerId }: { volunteerId: string }) {
  const [loading, setLoading] = useState(false)

  const handleApprove = async () => {
    setLoading(true)
    await approveVolunteer(volunteerId)
    setLoading(false)
    window.location.reload()
  }

  return (
    <Button size="sm" onClick={handleApprove} disabled={loading}>
      {loading ? "Approving..." : "Approve"}
    </Button>
  )
}
