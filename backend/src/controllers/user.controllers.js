import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";


const generateAccessAndRefreshTokens = async (userId) => {
    try{
         
         const user = await User.findOne(userId);
         
         const accessToken = await user.generateAccessToken();
         
         const refreshToken = await user.generateRefreshToken();
         
         user.refreshToken = refreshToken;
         await user.save({validateBeforeSave:false});
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

