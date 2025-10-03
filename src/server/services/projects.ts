import { db } from '@/lib/db'
import { ProjectInput } from '@/lib/schemas'

// Temporary mock implementation for demo purposes
const mockProjects = new Map()

export async function createProject(input: ProjectInput) {
  // Check if we have database connection
  try {
    const result = await db.project.create({
      data: {
        title: input.title,
        productType: input.productType,
        researchGoal: input.researchGoal,
        targetAudience: input.targetAudience,
        personasCount: input.personasCount,
      }
    })
    return result
  } catch (error) {
    console.log('Database not available, using mock data:', error.message)
    
    // Mock implementation
    const mockProject = {
      id: `mock_${Date.now()}`,
      status: 'DRAFT',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      personas: [],
      interviews: [],
      report: null,
      ...input
    }
    
    mockProjects.set(mockProject.id, mockProject)
    return mockProject
  }
}

export async function getProjects() {
  try {
    return await db.project.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: {
        personas: true,
        interviews: true,
        report: true,
      }
    })
  } catch (error) {
    console.log('Database not available, using mock data:', error.message)
    return Array.from(mockProjects.values()).filter(p => !p.deletedAt)
  }
}

export async function getProject(id: string) {
  try {
    return await db.project.findUnique({
      where: { id },
      include: {
        personas: true,
        interviews: true,
        report: true,
      }
    })
  } catch (error) {
    console.log('Database not available, using mock data:', error.message)
    return mockProjects.get(id) || null
  }
}

export async function updateProjectStatus(id: string, status: 'DRAFT' | 'RUNNING' | 'COMPLETE') {
  try {
    return await db.project.update({
      where: { id },
      data: { status }
    })
  } catch (error) {
    console.log('Database not available, using mock data:', error.message)
    const project = mockProjects.get(id)
    if (project) {
      project.status = status
      project.updatedAt = new Date()
      mockProjects.set(id, project)
      return project
    }
    return null
  }
}

export async function softDeleteProject(id: string) {
  try {
    return await db.project.update({
      where: { id },
      data: { deletedAt: new Date() }
    })
  } catch (error) {
    console.log('Database not available, using mock data:', error.message)
    const project = mockProjects.get(id)
    if (project) {
      project.deletedAt = new Date()
      mockProjects.set(id, project)
      return project
    }
    return null
  }
}

export async function hardDeleteProject(id: string) {
  try {
    return await db.project.delete({
      where: { id }
    })
  } catch (error) {
    console.log('Database not available, using mock data:', error.message)
    mockProjects.delete(id)
    return { id }
  }
}
