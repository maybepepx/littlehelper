'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function TestPage() {
  const [input, setInput] = useState('')

  return (
    <div className="min-h-screen bg-background p-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Test Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type something..."
          />
          <p>You typed: {input}</p>
          <Button>Click me</Button>
        </CardContent>
      </Card>
    </div>
  )
}
