import multer from 'multer';
import path from 'path';


//upload img
const storage=multer.diskStorage({
    
    destination:(req,file,cb)=>{
        console.log("storage.....",req,file);

        cb(null,'uploads/img_upload')
    },
    filename:(req,file,cb)=>{
        console.log("storage.....",req,file);

        const ext = path.extname(file.originalname)
        const filename = file.originalname.split(ext)[0]
        cb(null,filename+'_'+Date.now()+ext)
        
        
    }
    
})

const prifilePicStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/profilePic_upload')
    },
    filename:(req,file,cb)=>{
        const ext = path.extname(file.originalname)
        const filename = file.originalname.split(ext)[0]
        cb(null,filename+'_'+Date.now()+ext)
        
        
    }
})

export const upload =multer ({storage}).single('img')
export const imageUpload =multer ({prifilePicStorage,limit:{fileSize: 5000 * 1024}})
// export {upload,imageUpload}
