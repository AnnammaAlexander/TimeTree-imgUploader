
import express from "express";
import controllers from "../controller/controller.js";
// import {upload,imageUpload} from "../middleware/multer.js"
import middleware from "../middleware/tokenVerify.js";
import adminControllers from "../controller/adminController.js"
import { uploadPost ,uploadProImage} from "../middleware/cloudinary.js";



const router = express.Router()
//user router
router.post('/api/register',controllers.signup)
router.post('/api/login',controllers.UserLogin)
router.get('/api/getAlldata/:id',middleware,controllers.getAllData)
router.patch('/api/saveproject',middleware,controllers.saveproject)
router.get('/api/getuser/:id',middleware,controllers.getUserData)
router.patch('/api/changeUserPassword',controllers.changeUserPassword)
router.post('/api/changeUserdp',uploadProImage,controllers.profileImgUpload)
router.patch('/api/changeuserph',middleware,controllers.changeUserNumber)




//admin router
router.post('/api/adminlogin',adminControllers.adminLogin)
router.get('/api/getuser',middleware,adminControllers.getuser)
router.post('/api/uploadimgs',middleware,uploadPost,adminControllers.imgFilesUpload)
router.get('/api/getadminprofile',middleware,adminControllers.getAdmin)
router.post('/api/changeAdminDp',middleware,uploadProImage,adminControllers.profileImgUpload)
router.patch('/api/changepassword',middleware,adminControllers.changePassword)
router.patch('/api/changeNumber',middleware,adminControllers.changeNumber)







export default router