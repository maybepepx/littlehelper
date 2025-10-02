'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Zap, 
  MessageSquare, 
  FileText, 
  Download, 
  Trash2,
  RefreshCw
} from 'lucide-react'

interface TopbarActionsProps {
  projectId?: string
  status?: 'DRAFT' | 'RUNNING' | 'COMPLETE'
  onGeneratePersonas?: () => void
  onRunInterviews?: () => void
  onGenerateReport?: () => void
  onExportPDF?: () => void
  onDeleteProject?: () => void
  isLoading?: boolean
}

export function TopbarActions({ 
  projectId,
  status = 'DRAFT',
  onGeneratePersonas,
  onRunInterviews,
  onGenerateReport,
  onExportPDF,
  onDeleteProject,
  isLoading = false 
}: TopbarActionsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT': return 'bg-slate-500'
      case 'RUNNING': return 'bg-blue-500'
      case 'COMPLETE': return 'bg-green-500'
      default: return 'bg-slate-500'
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 p-4 border-b bg-background">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold">Research Dashboard</h1>
        {projectId && (
          <Badge className={`${getStatusColor(status)} text-white`}>
            {status}
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-2">
        {projectId && (
          <>
            <Button 
              onClick={onGeneratePersonas}
              disabled={status !== 'DRAFT' || isLoading}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Zap className="h-4 w-4" />
              Generate
            </Button>

            <Button 
              onClick={onRunInterviews}
              disabled={status !== 'COMPLETE' || isLoading}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Interviews
            </Button>

            <Button 
              onClick={onGenerateReport}
              disabled={status !== 'COMPLETE' || isLoading}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              Report
            </Button>

            <Button 
              onClick={onExportPDF}
              disabled={status !== 'COMPLETE' || isLoading}
              variant="default"
              size="sm"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              PDF
            </Button>

            <Button 
              onClick={onDeleteProject}
              disabled={isLoading}
              variant="destructive"
              size="sm"
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
