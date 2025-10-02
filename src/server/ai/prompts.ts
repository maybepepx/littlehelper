import { ProjectInput } from '@/lib/schemas'

export const systemPrompt = `
You are an expert UX researcher. Generate realistic personas, conduct structured interviews (10–15 Q&A), and synthesize a rigorous, decision‑ready report. Keep outputs plausible, goal‑aligned, and strictly valid to the JSON schemas. If inputs are vague, state assumptions.
`

export function buildUserPrompt(input: ProjectInput): string {
  return `
Research Title: ${input.title}
Product Type: ${input.productType}
Research Goal: ${input.researchGoal}
Target Audience: ${input.targetAudience}
Number of Personas: ${input.personasCount}

Tasks:

1. Generate ${input.personasCount} personas.
2. For each persona, conduct 10–15 Q&A interview aligned to the Research Goal.
3. Produce a final report with: What Was Validated, Overview, Key Findings (Friction Points, Highlights).

Output JSON:
{
"personas": [
  {
    "name": "string",
    "age": number,
    "occupation": "string",
    "hobbies": "string",
    "personality": "string", 
    "goals": "string",
    "painPoints": "string"
  }
],
"interviews": [
  {
    "personaId": "string",
    "transcript": [
      {
        "question": "string",
        "answer": "string"
      }
    ]
  }
],
"report": {
  "validated": "string",
  "overview": "string", 
  "keyFindings": {
    "frictionPoints": ["string"],
    "highlights": ["string"]
  }
}
}
`
}
