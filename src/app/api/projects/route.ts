import { NextRequest, NextResponse } from 'next/server'
import { ProjectInput } from '@/lib/schemas'
import { createProject, getProjects } from '@/server/services/projects'

export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedInput = ProjectInput.parse(body)
    
    const project = await createProject(validatedInput)
    return NextResponse.json(project)
  } catch (error) {
    console.error('Error creating project:', error)
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
