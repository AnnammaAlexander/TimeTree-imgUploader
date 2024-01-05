import { Schema,model } from "mongoose";

const AdminSchema=new Schema(
    {
       name:{
        type:String
       },
        phonenumber:{
            type:String,
            

        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },

        
        dp:{
            type:String,
        },
        
        
    }
    ,{
        timestamps:true
    }
)

const Admin = model('Admin',AdminSchema,'admin')

export default Admin