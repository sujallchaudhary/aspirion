const User = require('../models/userModel');

const fetchUser = async (req, res) => {
    try {
        const users = await User.find({role:"user"});
        if(!users){
            return res.status(404).json({success:false,status:404,message:"No users found",data:null});
        }
        users.map(user=>user.password=undefined);
        return res.status(200).json({success:true,status:200,message:"Users fetched successfully",data:users});
        
    } catch (error) {
        return res.status(500).json({success:false,status:500,message:error,data:null});
    }
};

const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id,req.body,{new:true});
        if(!user){
            return res.status(404).json({success:false,status:404,message:"User not found",data:null});
        }
        user.password = undefined;
        return res.status(200).json({success:true,status:200,message:"User updated successfully",data:user});
    } catch (error) {
        return res.status(500).json({success:false,status:500,message:error,data:null});
    }
}

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({success:false,status:404,message:"User not found",data:null});
        }
        user.password = undefined;
        return res.status(200).json({success:true,status:200,message:"User deleted successfully",data:user});
    } catch (error) {
        return res.status(500).json({success:false,status:500,message:error,data:null});
    }
}

module.exports = { fetchUser, deleteUser, updateUser };