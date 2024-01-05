import bcrypt from "bcryptjs";
import {
  isuserExist,
  signup,
  generateToken,
  getProjectData,
  projectSave,
  getUserDetails,
  isUserget,
  updateUserPassword,
  uploadUserDp,
  updatePhoneNumber,
} from "../helper/helper.js";
const controllers = {
  //regidter user
  signup: async (req, res) => {
    try {
      const { name, email, password, phonenumber } = req.body;
      const isEmailExist = await isuserExist(email);
      if (isEmailExist === null) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const response = await signup(name, email, hashPassword, phonenumber);

        if (response) {
          const jwtToken = await generateToken(response._id);
          response.password = "";
          const userData = {
            status: "success",
            message: "Registration Successful",
            user: response,
            token: jwtToken,
          };
          res.json(userData);
        } else {
          throw new Error("Signup failed.");
        }
      } else {
        // Handle the case where isEmailExist is not null
        res.json({
          status: "error",
          message: "Email already exists",
        });
      }
    } catch (error) {
      console.log("error in contrllers", error);
    }
  },

  //user Login
  UserLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const isEmailExist = await isuserExist(email);
      if (isEmailExist !== null) {
        //  const salt = await bcrypt.genSalt(10)

        const comparePassword = await bcrypt.compare(
          password,
          isEmailExist.password
        );
        if (comparePassword === true) {
          const jwtToken = await generateToken(isEmailExist._id);

          isEmailExist.password = "";
          const userData = {
            status: "success",
            message: "Login successfull",
            user: isEmailExist,
            token: jwtToken,
          };
          console.log("Login successfull.....", userData);

          res.json(userData);
        } else {
          const userData = {
            status: "failed",
            message: "Password Is Incorrect",
          };
          res.json(userData);
        }
      } else {
        res.json({
          status: "error",
          message: "Email does not exists",
        });
      }
    } catch (error) {
      console.log("Error in controllers", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  },

  //get all data
  getAllData: async (req, res) => {
    try {
      const id = req.params.id;

      const response = await getProjectData(id);

      res.json(response);
    } catch (error) {}
  },
  //saveproject
  saveproject: async (req, res) => {
    try {
      const data = req.body;
      const response = await projectSave({ ...data });
      res.json({ status: true });
    } catch (error) {
      throw error;
    }
  },
  //getUserData
  getUserData: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await getUserDetails(id);

      res.json(response);
    } catch (error) {
      console.log("error in contrllers", error);
    }
  },
  //changeUserPassword
  changeUserPassword: async (req, res) => {
    try {
      const { currentpassword, conformPassword, _id } = req.body;
      const user = await isUserget(_id);
      if (user) {
        const comparePassword = await bcrypt.compare(
          currentpassword,
          user.password
        );
        if (comparePassword) {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(conformPassword, salt);
          const response = await updateUserPassword(hashPassword, _id);

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
  //profileImgUpload
  profileImgUpload: async (req, res) => {
    try {
      const response = await uploadUserDp(req.file.path, req.body.id);
      if (response) {
        res.json({ status: true });
      }
    } catch (error) {}
  },
  //changeUserNumber
  changeUserNumber: async (req, res) => {
    try {
      
      const response = await updatePhoneNumber(req.body._id,req.body.phonenumber,);
      if (response) {
        res.json({ status: true });
      }
    } catch (error) {
      throw error;
    }
  },
};

export default controllers;
