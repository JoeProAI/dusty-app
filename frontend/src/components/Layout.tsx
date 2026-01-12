import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FileUp, History, Layers } from 'lucide-react'
import ValidationRail from './ValidationRail'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Convert', icon: FileUp },
    { path: '/history', label: 'History', icon: History },
    { path: '/templates', label: 'Templates', icon: Layers },
  ]
  
  return (
    <div className="min-h-screen flex">
      <ValidationRail />
      
      <nav className="w-64 bg-surface border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-display font-semibold">
            XS Converter
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Xactimate → Symbility
          </p>
        </div>
        
        <div className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-md
                      transition-colors duration-fast
                      ${isActive 
                        ? 'bg-accent text-white' 
                        : 'hover:bg-surface-elevated text-text-secondary'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        
        <div className="p-4 border-t border-border">
          <div className="text-xs text-text-muted">
            <div className="font-mono">v1.0.0</div>
            <div className="mt-1">Built for Dustin</div>
          </div>
        </div>
      </nav>
      
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
