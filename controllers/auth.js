import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import users from "../models/authModel.js";

export const signup= async (req,res)=> {

    const {name, email, password}= req.body;

    try {
        const existingUser= await users.findOne({email});
        if(existingUser)
        {
            console.log(existingUser);
          return res.status(404).json({message: "User already existed"});
          
        }

        const hashedPassword= await bcrypt.hash(password,12);
        const newUser= await users.create({name, email, password: hashedPassword});
        const token= jwt.sign({email: newUser.email, id: newUser._id},"test",{expiresIn: '1hr'});
        res.status(200).json({result: newUser, token})
    }
    catch(err) {
        res.status(500).json("Something went wrong");
    }
}

export const login= async (req,res)=> {

    const {email, password}= req.body;

    try {
        const userExists= await users.findOne({email});
        if(!userExists)
        {
            return res.status(404).json({message: "User don't exist"});
        }
        const isPassword= await bcrypt.compare(password,userExists.password);
        if(!isPassword)
        {
            return res.status(400).json({message: "Invalid Credentials"})
        }

        const token= jwt.sign({email: newUser.email, id: newUser._id},"test", {expiresIn: "1hr"})
    }
    catch(err) {
          res.status(500).json("SOmething went wrong");
    }

}