'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, User } from 'lucide-react'

interface QAItem {
  question: string
  answer: string
}

interface Interview {
  id: string
  personaId: string
  transcript: QAItem[]
  questionCount: number
  persona: {
    name: string
  }
}

interface InterviewAccordionProps {
  interviews: Interview[]
}

export function InterviewAccordion({ interviews }: InterviewAccordionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          AI-Powered Interviews ({interviews.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {interviews.map((interview, index) => (
            <AccordionItem key={interview.id} value={`interview-${index}`}>
              <AccordionTrigger className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{interview.persona.name}</span>
                  <Badge variant="secondary">{interview.questionCount} questions</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {interview.transcript.map((qa, qaIndex) => (
                    <div key={qaIndex} className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="font-mono text-xs shrink-0">
                          Q{qaIndex + 1}
                        </Badge>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{qa.question}</p>
                          <p className="text-sm text-muted-foreground pl-2 border-l-2 border-muted-foreground">
                            "{qa.answer}"
                          </p>
                        </div>
                      </div>
                      {qaIndex < interview.transcript.length - 1 && (
                        <div className="border-b border-border/40 pt-2" />
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
