import { db } from '@/lib/db'

// Temporary mock storage for personas
const mockPersonas = new Map()

export async function createPersonas(projectId: string, personas: Array<{
  name: string
  age: number
  occupation: string
  hobbies: string
  personality: string
  goals: string
  painPoints: string
}>) {
  try {
    return await db.persona.createMany({
      data: personas.map(persona => ({
        projectId,
        ...persona
      }))
    })
  } catch (error) {
    console.log('Database not available, using mock data for personas:', error.message)
    
    // Mock implementation - store personas for this project
    const mappedPersonas = personas.map((persona, index) => ({
      id: `mock_persona_${projectId}_${index}`,
      projectId,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...persona
    }))
    
    mockPersonas.set(projectId, mappedPersonas)
    return { 
      count: mappedPersonas.length,
      mockPersonas: mappedPersonas // Return the personas for ID mapping
    }
  }
}

export async function getPersonas(projectId: string) {
  try {
    return await db.persona.findMany({
      where: { projectId },
      include: {
        interviews: true
      }
    })
  } catch (error) {
    console.log('Database not available, using mock data for personas:', error.message)
    return mockPersonas.get(projectId) || []
  }
}

export async function getPersona(id: string) {
  try {
    return await db.persona.findUnique({
      where: { id },
      exclude: {
        project: true,
        interviews: true
      }
    })
  } catch (error) {
    console.log('Database not available, using mock data for persona:', error.message)
    // Find persona in mock data
    for (const [, personas] of mockPersonas) {
      const persona = personas.find(p => p.id === id)
      if (persona) return persona
    }
    return null
  }
}

export async function getAllPersonas() {
  try {
    return await db.persona.findMany({
      where: { project: { deletedAt: null } },
      exclude: {
        project: true,
        interviews: true
      },
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.log('Database not available, using mock data for personas:', error.message)
    const allPersonas = []
    for (const [, personas] of mockPersonas) {
      allPersonas.push(...personas)
    }
    return allPersonas.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }
}
