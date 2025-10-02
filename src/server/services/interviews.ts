import { db } from '@/lib/db'

export async function createInterviews(projectId: string, interviews: Array<{
  personaId: string
  transcript: Array<{ question: string; answer: string }>
}>) {
  return db.interview.createMany({
    data: interviews.map(interview => ({
      projectId,
      personaId: interview.personaId,
      transcript: interview.transcript,
      questionCount: interview.transcript.length
    }))
  })
}

export async function getInterviews(projectId: string) {
  return db.interview.findMany({
    where: { projectId },
    include: {
      persona: true
    }
  })
}

export async function getInterview(id: string) {
  return db.interview.findUnique({
    where: { id },
    include: {
      persona: true,
      project: true
    }
  })
}

export async function getAllInterviews() {
  return db.interview.findMany({
    where: { project: { deletedAt: null } },
    include: {
      persona: true,
      project: true
    },
    orderBy: { createdAt: 'desc' }
  })
}
