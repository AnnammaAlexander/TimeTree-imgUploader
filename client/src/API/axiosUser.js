import axios from "axios"
import { Base_URL } from "./baseUrl";


const baseURL = axios.create({
    baseURL: Base_URL,
});

baseURL.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("token")
        const adminToken = localStorage.getItem("adminToken")
       
        if(token){
            config.headers["Authorization"]=`Bearer ${token}`
        }else if(adminToken){
            config.headers["Authorization"]=`Bearer ${adminToken}`
        }else{
            delete config.headers["Authorization"]
        }
        return config
    },
    (error)=>{
        console.log("Interceptor encounted an error");
        return Promise.reject(error)
        
    }
)

export default baseURL