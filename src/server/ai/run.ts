import { anthropic, MODEL } from './client'
import { systemPrompt, buildUserPrompt } from './prompts'
import { AIResponseSchema, type ProjectInput } from '@/lib/schemas'

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function callAnthropic(prompt: string, retryCount = 0): Promise<string> {
  try {
    if (!anthropic) {
      throw new Error('ANTHROPIC_API_KEY environment variable is required')
    }
    
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 8000,
      system: systemPrompt,
      messages: [
        { role: 'user', content: prompt }
      ]
    })
    
    return message.content[0].type === 'text' 
      ? message.content[0].text 
      : ''
  } catch (error) {
    console.error(`Anthropic call failed (attempt ${retryCount + 1}):`, error)
    
    if (retryCount < 2) {
      const backoffDelay = Math.pow(2, retryCount) * 1000
      console.log(`Retrying in ${backoffDelay}ms...`)
      await delay(backoffDelay)
      return callAnthropic(prompt, retryCount + 1)
    }
    throw error
  }
}

export async function generateCompleteResearch(input: ProjectInput) {
  const userPrompt = buildUserPrompt(input)
  const response = await callAnthropic(userPrompt)
  
  // Extract JSON from response
  const jsonMatch = response.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('No valid JSON found in AI response')
  }
  
  const jsonString = jsonMatch[0]
  
  try {
    return AIResponseSchema.parse(JSON.parse(jsonString))
  } catch (error) {
    console.error('Failed to parse AI response:', error)
    console.error('Raw response:', response)
    throw new Error('Invalid AI response format')
  }
}
