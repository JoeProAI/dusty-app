import { Check, Loader2, AlertTriangle, X } from 'lucide-react'

export type PipelineStage = 'upload' | 'parse' | 'map' | 'convert' | 'download'
export type StageStatus = 'pending' | 'active' | 'success' | 'warning' | 'error'

export interface PipelineStageData {
  id: PipelineStage
  label: string
  status: StageStatus
  message?: string
}

interface StatusPipelineProps {
  stages: PipelineStageData[]
  compact?: boolean
}

export default function StatusPipeline({ stages, compact = false }: StatusPipelineProps) {
  const getStageIcon = (status: StageStatus) => {
    switch (status) {
      case 'active':
        return <Loader2 className="animate-spin" size={compact ? 16 : 20} />
      case 'success':
        return <Check size={compact ? 16 : 20} />
      case 'warning':
        return <AlertTriangle size={compact ? 16 : 20} />
      case 'error':
        return <X size={compact ? 16 : 20} />
      default:
        return <div className={`rounded-full ${compact ? 'w-2 h-2' : 'w-3 h-3'} bg-text-muted`} />
    }
  }

  const getStageColor = (status: StageStatus) => {
    switch (status) {
      case 'active':
        return 'text-process border-process bg-process-subtle'
      case 'success':
        return 'text-success border-success bg-success-subtle'
      case 'warning':
        return 'text-warning border-warning bg-warning-subtle'
      case 'error':
        return 'text-danger border-danger bg-danger-subtle'
      default:
        return 'text-text-muted border-border bg-surface'
    }
  }

  const getConnectorColor = (currentStatus: StageStatus, nextStatus: StageStatus) => {
    if (currentStatus === 'success') return 'bg-success'
    if (currentStatus === 'error') return 'bg-danger'
    if (currentStatus === 'warning') return 'bg-warning'
    return 'bg-border'
  }

  return (
    <div className={`w-full ${compact ? 'py-3' : 'py-6'}`}>
      <div className="flex items-center justify-between relative">
        {stages.map((stage, index) => {
          const isLast = index === stages.length - 1
          const nextStage = !isLast ? stages[index + 1] : null

          return (
            <div key={stage.id} className="flex items-center flex-1 last:flex-none">
              {/* Stage Node */}
              <div className="flex flex-col items-center gap-2 relative z-10">
                <div
                  className={`
                    ${compact ? 'w-10 h-10' : 'w-14 h-14'}
                    rounded-md border-2 
                    flex items-center justify-center
                    transition-all duration-base
                    ${getStageColor(stage.status)}
                    ${stage.status === 'active' ? 'shadow-glow' : ''}
                  `}
                >
                  {getStageIcon(stage.status)}
                </div>
                
                <div className="text-center">
                  <div className={`font-mono font-medium uppercase tracking-wider ${compact ? 'text-xs' : 'text-sm'}`}>
                    {stage.label}
                  </div>
                  {stage.message && !compact && (
                    <div className="text-xs text-text-muted mt-1 max-w-24 truncate">
                      {stage.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div className="flex-1 h-0.5 mx-2 relative">
                  <div className="absolute inset-0 bg-border" />
                  <div
                    className={`
                      absolute inset-0 origin-left transition-all duration-slow
                      ${getConnectorColor(stage.status, nextStage?.status || 'pending')}
                    `}
                    style={{
                      transform: stage.status === 'success' ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
