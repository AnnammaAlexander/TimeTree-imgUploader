import baseURL from "./axiosUser";


export const signupUser = async(values)=>{
    try {
    
        const response = await baseURL.post('/register',values)
        
        return response.data
    } catch (error) {
        throw new Error('Registration failed.')
    }
}
//UserLogin
export const UserLogin = async(values)=>{
    try {
      const response = await baseURL.post("/login",values)
      // console.log("bbbbbbbbbbbbbbbb",response.data);
      return response?.data

    } catch (error) {
      throw new Error('Login failed.')
    }
  }

  // get ProjectData
  export const ProjectData = async(id)=>{
    try {
        console.log(".....id",id);
        const response = await baseURL.get(`/getAlldata/${id}`)
        return response.data
    } catch (error) {
        throw new Error(' ProjectData failed.')

    }
  }
  //saveProject 
  export const saveProject =async (values)=>{
    try {
        const response = await baseURL.patch('/saveproject',values)
        return response.data;

    } catch (error) {
        throw new Error(' Project save failed.')

    }
  }
  //getUser
  export const getUser = async(id) =>{
    try {
        const response = await baseURL.get(`/getuser/${id}`)
        return response.data;
    } catch (error) {
        throw new Error('error loading user data')
 
    }
  }
  //changePassword
  export const changePassword = async (values) =>{
    try {
        const response = await baseURL.patch('/changeUserPassword',values)
        return response.data

    } catch (error) {
        throw new Error('error changePassword ')

    }
  }
  //ChangeUserProfile
  export const ChangeUserProfile =async(profilePhoto,id)=>{
    try {
      const formData = new FormData()
      console.log("...........",profilePhoto,id);
      formData.append("profilePhoto",profilePhoto)
      formData.append("id",id)
      const response = await baseURL.post('/changeUserdp',formData,{
        headers:{'Content-Type' : 'multipart/form-data'}
    })
      return response.data
    } catch (error) {
      throw new Error('error in change user dp ')

    }

  }
  //changeUserMobileNum

  export const changeUserMobileNum =async(values) =>{
    try {
        const response = await baseURL.patch("/changeuserph",values)
       return response.data
    } catch (error) {
        throw new Error('  failed.') 
   
    }
}
