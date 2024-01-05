import { Schema,model } from "mongoose";

const userSchema=new Schema(
    {
        name:{
            type:String,
            required:true
        },
        phonenumber:{
            type:String,
            required:true

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

const User = model('User',userSchema,'users')

export default User