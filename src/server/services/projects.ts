import { db } from '@/lib/db'
import { ProjectInput } from '@/lib/schemas'

export async function createProject(input: ProjectInput) {
  return db.project.create({
    data: {
      title: input.title,
      productType: input.productType,
      researchGoal: input.researchGoal,
      targetAudience: input.targetAudience,
      personasCount: input.personasCount,
    }
  })
}

export async function getProjects() {
  return db.project.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' },
    include: {
      personas: true,
      interviews: true,
      report: true,
    }
  })
}

export async function getProject(id: string) {
  return db.project.findUnique({
    where: { id },
    include: {
      personas: true,
      interviews: true,
      report: true,
    }
  })
}

export async function updateProjectStatus(id: string, status: 'DRAFT' | 'RUNNING' | 'COMPLETE') {
  return db.project.update({
    where: { id },
    data: { status }
  })
}

export async function softDeleteProject(id: string) {
  return db.project.update({
    where: { id },
    data: { deletedAt: new Date() }
  })
}

export async function hardDeleteProject(id: string) {
  return db.project.delete({
    where: { id }
  })
}
