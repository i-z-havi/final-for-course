import { jwtDecode } from "jwt-decode"

const TOKEN_KEY="token"
export const setToken=(token)=> {
    localStorage.setItem(TOKEN_KEY,token)
}

export const getUserFromToken=()=>{
    try{
        const token = localStorage.getItem(TOKEN_KEY)
        const user = jwtDecode(token)
        user.isAdmin = user.isAdmin==="True";
        return user
    }
    catch(error){
        return null;
    }
}

export const removeToken=()=>{
    localStorage.removeItem(TOKEN_KEY)
}

export const getToken=()=>{
    localStorage.getItem(TOKEN_KEY)
}