import { configKeys } from "../config/configKey.js";
import Admin from "../model/schema/adminSchema.js";
import ProjectImg from "../model/schema/projectImgSchema.js";

import jwt from 'jsonwebtoken'
import User from "../model/schema/userschema.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
//check the user is exist or not
export const isAdminExist = async(email)=>{
    try {
        const response = await Admin.findOne({email:email})
        
        
        return response
    } catch (error) {
       console.log("error in helpers",error);
        
    }
}


//Generates a JWT token for the provided user ID
export const generateToken = async (userId) => {
    try {
        
        // Check if the JWT token key is defined in your configuration
        if (configKeys?.jwtTokenKey) {
            // Sign the token with the user ID and the JWT token key
            const token = jwt.sign({ userId }, configKeys.jwtTokenKey, {
                expiresIn: '5d', // Token expiration time (5 days in this example)
            });

            // Return the generated token
            
            return token;
        } else {
            // Throw an error if the JWT_TOKEN_KEY is not defined
            throw new Error('JWT_TOKEN_KEY is undefined');
        }
    } catch (error) {
        // Handle any errors that occur during token generation
        console.error('Error generating token:', error);
        throw error; 
    }
};
//get user list
export const getUserList = async()=>{
    try {
        const response = await User.find()
        return response;
    } catch (error) {
        console.log(error);
        throw error; 

    }
}
//upload set of image files
export const postImgUpload = async(userId,files)=>{
    try {
       
        
         files.forEach(async(singleFile)=>{
            await ProjectImg.create({userId,imgUrl:singleFile.path})
            return true
        })
    } catch (error) {

        throw error; 
  
    }
}
//getAdminDetails
export const getAdminDetails = async() =>{
    try {
        const response = await Admin.findOne({})
        response.password=''
        return response
    } catch (error) {
        throw error; 
 
    }
}
//uploadDp
export const uploadDp = async(filename)=>{
    try {
        const response = await Admin.updateOne({},{$set:{dp:filename}})
        if(response.modifiedCount === 1){
            return true;
        }
    } catch (error) {
        throw error; 
  
    }
}
//isAdminGet
export const isAdminGet = async() =>{
    try {
        return await Admin.findOne({})
    } catch (error) {
        throw error; 

    }
}
//updatePassword
export const updatePassword = async(hashPassword)=>{
    try {
        const response =await Admin.updateOne({},{$set:{password:hashPassword}})
        if(response.modifiedCount ===1){
            return true
        }
    } catch (error) {
        throw error; 
  
    }
}
//changePhoneNumber
export const changePhoneNumber = async(phonenumber) =>{
try {
    const response = await Admin.updateOne({},{$set:{phonenumber}})
    if(response.modifiedCount){
        return true
    }
} catch (error) {
    throw error;  
}
}

