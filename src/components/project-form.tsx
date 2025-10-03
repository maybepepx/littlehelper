'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ProjectInput } from '@/lib/schemas'

interface ProjectFormProps {
  onSubmit: (data: ProjectInput) => Promise<void>
  isLoading?: boolean
}

export function ProjectForm({ onSubmit, isLoading = false }: ProjectFormProps) {
  const form = useForm<ProjectInput>({
    resolver: zodResolver(ProjectInput),
    defaultValues: {
      title: '',
      productType: '',
      researchGoal: '',
      targetAudience: '',
      personasCount: 3,
    },
  })

  const handleSubmit = async (data: ProjectInput) => {
    await onSubmit(data)
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Research Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="E-commerce Checkout Optimization" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Type</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Mobile checkout flow" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="researchGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Research Goal</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Understand why users abandon the checkout process during payment step"
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Audience</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Online shoppers age 22-45 who have abandoned carts in the past month"
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="personasCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Personas</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1" 
                      max="12"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Generating Research Report...' : 'Start Research'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
