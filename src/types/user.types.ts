export interface LoginUser{
    name:string,
    email:string,
    password:string,
    role:"USER"|"ADMIN"
}

export interface RegisterUser{
    name:string,
    email:string,
    password:string,
    role:"USER"|"ADMIN"
}
