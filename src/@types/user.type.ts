

export interface CreateUserData {     
    email:                 string     
    password:              string
    name:                  string

    role:                  "ADMIN" | "USER"
    status:                "ACTIVE" | "INACTIVE"
    
}