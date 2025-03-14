export type rootServiceInfo = ServiceInfo[]

export interface ServiceInfo {
  id: Id
  serviceName: string
  plan: string
  dateCreate: string
  ip: string
  port: number
  endpoint: string
  idString: string
  status: string
  totalRequest: number
  requestMonth: number
}


export interface Id {
  timestamp: number
  creationTime: string
}
