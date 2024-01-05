import { createSlice } from "@reduxjs/toolkit";

const getAdminToken=()=>{
    const token = localStorage.getItem('adminToken')
    if(token){
        return token
    }
}

const getAdminEmail=()=>{
    const email= localStorage.getItem('adminEmail')
    if(email){
        return email
    }
}


const initialState={
    adminToken:getAdminToken(),
    adminEmail:getAdminEmail()

}
const adminSlice =createSlice({
    name:'admin',
    initialState:initialState,
    reducers:{
        setAdminToken:(state,action)=>{
            state.adminToken=action.payload,
            localStorage.setItem('adminToken',action.payload)
            
        },
        
       
        setAdminEmail:(state,action)=>{
            state.adminEmail=action.payload,
            localStorage.setItem('adminEmail',action.payload)
        },

        setAdminLogOut:(state)=>{
            state.adminToken='',
            state.adminEmail='',
            localStorage.removeItem('adminToken'),
            localStorage.removeItem('adminEmail')

        }
    
    }
})

export default adminSlice.reducer
export const {setAdminToken,setAdminEmail,setAdminLogOut} = adminSlice.actions