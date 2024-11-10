const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
require('dotenv').config();

const register = async (req, res) => {
    try{
        const {name,email,password,role}=req.body;
        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.status(400).json({success:false,status:400,message:"User already exists",data:null});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({name,email,password:hashedPassword,role});
        const token = jsonWebToken.sign({email:user.email,role:user.role,_id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
        user.password = undefined;
        return res.status(201).json({success:true,status:201,message:"User created successfully",data:user,token});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,status:500,message:error,data:null});
    }
};

const login = async (req, res) => {
    try {
        const {email,password}=req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false,status:400,message:"User not found",data:null});
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({success:false,status:400,message:"Invalid password",data:null});
        }
        const token = jsonWebToken.sign({email:user.email,role:user.role,_id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
        user.password = undefined;
        return res.status(200).json({success:true,status:200,message:"User logged in successfully",data:user,token});
        
    } catch (error) {
        return res.status(200).json({success:false,status:200,message:error,data:null});
        
    }
};

module.exports = { register, login };