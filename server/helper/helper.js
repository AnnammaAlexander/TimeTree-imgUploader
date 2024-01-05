import mongoose from "mongoose";
import { configKeys } from "../config/configKey.js";
import ProjectImg from "../model/schema/projectImgSchema.js";
import User from "../model/schema/userschema.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

//check the user is exist or not
export const isuserExist = async (email) => {
  try {
    const response = await User.findOne({ email: email });

    return response;
  } catch (error) {
    console.log("error in helpers", error);
  }
};

//signup user
export const signup = async (name, email, password, phonenumber) => {
  try {
    const user = {
      name,
      email,
      password,
      phonenumber,
    };
    const newUser = await new User(user);
    return await newUser.save();
  } catch (error) {
    console.log(error);
  }
};

//Generates a JWT token for the provided user ID
export const generateToken = async (userId) => {
  try {
    // Check if the JWT token key is defined in your configuration
    if (configKeys?.jwtTokenKey) {
      // Sign the token with the user ID and the JWT token key
      const token = jwt.sign({ userId }, configKeys.jwtTokenKey, {
        expiresIn: "5d", // Token expiration time (5 days in this example)
      });

      // Return the generated token

      return token;
    } else {
      // Throw an error if the JWT_TOKEN_KEY is not defined
      throw new Error("JWT_TOKEN_KEY is undefined");
    }
  } catch (error) {
    // Handle any errors that occur during token generation
    console.error("Error generating token:", error);
    throw error;
  }
};

//verify token
export const verifyToken = (token) => {
  try {
    if (configKeys.jwtTokenKey) {
      const verification = jwt.verify(token, configKeys.jwtTokenKey);
      if (verification.exp != undefined) {
        const CurrentTime = Math.floor(Date.now() / 1000);
        if (verification.exp >= CurrentTime) {
          return true;
        } else {
          return false;
        }
      } else {
        return undefined;
      }
    }
  } catch (error) {}
};
//getProjectData
export const getProjectData = async (id) => {
  try {
    return await ProjectImg.find({ userId: id });
    // console.log("................",response);
  } catch (error) {
    throw error;
  }
};
//projectSave
export const projectSave = async ({
  _id,
  shippingArea,
  brand,
  entryDate,
  time,
  warranty,
  shippingTimeframe,
  productRating,
  dateSubmittedForReview,
  material,
  productType,
  globalRating,
}) => {
  try {
    const response = await ProjectImg.updateOne(
      { _id },
      {
        $set: {
          shippingArea,
          brand,
          entryDate,
          time,
          warranty,
          shippingTimeframe,
          productRating,
          dateSubmittedForReview,
          material,
          productType,
          globalRating,
          isSaved: true,
        },
      }
    );
    if (response.modifiedCount === 1) {
      return true;
    }
  } catch (error) {
    throw error;
  }
};
//getUserDetails
export const getUserDetails = async (id) => {
  try {
    // const _id = new mongoose.Types.ObjectId(id)
    const response = await User.findOne({ _id: id });
    response.password = "";
    return response;
  } catch (error) {
    throw error;
  }
};
//find user
export const isUserget = async (_id) => {
  try {
    const response = await User.findOne({ _id });
    if (response) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};
//updateUserPassword
export const updateUserPassword = async (hashPassword, _id) => {
  try {
    const response = await User.updateOne(
      { _id },
      { $set: { password: hashPassword } }
    );
    if (response.modifiedCount === 1) {
      return true;
    }
  } catch (error) {
    throw error;
  }
};
//uploadUserDp
export const uploadUserDp = async (img, id) => {
  try {
    const response = await User.updateOne({ _id: id }, { $set: { dp: img } });
    console.log(response);
    if (response.modifiedCount == 1) {
      return true;
    }
  } catch (error) {
    throw error;
  }
};
//updatePhoneNumber
export const updatePhoneNumber = async (_id, phonenumber) => {
  try {
    const response = await User.updateOne({ _id }, { $set: { phonenumber } });
    if (response.modifiedCount) {
      return true;
    }
  } catch (error) {
    throw error;
  }
};
