import axios from 'axios'

const getApiBaseURL = () => {
  if (typeof window !== 'undefined') {
    const env = (import.meta as any).env
    if (env?.PROD && env?.VITE_API_URL) {
      return `${env.VITE_API_URL}/api`
    }
  }
  return '/api'
}

const api = axios.create({
  baseURL: getApiBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface UploadResponse {
  file_id: string
  filename: string
  size: number
  metadata: {
    xml_files_found: number
    estimate_found: boolean
    roof_data_found: boolean
    floor_plan_found: boolean
  }
  preview: {
    structure: Record<string, string[]>
    summary: string
  }
  status: string
}

export async function uploadESX(file: File): Promise<UploadResponse> {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  
  return response.data
}

export interface ConversionRequest {
  file_id: string
  output_type: 'roofplan' | 'floorplan'
  mapping_overrides?: Record<string, string>
  use_ai_mapping: boolean
}

export interface ConversionResponse {
  conversion_id: string
  output_type: string
  download_url: string
  warnings: string[]
  mapped_items: number
  unmapped_items: number
}

export async function convertToRoofplan(request: ConversionRequest): Promise<ConversionResponse> {
  const response = await api.post('/convert/roofplan', request)
  return response.data
}

export async function convertToFloorplan(request: ConversionRequest): Promise<ConversionResponse> {
  const response = await api.post('/convert/floorplan', request)
  return response.data
}

export default api
