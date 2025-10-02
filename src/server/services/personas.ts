import { db } from '@/lib/db'

export async function createPersonas(projectId: string, personas: Array<{
  name: string
  age: number
  occupation: string
  hobbies: string
  personality: string
  goals: string
  painPoints: string
}>) {
  return db.persona.createMany({
    data: personas.map(persona => ({
      projectId,
      ...persona
    }))
  })
}

export async function getPersonas(projectId: string) {
  return db.persona.findMany({
    where: { projectId },
    include: {
      interviews: true
    }
  })
}

export async function getPersona(id: string) {
  return db.persona.findUnique({
    where: { id },
    include: {
      project: true,
      interviews: true
    }
  })
}

export async function getAllPersonas() {
  return db.persona.findMany({
    where: { project: { deletedAt: null } },
    include: {
      project: true,
      interviews: true
    },
    orderBy: { createdAt: 'desc' }
  })
}
