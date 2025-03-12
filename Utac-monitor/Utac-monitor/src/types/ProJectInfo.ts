export type rootProJectInfo = ProJectInfo[]

export interface ProJectInfo {
  id: Id
  serviceName: string
  plan: string
  dateCreate: string
  idString: string
}

export interface Id {
  timestamp: number
  creationTime: string
}
