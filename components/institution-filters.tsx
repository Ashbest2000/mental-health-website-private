"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export function InstitutionFilters({ areas, types }: { areas: string[]; types: string[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentType = searchParams.get("type") || "all"
  const currentArea = searchParams.get("area") || "all"
  const currentEmergency = searchParams.get("emergency") === "true"

  const updateFilters = (key: string, value: string | boolean) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value === "" || value === false) {
      params.delete(key)
    } else {
      params.set(key, value.toString())
    }

    router.push(`/institutions?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/institutions")
  }

  const hasFilters = currentType !== "all" || currentArea !== "all" || currentEmergency

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={currentType} onValueChange={(value) => updateFilters("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type} value={type} className="capitalize">
                    {type.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Area</Label>
            <Select value={currentArea} onValueChange={(value) => updateFilters("area", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All areas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All areas</SelectItem>
                {areas.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="emergency"
                checked={currentEmergency}
                onCheckedChange={(checked) => updateFilters("emergency", checked as boolean)}
              />
              <Label htmlFor="emergency" className="cursor-pointer">
                Emergency Available
              </Label>
            </div>
          </div>

          {hasFilters && (
            <div className="flex items-end">
              <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
