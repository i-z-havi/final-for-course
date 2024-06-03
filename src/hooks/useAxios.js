import { useEffect } from 'react'
import { useSnack } from '../theme/Snackbar/SnackBarProvider'
import axios from 'axios'
import { useLocalStorageUser } from '../users/providers/UserProvider'

const useAxios = () => {
    const snack = useSnack()
    const { token } = useLocalStorageUser()

    useEffect(() => {
        console.log(token);
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        const requestIntercept=axios.interceptors.request.use((data)=>{
            return Promise.resolve(data);
        })

        const responseIntercept=axios.interceptors.response.use(null,(error)=>{
            snack('error',error.message);
            return Promise.reject(error);
        })

        return()=>{
            axios.interceptors.request.eject(requestIntercept)
            axios.interceptors.response.eject(responseIntercept)
        }
    },[snack,token])
}

export default useAxios;
