'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ProjectInput } from '@/lib/schemas'

interface ProjectFormProps {
  onSubmit: (data: ProjectInput) => Promise<void>
  isLoading?: boolean
}

export function ProjectForm({ onSubmit, isLoading = false }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    productType: '',
    researchGoal: '',
    targetAudience: '',
    personasCount: 3,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const isValid = Object.values(formData).every(value => 
      typeof value === 'string' ? value.trim().length > 0 : value > 0
    )
    
    if (isValid) {
      await onSubmit(formData as ProjectInput)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Start Automated Research</CardTitle>
        <CardDescription>
          Define your research parameters and automatically generate complete AI-powered research reports.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Research Title</label>
              <Input 
                placeholder="E-commerce Checkout Optimization"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Product Type</label>
              <Input 
                placeholder="Mobile checkout flow"
                value={formData.productType}
                onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Research Goal</label>
              <Textarea 
                placeholder="Understand why users abandon the checkout process during payment step"
                rows={3}
                value={formData.researchGoal}
                onChange={(e) => setFormData({ ...formData, researchGoal: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Target Audience</label>
              <Textarea 
                placeholder="Online shoppers age 22-45 who have abandoned carts in the past month"
                rows={3}
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Personas</label>
              <Input 
                type="number" 
                min="1" 
                max="12"
                value={formData.personasCount}
                onChange={(e) => setFormData({ ...formData, personasCount: parseInt(e.target.value) || 3 })}
              />
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Generating Research Report...' : 'Start Research'}
            </Button>
          </form>
      </CardContent>
    </Card>
  )
}
