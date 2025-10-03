'use client'

import { useState, useEffect } from 'react'
import { ProjectForm } from '@/components/project-form'
import { Sidebar } from '@/components/sidebar'
import { TopbarActions } from '@/components/topbar-actions'
import { PersonasTable } from '@/components/personas-table'
import { PersonaDrawer } from '@/components/persona-drawer'
import { InterviewAccordion } from '@/components/interview-accordion'
import { ReportView } from '@/components/report-view'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ProjectInput } from '@/lib/schemas'

interface Project {
  id: string
  title: string
  productType: string
  researchGoal: string
  targetAudience: string
  personasCount: number
  status: 'DRAFT' | 'RUNNING' | 'COMPLETE'
  createdAt: string
  personas: Array<{
    id: string
    name: string
    age: number
    occupation: string
    personality: string
    painPoints: string
    hobbies: string
    goals: string
  }>
  interviews: Array<{
    id: string
    personaId: string
    transcript: Array<{ question: string; answer: string }>
    questionCount: number
    persona: { name: string }
  }>
  report?: {
    id: string
    validated: string
    overview: string
    keyFindings: {
      frictionPoints: string[]
      highlights: string[]
    }
  }
}

export default function HomePage() {
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedPersona, setSelectedPersona] = useState<any>(null)
  const [showPersonaDrawer, setShowPersonaDrawer] = useState(false)

  useEffect(() => {
    console.log('HomePage mounted successfully')
  }, [])

  // Error boundary check
  const [hasError, setHasError] = useState(false)
  
  if (hasError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h1>
          <button 
            onClick={() => setHasError(false)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  const handleProjectSubmit = async (data: ProjectInput) => {
    setIsCreating(true)
    try {
      // First create the project
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      if (!response.ok) throw new Error('Failed to create project')
      
      const project = await response.json()
      setCurrentProject(project)
      
      // Then immediately start generating research
      await handleGeneratePersonas()
      
    } catch (error) {
      console.error('Error creating project:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleGeneratePersonas = async () => {
    if (!currentProject) return

    try {
      const response = await fetch(`/api/projects/${currentProject.id}/personas`, {
        method: 'POST'
      })
      
      if (!response.ok) throw new Error('Failed to generate personas')
      
      const data = await response.json()
      
      // Update the current project with new data
      const updatedProject: Project = {
        ...currentProject,
        status: 'COMPLETE',
        personas: data.personas,
        interviews: data.interviews,
        report: data.report
      }
      
      setCurrentProject(updatedProject)
    } catch (error) {
      console.error('Error generating personas:', error)
    }
  }

  const handleExportPDF = async () => {
    if (!currentProject?.report) return

    try {
      const response = await fetch(`/api/projects/${currentProject.id}/report.pdf`)
      const blob = await response.blob()
      
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${currentProject.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_report.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error exporting PDF:', error)
    }
  }

  const handleDeleteProject = async () => {
    if (!currentProject) return

    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`/api/projects/${currentProject.id}?type=soft`, {
          method: 'DELETE'
        })
        
        if (!response.ok) throw new Error('Failed to delete project')
        
        setCurrentProject(null)
        setSelectedPersona(null)
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    }
  }

  try {
    return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-64 flex flex-col">
        <TopbarActions
          projectId={currentProject?.id}
          status={currentProject?.status}
          onGeneratePersonas={handleGeneratePersonas}
          onExportPDF={handleExportPDF}
          onDeleteProject={handleDeleteProject}
          isLoading={isCreating}
        />
        
        <main className="flex-1 p-6">
          {!currentProject ? (
            <div className="max-w-2xl mx-auto">
              <ProjectForm onSubmit={handleProjectSubmit} isLoading={isCreating} />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Project Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>{currentProject.title}</CardTitle>
                  <CardDescription className="space-y-2">
                    <div><strong>Product Type:</strong> {currentProject.productType}</div>
                    <div><strong>Research Goal:</strong> {currentProject.researchGoal}</div>
                    <div><strong>Target Audience:</strong> {currentProject.targetAudience}</div>
                    <div><strong>Personas Count:</strong> {currentProject.personasCount}</div>
                    <Separator />
                    <div className="flex items-center gap-2">
                      <span>Status:</span>
                      <Badge variant="secondary">{currentProject.status}</Badge>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Show results if complete */}
              {currentProject.status === 'COMPLETE' && (
                <>
                  {currentProject.personas && currentProject.personas.length > 0 && (
                    <PersonasTable
                      personas={currentProject.personas}
                      onSelectPersona={setSelectedPersona}
                    />
                  )}

                  {currentProject.interviews && currentProject.interviews.length > 0 && (
                    <InterviewAccordion interviews={currentProject.interviews} />
                  )}

                  {currentProject.report && (
                    <ReportView
                      report={currentProject.report}
                      projectId={currentProject.id}
                      projectTitle={currentProject.title}
                      onExportPDF={handleExportPDF}
                    />
                  )}
                </>
              )}

              {/* Show button to generate if draft */}
              {currentProject.status === 'DRAFT' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Ready to Generate Research Data</CardTitle>
                    <CardDescription>
                      Click "Generate" in the top bar to create personas, conduct interviews, and generate reports using AI.
                    </CardDescription>
                  </CardHeader>
                </Card>
              )}
            </div>
          )}
        </main>
      </div>

      <PersonaDrawer
        persona={selectedPersona}
        isOpen={showPersonaDrawer}
        onClose={() => {
          setShowPersonaDrawer(false)
          setSelectedPersona(null)
        }}
      />
    </div>
    )
  } catch (error) {
    console.error('Component render error:', error)
    setHasError(true)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Component Error</h1>
          <p className="text-gray-600 mb-4">Something went wrong while rendering</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }
}
