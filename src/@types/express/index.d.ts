export {}

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string
        userEmail: string
        userName: string
        userRole: string
      }
    }
  }
}