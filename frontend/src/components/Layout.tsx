import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FileUp, History, Layers, Zap } from 'lucide-react'
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
    <div className="min-h-screen flex bg-bg">
      <ValidationRail />
      
      <nav className="w-72 bg-surface border-r-2 border-border-strong flex flex-col relative">
        {/* Accent line */}
        <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
        
        {/* Brand Header */}
        <div className="p-8 border-b-2 border-border-strong relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center">
              <Zap size={24} className="text-text-inverse" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold tracking-tight">
                XS CONVERTER
              </h1>
              <p className="text-xs font-mono text-text-muted tracking-wider">
                v1.0.0
              </p>
            </div>
          </div>
          <p className="text-sm text-text-secondary font-medium">
            Xactimate → Symbility
          </p>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 p-6">
          <div className="text-xs font-mono font-semibold text-text-muted uppercase tracking-wider mb-4 px-2">
            Navigation
          </div>
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center gap-4 px-4 py-3.5 rounded-md
                      transition-all duration-base font-medium
                      relative group
                      ${isActive 
                        ? 'bg-accent text-text-inverse shadow-md' 
                        : 'hover:bg-surface-elevated text-text-secondary hover:text-text hover:pl-6'
                      }
                    `}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-text-inverse rounded-r" />
                    )}
                    <Icon size={20} strokeWidth={2.5} />
                    <span className="font-display tracking-tight">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        
        {/* Footer Info */}
        <div className="p-6 border-t-2 border-border-strong bg-surface-elevated">
          <div className="text-xs text-text-muted space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="font-mono">System Online</span>
            </div>
            <div className="pt-2 border-t border-border">
              <div className="font-medium text-text-secondary">Built for Dustin</div>
              <div className="font-mono text-xs mt-1">Professional Edition</div>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
