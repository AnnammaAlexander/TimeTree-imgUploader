import { createSlice } from "@reduxjs/toolkit";

const getProjectFile=()=>{
    const projectfile = JSON.parse(localStorage.getItem('projectfile'))
    if(projectfile){
        return projectfile
    }
}

   

const initialState={
    projectfile:getProjectFile()

}
const projectSlice =createSlice({
    name:'project',
    initialState:initialState,
    reducers:{
        setProjectFile:(state,action)=>{
            state.projectfile=action.payload,
            localStorage.setItem('projectfile',JSON.stringify(action.payload))
        },
        
       
        

        clearProject:(state)=>{
            state.projectfile={},
            localStorage.removeItem('projectfile')

        }
    
    }
})

export default projectSlice.reducer
export const {setProjectFile,clearProject} = projectSlice.actions