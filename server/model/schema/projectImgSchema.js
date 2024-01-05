import { Schema,model } from "mongoose";

const projectImgSchema=new Schema(
    {
       
        userId:{
            type:String,
            required:true
        },
        

        imgUrl:{
            type:String,
        },
        isSaved:{
            type:Boolean,
            requires:true,
            default:false
        },
        shippingArea:{
            type:String
        },
        brand:{
            type:String
        },
        entryDate:{
            type:String
        },
        time:{
            type:String
        },
        warranty:{
            type:String
        },
        shippingTimeframe:{
            type:String
        },
        productRating:{
            type:String
        },
        dateSubmittedForReview:{
            type:String
        },
        material:{
            type:String
        },
        productType:{
            type:String
        },
        globalRating:{
            type:String
        },
      
        







        
        
    }
    ,{
        timestamps:true
    }
)

const ProjectImg = model('projectImg',projectImgSchema,'projectImgs')

export default ProjectImg