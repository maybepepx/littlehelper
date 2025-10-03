import { db } from '@/lib/db'

// Temporary mock storage for interviews
const mockInterviews = new Map()

export async function createInterviews(projectId: string, interviews: Array<{
  personaId: string
  transcript: Array<{ question: string; answer: string }>
}>) {
  try {
    return await db.interview.createMany({
      data: interviews.map(interview => ({
        projectId,
        personaId: interview.personaId,
        transcript: interview.transcript,
        questionCount: interview.transcript.length
      }))
    })
  } catch (error) {
    console.log('Database not available, using mock data for interviews:', error.message)
    
    // Mock implementation
    const mappedInterviews = interviews.map((interview, index) => ({
      id: `mock_interview_${projectId}_${index}`,
      projectId,
      personaId: interview.personaId,
      transcript: interview.transcript,
      questionCount: interview.transcript.length,
      createdAt: new Date(),
    }))
    
    mockInterviews.set(projectId, mappedInterviews)
    return { count: mappedInterviews.length }
  }
}

export async function getInterviews(projectId: string) {
  try {
    return await db.interview.findMany({
      where: { projectId },
      exclude: {
        persona: true
      }
    })
  } catch (error) {
    console.log('Database not available, using mock data for interviews:', error.message)
    return mockInterviews.get(projectId) || []
  }
}

export async function getInterview(id: string) {
  try {
    return await db.interview.findUnique({
      where: { id },
      exclude: {
        persona: true,
        project: true
      }
    })
  } catch (error) {
    console.log('Database not available, using mock data for interview:', error.message)
    // Find interview in mock data
    for (const [, interviews] of mockInterviews) {
      const interview = interviews.find(i => i.id === id)
      if (interview) return interview
    }
    return null
  }
}

export async function getAllInterviews() {
  try {
    return await db.interview.findMany({
      where: { project: { deletedAt: null } },
      exclude: {
        persona: true,
        project: true
      },
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.log('Database not available, using mock data for interviews:', error.message)
    const allInterviews = []
    for (const [, interviews] of mockInterviews) {
      allInterviews.push(...interviews)
    }
    return allInterviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }
}
