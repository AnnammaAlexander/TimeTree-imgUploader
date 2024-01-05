import baseURL from "./axiosUser";

//Admin login
export const Adminlog = async(values)=>{
    try {
      const response = await baseURL.post("/adminlogin",values)
       
      return response?.data

    } catch (error) {
      throw new Error('Login failed.')
    }
  }
  //get user details
 export const getUserDetails = async()=>{
    try {
        const response = await baseURL.get("/getuser")
    return response.data
    } catch (error) {
        throw new Error(' failed.')
  
    }
 }
 //upload images
export const uploadImageFiles = async(id,imgfiles)=>{
    try {
        // console.log("formdata...........",imgfiles);
        const formdata = new FormData()

        formdata.append("id",id)

           // Append each file separately
           imgfiles.forEach((file) => {
            formdata.append("img", file);
          });
        // formdata.append("img",imgfiles)

        const response = await baseURL.post("/uploadimgs",formdata,{
            headers:{'Content-Type' : 'multipart/form-data'}
        })
        
        return response.data
    } catch (error) {
        throw new Error('failed.') 
    }
}
//getAdmin

export const getAdmin = async() =>{
    try {
        const response = await baseURL.get("/getadminprofile")
        
        return response.data
    } catch (error) {
        throw new Error(' get admin failed.') 

    }
}
//ChangeProfile
export const ChangeProfile = async(profilePhoto) =>{
    try {
        
        const formData = new FormData()
        formData.append("profilePhoto",profilePhoto)
        const response = await baseURL.post("/changeAdminDp",formData,{
            headers:{'Content-Type' : 'multipart/form-data'}
        })
        return response.data
    } catch (error) {
        throw new Error('  failed.') 
 
    }
}

//changePassword
export const changePassword =async(values) =>{
    try {
        
        const response = await baseURL.patch("/changepassword",values)
        return response.data
    } catch (error) {
        throw new Error('  failed.') 
 
    }
}
//changeMobileNum
export const changeMobileNum =async(values) =>{
    try {
        const response = await baseURL.patch("/changeNumber",values)
        console.log(" response.data...", response.data);
       return response.data
    } catch (error) {
        throw new Error('  failed.') 
   
    }
}
