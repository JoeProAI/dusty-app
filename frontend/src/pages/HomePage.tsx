import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { FileUp, Loader2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { uploadESX } from '@/services/api'

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
  
  return (
    <div className="h-full flex flex-col">
      <header className="border-b border-border bg-surface px-8 py-6">
        <h1 className="text-2xl font-display font-semibold">
          Convert ESX to Symbility Format
        </h1>
        <p className="text-text-secondary mt-2">
          Upload an Xactimate .esx file to generate Roofplan XML or FML floor plans
        </p>
      </header>
      
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-16
              transition-all duration-base cursor-pointer
              ${isDragActive 
                ? 'border-accent bg-accent/5' 
                : 'border-border hover:border-accent/50 hover:bg-surface-elevated'
              }
              ${uploadMutation.isPending && 'opacity-50 cursor-not-allowed'}
            `}
          >
            <input {...getInputProps()} disabled={uploadMutation.isPending} />
            
            <div className="flex flex-col items-center gap-4">
              {uploadMutation.isPending ? (
                <>
                  <Loader2 size={48} className="text-accent animate-spin" />
                  <p className="text-lg font-medium">Processing ESX file...</p>
                </>
              ) : (
                <>
                  <FileUp size={48} className="text-text-muted" />
                  <div className="text-center">
                    <p className="text-lg font-medium mb-2">
                      {isDragActive ? 'Drop ESX file here' : 'Drop ESX file or click to browse'}
                    </p>
                    <p className="text-sm text-text-muted">
                      Maximum file size: 50MB
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-danger/10 border border-danger rounded-md">
              <p className="text-danger font-medium">{error}</p>
            </div>
          )}
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-4 bg-surface-elevated rounded-md">
              <h3 className="font-display font-semibold mb-2">Roofplan XML</h3>
              <p className="text-sm text-text-muted">
                For importing roof measurements and diagrams into Symbility Claims Estimate
              </p>
            </div>
            
            <div className="p-4 bg-surface-elevated rounded-md">
              <h3 className="font-display font-semibold mb-2">FML Floor Plans</h3>
              <p className="text-sm text-text-muted">
                For importing interior room layouts and floor plans into Symbility
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
