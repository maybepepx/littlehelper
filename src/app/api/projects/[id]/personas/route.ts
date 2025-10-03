import { NextRequest, NextResponse } from 'next/server'
import { generateCompleteResearch } from '@/server/ai/run'
import { createPersonas } from '@/server/services/personas'
import { createInterviews } from '@/server/services/interviews'
import { createReport } from '@/server/services/reports'
import { getProject, updateProjectStatus } from '@/server/services/projects'
import { ProjectInput } from '@/lib/schemas'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get project data
    const { id } = await params
    const project = await getProject(id)
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Update status to running
    await updateProjectStatus(id, 'RUNNING')

    try {
      // Prepare input for AI
      const input: ProjectInput = {
        title: project.title,
        productType: project.productType,
        researchGoal: project.researchGoal,
        targetAudience: project.targetAudience,
        personasCount: project.personasCount,
      }

      // Generate complete research
      const aiResponse = await generateCompleteResearch(input)

      // Create personas first
      const personasResult = await createPersonas(id, aiResponse.personas)
      
      // Map persona IDs from AI response to actual persona IDs
      const personaIdMap = new Map()
      if (personasResult && typeof personasResult === 'object' && 'mockPersonas' in personasResult) {
        // If using mock data, use the returned mock personas
        const mockPersonas = personasResult.mockPersonas || []
        mockPersonas.forEach((persona: any, index: number) => {
          personaIdMap.set(index, persona.id)
        })
      } else {
        // If using database, fetch created personas
        const createdPersonas = await personasResult?.creates || []
        createdPersonas.forEach((persona: any, index: number) => {
          personaIdMap.set(index, persona.id)
        })
      }
      
      // Map interviews with correct persona IDs
      const mappedInterviews = aiResponse.interviews.map((interview, index) => ({
        ...interview,
        personaId: personaIdMap.get(index) || interview.personaId,
        id: `mock_interview_${id}_${index}`
      }))

      // Create interviews
      await createInterviews(id, mappedInterviews)

      // Create report
      await createReport(id, aiResponse.report)

      // Update status to complete
      await updateProjectStatus(id, 'COMPLETE')

      // Return properly formatted data for frontend
      const responsePersonas = aiResponse.personas.map((persona, index) => ({
        id: personaIdMap.get(index) || `mock_persona_${id}_${index}`,
        ...persona,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }))

      const responseInterviews = aiResponse.interviews.map((interview, index) => ({
        id: `mock_interview_${id}_${index}`,
        personaId: personaIdMap.get(index) || interview.personaId,
        transcript: interview.transcript,
        questionCount: interview.transcript.length,
        persona: { name: aiResponse.personas[index]?.name || 'Unknown Persona' },
        createdAt: new Date().toISOString()
      }))

      const responseReport = {
        id: `mock_report_${id}`,
        ...aiResponse.report,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      return NextResponse.json({
        success: true,
        personas: responsePersonas,
        interviews: responseInterviews,
        report: responseReport,
      })
    } catch (error) {
      // Update status back to draft on error
      await updateProjectStatus(id, 'DRAFT')
      throw error
    }
  } catch (error) {
    console.error('Error generating personas:', error)
    return NextResponse.json(
      { error: 'Failed to generate research data' },
      { status: 500 }
    )
  }
}
