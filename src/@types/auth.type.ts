
export interface RegisterData {
    name: string,
    email: string,
    password: string
}


export interface LoginData {
    email: string,
    password: string
}

export interface TokenPayload {
  userId: string
  userEmail: string
  userName: string
  userRole: string
}

