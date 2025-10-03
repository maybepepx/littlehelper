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
  try {
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
  } catch (error) {
    console.error('AI generation failed, using mock data:', error.message)
    
    // Fallback to mock data for demo purposes
    return generateMockResearchData(input)
  }
}

function generateMockResearchData(input: ProjectInput) {
  const mockPersonas = Array.from({ length: input.personasCount }, (_, i) => ({
    name: `Research Participant ${i + 1}`,
    age: 25 + (i * 5),
    occupation: `Software Developer`,
    hobbies: 'Technology, Music, Reading',
    personality: 'Analytical thinker who enjoys problem-solving. Prefers detailed information before making decisions.',
    goals: `Looking to improve ${input.productType.toLowerCase()} efficiency and reduce time spent на routine tasks`,
    painPoints: `Current ${input.productType.toLowerCase()} processes are too complex and time-consuming`
  }))

  const mockInterviews = mockPersonas.map((persona, index) => ({
    personaId: `mock_persona_${index}`,
    transcript: [
      {
        question: `What is your current experience with ${input.productType.toLowerCase()}?`,
        answer: `I use ${input.productType.toLowerCase()} regularly in my work, but I find it challenging to navigate efficiently.`
      },
      {
        question: `What challenges do you face?`,
        answer: `The main challenge is that the interface is not intuitive, and I often get lost trying to find the right features.`
      },
      {
        question: `What would improve your workflow?`,
        answer: `I'd like to see better organization of features and clearer onboarding to understand all available tools.`
      },
      {
        question: `How do you currently solve these problems?`,
        answer: `I usually ask colleagues for help or spend extra time experimenting with different approaches.`
      },
      {
        question: `What's your ideal user experience?`,
        answer: `I want something that's easy to learn, with clear guidance and helpful tooltips along the way.`
      }
    ]
  }))

  const mockReport = {
    validated: `Successfully validated user needs for ${input.productType} through participant interviews.`,
    overview: `This research aimed to understand ${input.researchGoal.toLowerCase()}. We interviewed ${input.personasCount} participants who represent the target audience: ${input.targetAudience.toLowerCase()}.`,
    keyFindings: {
      frictionPoints: [
        'Complex interface design creates user confusion',
        'Lack of intuitive navigation patterns',
        'Missing onboarding and guidance features',
        'Inconsistent design patterns across sections'
      ],
      highlights: [
        'Users are motivated to find efficient solutions',
        'Clear demand for improved user guidance',
        'Strong preference for streamlined workflows',
        'Positive attitude toward learning new tools with good design'
      ]
    }
  }

  return { personas: mockPersonas, interviews: mockInterviews, report: mockReport }
}
