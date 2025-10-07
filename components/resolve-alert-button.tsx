"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { resolveAlert } from "@/app/actions/volunteer"

export function ResolveAlertButton({ alertId }: { alertId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleResolve = async () => {
    setLoading(true)
    try {
      await resolveAlert(alertId)
      router.push("/volunteer/dashboard")
      router.refresh()
    } catch (error) {
      console.error("Error resolving alert:", error)
      setLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" disabled={loading} className="flex-1 bg-transparent">
          Mark as Resolved
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mark Alert as Resolved?</AlertDialogTitle>
          <AlertDialogDescription>
            Confirm that you have provided support and the person is safe or connected with appropriate professional
            help.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleResolve}>Mark as Resolved</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
