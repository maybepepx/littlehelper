'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  FileText,
  Plus,
  Settings
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const router = useRouter()

  const navItems = [
    {
      title: 'Projects',
      icon: LayoutDashboard,
      href: '/',
    },
    {
      title: 'Personas',
      icon: Users,
      href: '/personas',
    },
    {
      title: 'Interviews',
      icon: MessageSquare,
      href: '/interviews',
    },
    {
      title: 'Reports',
      icon: FileText,
      href: '/reports',
    },
  ]

  return (
    <div className={cn('flex flex-col gap-4 p-4', className)}>
      <div className="flex items-center gap-2 px-2">
        <Plus className="h-5 w-5" />
        <span className="font-semibold">Research Hub</span>
      </div>
      
      <Separator />
      
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className="justify-start gap-2"
            onClick={() => router.push(item.href)}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Button>
        ))}
      </nav>
      
      <Separator className="mt-auto" />
      
      <Button
        variant="ghost"
        className="justify-start gap-2"
        onClick={() => router.push('/settings')}
      >
        <Settings className="h-4 w-4" />
        Settings
      </Button>
    </div>
  )
}
