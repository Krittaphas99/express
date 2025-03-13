export type rootServiceInfo = ServiceInfo[]

export interface ServiceInfo {
  id: Id
  serviceName: string
  plan: string
  dateCreate: string
  idString: string
  status: string
  totalrequest: number
  requestmonth: number
}

export interface Id {
  timestamp: number
  creationTime: string
}
