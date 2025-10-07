import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Globe, Clock, AlertCircle } from "lucide-react"
import { InstitutionFilters } from "@/components/institution-filters"

export default async function InstitutionsPage({
  searchParams,
}: {
  searchParams: { type?: string; area?: string; emergency?: string }
}) {
  const supabase = await createClient()

  let query = supabase.from("institutions").select("*").order("name", { ascending: true })

  // Apply filters
  if (searchParams.type) {
    query = query.eq("type", searchParams.type)
  }
  if (searchParams.area) {
    query = query.eq("area", searchParams.area)
  }
  if (searchParams.emergency === "true") {
    query = query.eq("emergency_available", true)
  }

  const { data: institutions } = await query

  // Get unique areas for filter
  const { data: allInstitutions } = await supabase.from("institutions").select("area, type")
  const areas = [...new Set(allInstitutions?.map((i) => i.area).filter(Boolean))]
  const types = [...new Set(allInstitutions?.map((i) => i.type))]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hospital":
        return "🏥"
      case "clinic":
        return "🏨"
      case "counseling_center":
        return "💬"
      case "hotline":
        return "📞"
      default:
        return "🏢"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={false} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Mental Health Institutions in Dhaka</h1>
            <p className="text-lg text-muted-foreground">
              Find professional mental health support near you in Dhaka, Bangladesh
            </p>
          </div>

          {/* Emergency Banner */}
          <Card className="mb-6 bg-accent/10 border-accent/20">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-2">In Crisis? Get Immediate Help</p>
                  <div className="text-sm space-y-1">
                    <p>Emergency Services: 999</p>
                    <p>Kaan Pete Roi Crisis Hotline: +880-2-5853305 (24/7)</p>
                    <p>Moner Bondhu: +880-1779-554391</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <InstitutionFilters areas={areas} types={types} />

          {/* Institutions List */}
          {institutions && institutions.length > 0 ? (
            <div className="space-y-4">
              {institutions.map((institution) => (
                <Card key={institution.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{getTypeIcon(institution.type)}</span>
                          <CardTitle className="text-xl">{institution.name}</CardTitle>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="secondary" className="capitalize">
                            {institution.type.replace("_", " ")}
                          </Badge>
                          {institution.emergency_available && <Badge variant="destructive">Emergency Available</Badge>}
                          {institution.area && <Badge variant="outline">{institution.area}</Badge>}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {institution.address && (
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span>{institution.address}</span>
                      </div>
                    )}

                    {institution.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a href={`tel:${institution.phone}`} className="hover:underline">
                          {institution.phone}
                        </a>
                      </div>
                    )}

                    {institution.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${institution.email}`} className="hover:underline">
                          {institution.email}
                        </a>
                      </div>
                    )}

                    {institution.website && (
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={institution.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}

                    {institution.operating_hours && (
                      <div className="flex items-start gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span>{institution.operating_hours}</span>
                      </div>
                    )}

                    {institution.services && institution.services.length > 0 && (
                      <div className="pt-2">
                        <p className="text-sm font-medium mb-2">Services:</p>
                        <div className="flex flex-wrap gap-2">
                          {institution.services.map((service: string) => (
                            <Badge key={service} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Institutions Found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your filters to see more results</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
