import { z } from 'zod'

export const ProjectInput = z.object({
  title: z.string().min(3),
  productType: z.string().min(2),
  researchGoal: z.string().min(10),
  targetAudience: z.string().min(3),
  personasCount: z.number().int().min(1).max(12),
})

export const PersonaSchema = z.object({
  name: z.string().min(2),
  age: z.number().min(16).max(90),
  occupation: z.string(),
  hobbies: z.string().min(1),
  personality: z.string().min(10),
  goals: z.string().min(10),
  painPoints: z.string().min(10),
})

export const QAItem = z.object({ 
  question: z.string().min(3), 
  answer: z.string().min(1) 
})

export const InterviewSchema = z.object({ 
  personaId: z.string(), 
  transcript: z.array(QAItem).min(10).max(15) 
})

export const ReportSchema = z.object({
  validated: z.string().min(10),
  overview: z.string().min(20),
  keyFindings: z.object({ 
    frictionPoints: z.array(z.string()).min(1), 
    highlights: z.array(z.string()).min(1) 
  })
})

export const AIResponseSchema = z.object({
  personas: z.array(PersonaSchema),
  interviews: z.array(z.object({
    personaId: z.string(),
    transcript: z.array(QAItem).min(10).max(15)
  })),
  report: ReportSchema
})

export type ProjectInput = z.infer<typeof ProjectInput>
export type PersonaSchema = z.infer<typeof PersonaSchema>
export type QAItem = z.infer<typeof QAItem>
export type InterviewSchema = z.infer<typeof InterviewSchema>
export type ReportSchema = z.infer<typeof ReportSchema>
export type AIResponse = z.infer<typeof AIResponseSchema>
