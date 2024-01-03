import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";


const generateAccessAndRefreshTokens = async (userId) => {
    try{
         
         const user = await User.findOne(userId);
         console.log(user);
         console.log(1) 
         const accessToken = await user.generateAccessToken();
         console.log(2)
         const refreshToken = await user.generateRefreshToken();
         console.log(3)
         user.refreshToken = refreshToken;
         console.log(4)
         await user.save({validateBeforeSave:false});
         console.log(5)
         return {accessToken,refreshToken};

    }catch(error){
         throw new ApiError(500, "Something went wrong while generating referesh and access token");
    }
}

const registerUser = asyncHandler(async(req,res) =>{

    const {name,email,location,password} = req.body;
    console.log(req.body.email);

    if([name,email,location,password].some((field) => (field === undefined || field === null || field.trim() === ""))){
        throw new ApiError(400, "All fields are requirred");
    }

    const existedUser = await User.findOne({email});

    if(existedUser){
        throw new ApiError(409, "User with this email already exist");
    }

    const user = await User.create({
        name,
        email,
        location,
        password
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
});

const loginUser = asyncHandler(async(req,res) =>{

    const {email,password} = req.body;

    if(!email){
        throw new ApiError(400,"email is required for login");
    }

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(400, "user with this email does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid password");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const options = {
        httpOnly: true,
        secure : true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user : loggedInUser, accessToken, refreshToken
            },
            "user logged in successfully"
        )
    );
});

export {
registerUser,
loginUser
}

// import express from "express"
// import {Router} from "express";
// const router = Router();

// const User = require("../models/user.model");
// const { body, validationResult } = require("express-validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const jwtSecret = "MynameisAbhishekChoudharyfromroo";
// router.post(
//   "/createuser",
//   [
//     body("email").isEmail(),
//     body("name").isLength({ min: 5 }),
//     body("password").isLength({ min: 5 }),
//     body("location").isLength({ min: 5 }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const secPassword = await bcrypt.hash(req.body.password, salt);
//     try {
//       let email = req.body.email;
//       let userData = await User.findOne({ email });

//       if (userData) {
//         return res
//           .status(400)
//           .json({
//             errors:
//               "Email is already registered, Try using with different email",
//           });
//       } else {
//         await User.create({
//           name: req.body.name,
//           password: secPassword,
//           email: email,
//           location: req.body.location,
//         });

//         return res.json({ success: true });
//       }
//     } catch (err) {
//       console.log(err);
//       res.json({ success: false });
//     }
//   }
// );

// router.post(
//   "/loginuser",
//   [body("email").isEmail(), body("password").isLength({ min: 5 })],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     let email = req.body.email;
//     try {
//       let userData = await User.findOne({ email });

//       if (!userData) {
//         return res
//           .status(400)
//           .json({ errors: "Try logging with correct credentials" });
//       }
//       const pwdCompare = await bcrypt.compare(
//         req.body.password,
//         userData.password
//       );
//       if (!pwdCompare) {
//         return res
//           .status(400)
//           .json({ errors: "Try logging with correct credentials" });
//       }

//       const data = {
//         user: {
//           id: userData.id,
//         },
//       };

//       const authToken = jwt.sign(data, jwtSecret);
//       return res.json({ success: true, authToken: authToken });
//     } catch (err) {
//       console.log(err);
//       res.json({ success: false });
//     }
//   }
// );

// export default router;
