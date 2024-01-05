import {v2 as cloudinary }  from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage} from 'multer-storage-cloudinary';

const projectImage = {
    cloudinary :cloudinary,
    params: {
        folder:'projectImage',
        allowed_formats : ['jpg' ,'jpeg' , 'png' , 'svg' , 'webp' ,'gif'  ] ,
        public_id : (req , file) =>{
            // console.log('original name....',file);
            
            const originalName = file.originalname.split('.')
            return `post-${Date.now()}-${originalName[0]}`
        }
    }
}
const ProfileImage = {
    cloudinary : cloudinary,
    params : {
        folder : 'profileImages' ,
        allowed_formats :['jpg' ,'jpeg' , 'png' , 'svg' , 'webp'  ] ,
        public_id :(req,file) =>{
             console.log('original name.....................',file);
            
            const originalName = file.originalname.split('.')
            return `profile-${Date.now()}-${originalName[0]}`
        }
    }
}



const profileImageStorage = new CloudinaryStorage(ProfileImage);
export const uploadProImage = multer({storage:profileImageStorage}).single('profilePhoto')

const projectStorage = new CloudinaryStorage(projectImage);
export const uploadPost = multer({storage:projectStorage}).array('img',500);

