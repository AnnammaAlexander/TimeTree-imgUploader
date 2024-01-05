import { createSlice } from "@reduxjs/toolkit";


const getToken=()=>{
    const token = localStorage.getItem('token')
    if(token){
        return token
    }
}

const getUserId=()=>{
    const id= localStorage.getItem('id')
    if(id){
        return id
    }
}


const initialState={
    token:getToken(),
    id:getUserId()

}
const userSlice =createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload,
            localStorage.setItem('token',action.payload)
        },
        
       
        setID:(state,action)=>{
            state.id=action.payload,
            localStorage.setItem('id',action.payload)
        },

        setLogOut:(state)=>{
            state.token='',
            state.id='',
            localStorage.removeItem('token'),
            localStorage.removeItem('id')

        }
    
    }
})

export default userSlice.reducer
export const {setToken,setID,setLogOut} = userSlice.actions