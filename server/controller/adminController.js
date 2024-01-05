import bcrypt from "bcryptjs";
import {
  isAdminExist,
  generateToken,
  getUserList,
  getAdminDetails,
  uploadDp,
  isAdminGet,
  updatePassword,
} from "../helper/adminHelper.js";
import { postImgUpload ,changePhoneNumber} from "../helper/adminHelper.js";
const adminControllers = {
  //admin Login
  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const isEmailExist = await isAdminExist(email);
      if (isEmailExist !== null) {
        const salt = await bcrypt.genSalt(10);

        const comparePassword = await bcrypt.compare(
          password,
          isEmailExist.password
        );
        if (comparePassword === true) {
          const jwtToken = await generateToken(isEmailExist._id);

          isEmailExist.password = "";
          const adminData = {
            status: "success",
            message: "Login successfull",
            admin: isEmailExist,
            token: jwtToken,
          };

          res.json(adminData);
        } else {
          const adminData = {
            status: "failed",
            message: "Password Is Incorrect",

            token: "",
          };

          res.json(adminData);
        }
      } else {
        res.json({
          status: "error",
          message: "Email already exists",
        });
      }
    } catch (error) {
      console.log("Error in controllers", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
        user: {},
        token: "",
      });
    }
  },

  getuser: async (req, res) => {
    try {
      const response = await getUserList();
      res.json(response);
    } catch (error) {
      console.log(error);
    }
  },
  imgFilesUpload: async (req, res) => {
    try {
      const userId = req.body.id;

      const files = req.files;
      await postImgUpload(userId, files);

      res.json({ status: true });
    } catch (error) {
      console.log(error);
    }
  },
  //getAdmin
  getAdmin: async (req, res) => {
    try {
      const response = await getAdminDetails();
      res.json(response);
    } catch (error) {
      throw error;
    }
  },
  //profileImgUpload
  profileImgUpload: async (req, res) => {
    try {
      await uploadDp(req.file.path);
      res.json({ status: true });
    } catch (error) {
      throw error;
    }
  },
  //changePassword
  changePassword: async (req, res) => {
    try {
      const { currentpassword, conformPassword } = req.body;
      const admin = await isAdminGet();
      if (admin) {
        const comparePassword = await bcrypt.compare(
          currentpassword,
          admin.password
        );
        if (comparePassword) {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(conformPassword, salt);
          const response = await updatePassword(hashPassword);

          if (response) {
            res.json({ status: true });
          }
        } else {
          res.json({ status: false });
        }
      }
    } catch (error) {
      throw error;
    }
  },
  //changeNumber
  changeNumber :async(req,res)=>{
    try {
      
      const response = await changePhoneNumber(req.body.phonenumber)
      if(response){
        res.json({ status: true });
      }
    } catch (error) {
      throw error; 
    }
  }
};

export default adminControllers;
