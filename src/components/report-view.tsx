'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react'

interface ReportData {
  validated: string
  overview: string
  keyFindings: {
    frictionPoints: string[]
    highlights: string[]
  }
}

interface ReportViewProps {
  report: ReportData
  projectId: string
  projectTitle: string
  onExportPDF: () => void
}

export function ReportView({ report, projectId, projectTitle, onExportPDF }: ReportViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Research Report</h2>
        <Button onClick={onExportPDF} className="gap-2">
          <FileText className="h-4 w-4" />
          Export PDF
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            What Was Validated
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {report.validated}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {report.overview}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Friction Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {report.keyFindings.frictionPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Badge variant="destructive" className="shrink-0 mt-0.5">
                    {index + 1}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Key Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {report.keyFindings.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Badge variant="default" className="shrink-0 mt-0.5">
                    {index + 1}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{highlight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
