export interface EstimateData {
  file_id: string
  filename: string
  metadata: EstimateMetadata
  rooms?: Room[]
  roof_measurements?: RoofMeasurement[]
}

export interface EstimateMetadata {
  xml_files_found: number
  estimate_found: boolean
  roof_data_found: boolean
  floor_plan_found: boolean
}

export interface Room {
  room_id: string
  name: string
  length?: number
  width?: number
  height?: number
  area?: number
  perimeter?: number
}

export interface RoofMeasurement {
  facet_id: string
  slope?: number
  area?: number
  pitch?: string
  ridge_length?: number
  measurements: Record<string, any>
}

export interface MappingTemplate {
  id: string
  name: string
  description?: string
  mappings: Record<string, string>
  created_at: string
}

export interface ConversionHistory {
  id: string
  filename: string
  conversion_type: string
  created_at: string
  status: string
  warnings_count: number
}
