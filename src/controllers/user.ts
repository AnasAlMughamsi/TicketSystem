import mongoose from "mongoose"
import { Request, Response } from "express";
import UserModel from "../models/User";

const fineEmail = () => {

};


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await UserModel.find();
        if(allUsers.length === 0 ) {
            res.send("No users  avaliable")
        };
        res.status(200).json(allUsers);

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getUserById =async (req:Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: "Ticket id doesn't exist"})
    }
}

export const createUser = async (req: Request, res: Response) => {
    const user = req.body;
    // valiation of email if it is exist.
    const { email } = req.body;
    UserModel.findOne({email: email}).then(user => {
        if(user) {
            res.status(404).json({message: "Email already exist"})
            
        }
    })
    const newUser = new UserModel(user);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id}  = req.params;
    const { email } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No user with that id")
    }
    
    UserModel.findOne({email: email}).then(user => {
        if(user) {
            return res.status(404).json({message: "Email already exist"}) 
        }
    })

    const user = req.body;
    try {
        await UserModel.findByIdAndUpdate(id, user, {new: true});
        res.status(200).json({message: "user updated"})
    } catch (error) {
        res.status(404).json({message: error.message})
    }

    res.json(updateUser);
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await UserModel.findByIdAndDelete(id);
        res.status(201).send("User deleted!");
    } catch (error) {
        res.status(404).json({message: "User id doesn't exist"})
    }
}