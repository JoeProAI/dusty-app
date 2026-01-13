import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { FileUp, Loader2, Upload, FileCheck } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { uploadESX } from '@/services/api'
import StatusPipeline, { PipelineStageData } from '@/components/StatusPipeline'

export default function HomePage() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  
  const uploadMutation = useMutation({
    mutationFn: uploadESX,
    onSuccess: (data) => {
      navigate(`/convert/${data.file_id}`)
    },
    onError: (err: any) => {
      setError(err.response?.data?.detail || 'Upload failed')
    },
  })
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/octet-stream': ['.esx'] },
    maxFiles: 1,
    onDrop: (files) => {
      setError(null)
      if (files[0]) {
        uploadMutation.mutate(files[0])
      }
    },
  })

  const pipelineStages: PipelineStageData[] = [
    { id: 'upload', label: 'Upload', status: 'pending' },
    { id: 'parse', label: 'Parse', status: 'pending' },
    { id: 'map', label: 'Map', status: 'pending' },
    { id: 'convert', label: 'Convert', status: 'pending' },
    { id: 'download', label: 'Download', status: 'pending' },
  ]
  
  return (
    <div className="h-full flex flex-col bg-bg">
      {/* Header with technical grid pattern */}
      <header className="border-b-2 border-border-strong bg-surface px-8 py-8 relative overflow-hidden">
        <div className="absolute inset-0 grid-technical opacity-30" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-accent" />
            <h1 className="text-3xl font-display font-bold tracking-tight">
              ESX → SYMBILITY
            </h1>
          </div>
          <p className="text-text-secondary text-lg ml-4 max-w-3xl">
            Professional file conversion tool for insurance estimation platforms
          </p>
        </div>
      </header>

      {/* Pipeline Status */}
      <div className="border-b border-border bg-surface-elevated px-8">
        <StatusPipeline stages={pipelineStages} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          {/* Upload Zone */}
          <div
            {...getRootProps()}
            className={`
              relative border-2 rounded-md p-16 mb-8
              transition-all duration-base cursor-pointer
              group
              ${isDragActive 
                ? 'border-accent bg-accent-subtle shadow-lg shadow-accent/20 scale-[1.02]' 
                : 'border-border-strong hover:border-accent hover:bg-surface-elevated hover:shadow-md'
              }
              ${uploadMutation.isPending && 'opacity-50 cursor-not-allowed pointer-events-none'}
            `}
          >
            <input {...getInputProps()} disabled={uploadMutation.isPending} />
            
            <div className="flex flex-col items-center gap-6 relative z-10">
              {uploadMutation.isPending ? (
                <>
                  <div className="relative">
                    <Loader2 size={64} className="text-process animate-spin" strokeWidth={2.5} />
                    <div className="absolute inset-0 rounded-full bg-process blur-xl opacity-30" />
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-display font-semibold mb-2">Processing File</p>
                    <p className="text-sm text-text-muted font-mono">Extracting ESX data...</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative">
                    <div className={`
                      w-20 h-20 rounded-md border-2 flex items-center justify-center
                      transition-all duration-base
                      ${isDragActive 
                        ? 'border-accent bg-accent text-text-inverse scale-110 rotate-3' 
                        : 'border-border-strong group-hover:border-accent group-hover:bg-accent-subtle'
                      }
                    `}>
                      {isDragActive ? (
                        <Upload size={40} strokeWidth={2.5} />
                      ) : (
                        <FileUp size={40} strokeWidth={2.5} className="text-text-secondary group-hover:text-accent" />
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-display font-semibold mb-3">
                      {isDragActive ? 'Release to Upload' : 'Upload Xactimate ESX File'}
                    </p>
                    <p className="text-base text-text-secondary mb-2">
                      Drag and drop or click to browse
                    </p>
                    <div className="flex items-center gap-2 justify-center text-sm text-text-muted font-mono">
                      <FileCheck size={14} />
                      <span>.esx format • Max 50MB</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          {/* Error Display */}
          {error && (
            <div className="mb-8 p-4 bg-danger-subtle border-l-4 border-danger rounded-md">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-danger flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-text-inverse font-bold">!</span>
                </div>
                <div>
                  <p className="font-display font-semibold text-danger mb-1">Upload Failed</p>
                  <p className="text-sm text-text-secondary">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Output Format Info */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-surface border border-border-strong rounded-md p-6 hover:border-accent transition-colors group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-md bg-accent-subtle border border-accent flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-display font-bold text-accent">R</span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                    Roofplan XML
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    Symbility-compatible roof measurement diagrams with precise dimensional data
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-surface border border-border-strong rounded-md p-6 hover:border-accent transition-colors group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-md bg-accent-subtle border border-accent flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-display font-bold text-accent">F</span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                    FML Floor Plans
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    Interior room layouts with accurate floor plan markup for property claims
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
