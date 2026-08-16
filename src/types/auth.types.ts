export interface AuthUser{
    userId:number,
    role:"USER"|"ADMIN"
}

export interface RefreshTokenPayload{
    userId:number
}