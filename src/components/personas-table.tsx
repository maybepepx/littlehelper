'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { User } from 'lucide-react'

interface Persona {
  id: string
  name: string
  age: number
  occupation: string
  personality: string
  painPoints: string
}

interface PersonasTableProps {
  personas: Persona[]
  onSelectPersona?: (persona: Persona) => void
}

export function PersonasTable({ personas, onSelectPersona }: PersonasTableProps) {
  const truncateText = (text: string, maxLength: number = 100) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          User Personas ({personas.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Occupation</TableHead>
              <TableHead>Personality</TableHead>
              <TableHead>Pain Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {personas.map((persona) => (
              <TableRow 
                key={persona.id}
                className={onSelectPersona ? 'cursor-pointer hover:bg-muted/50' : ''}
                onClick={() => onSelectPersona?.(persona)}
              >
                <TableCell className="font-medium">{persona.name}</TableCell>
                <TableCell>{persona.age}</TableCell>
                <TableCell>{persona.occupation}</TableCell>
                <TableCell>{truncateText(persona.personality)}</TableCell>
                <TableCell>{truncateText(persona.painPoints)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
