import { useLocation } from 'react-router-dom'
import { Check, AlertTriangle, X } from 'lucide-react'

type Status = 'dormant' | 'processing' | 'success' | 'warning' | 'error'

const phases = [
  { id: 'parse', label: 'Parse' },
  { id: 'map', label: 'Map' },
  { id: 'validate', label: 'Validate' },
  { id: 'export', label: 'Export' },
]

export default function ValidationRail() {
  const location = useLocation()
  const isConverting = location.pathname.includes('/convert/')
  
  const status: Status = 'dormant'
  const currentPhase = 0
  
  if (!isConverting) {
    return (
      <div className="w-1 bg-border-strong/20" />
    )
  }
  
  const getPhaseStatus = (index: number): string => {
    if (index < currentPhase) return 'complete'
    if (index === currentPhase) {
      if (status === 'processing') return 'active'
      if (status === 'warning') return 'warning'
      if (status === 'error') return 'error'
      if (status === 'success') return 'complete'
    }
    return 'pending'
  }
  
  return (
    <div className="w-16 bg-surface-elevated border-r border-border flex flex-col items-center py-8">
      <div className="flex-1 flex flex-col items-center justify-center gap-12">
        {phases.map((phase, index) => {
          const phaseStatus = getPhaseStatus(index)
          
          return (
            <div key={phase.id} className="flex flex-col items-center gap-2">
              <div
                className={`
                  w-10 h-10 rounded-sm flex items-center justify-center
                  transition-all duration-base
                  ${phaseStatus === 'complete' && 'bg-success'}
                  ${phaseStatus === 'active' && 'bg-accent animate-pulse'}
                  ${phaseStatus === 'warning' && 'bg-warning'}
                  ${phaseStatus === 'error' && 'bg-danger'}
                  ${phaseStatus === 'pending' && 'bg-border'}
                `}
              >
                {phaseStatus === 'complete' && <Check size={20} className="text-white" />}
                {phaseStatus === 'warning' && <AlertTriangle size={20} className="text-white" />}
                {phaseStatus === 'error' && <X size={20} className="text-white" />}
              </div>
              
              <span
                className={`
                  text-xs font-mono tracking-tight
                  ${phaseStatus === 'active' && 'text-accent font-semibold'}
                  ${phaseStatus === 'complete' && 'text-success'}
                  ${phaseStatus === 'warning' && 'text-warning'}
                  ${phaseStatus === 'error' && 'text-danger'}
                  ${phaseStatus === 'pending' && 'text-text-muted'}
                `}
              >
                {phase.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
