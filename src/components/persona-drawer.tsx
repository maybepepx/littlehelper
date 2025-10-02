'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Calendar, MapPin, Users, Target, AlertTriangle } from 'lucide-react'

interface Persona {
  id: string
  name: string
  age: number
  occupation: string
  hobbies: string
  personality: string
  goals: string
  painPoints: string
}

interface PersonaDrawerProps {
  persona: Persona | null
  isOpen: boolean
  onClose: () => void
}

export function PersonaDrawer({ persona, isOpen, onClose }: PersonaDrawerProps) {
  if (!persona) return null

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            {persona.name}
            <Badge variant="secondary">{persona.age} years old</Badge>
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-4 w-4" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{persona.occupation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{persona.age} years old</span>
              </div>
              
              {persona.hobbies && (
                <div>
                  <p className="text-sm font-medium mb-2">Hobbies & Interests:</p>
                  <p className="text-sm text-muted-foreground">{persona.hobbies}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-4 w-4" />
                Goals & Behavior
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-1">Personality:</p>
                <p className="text-sm text-muted-foreground">{persona.personality}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium mb-1">Goals:</p>
                <p className="text-sm text-muted-foreground">{persona.goals}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-4 w-4" />
                Pain Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{persona.painPoints}</p>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  )
}
