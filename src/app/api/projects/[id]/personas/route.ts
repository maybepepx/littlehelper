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

      // Create personas
      await createPersonas(id, aiResponse.personas)

      // Create interviews
      await createInterviews(id, aiResponse.interviews)

      // Create report
      await createReport(id, aiResponse.report)

      // Update status to complete
      await updateProjectStatus(id, 'COMPLETE')

      return NextResponse.json({
        success: true,
        personas: aiResponse.personas,
        interviews: aiResponse.interviews,
        report: aiResponse.report,
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
