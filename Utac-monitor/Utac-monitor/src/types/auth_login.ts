export interface res_authenLogin {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    gender: string
    image: string
    accessToken: string
    refreshToken: string
  }
  
    export interface req_authenLogin {
        username: string
        password: string
    }
  