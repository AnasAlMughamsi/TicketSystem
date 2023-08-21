import mongoose from "mongoose"
import { Request, Response } from "express";
import TicketModel from "../models/Tickets";


export const getAllTickets = async (req: Request, res: Response) => {
    try {
        const allTickets = await TicketModel.find();
        if(allTickets.length === 0) {
         res.send("No tickets avaliable")   
        } 
        res.status(200).json(allTickets);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getTicketById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const ticket = await TicketModel.findById(id);
        res.status(200).json(ticket);
    } catch (error) {
        res.status(404).json({message: "Ticket id doesn't exist"})
    }
}

export const createTicket = async (req: Request, res: Response) => {
    const ticket = req.body;
    const newTicket = new TicketModel(ticket);
    try {
        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

// update ticket

export const updateTicket = async (req: Request, res: Response) => {
    const { id } = req.params;
    if(!id) return res.status(400).send("Ticket id doesn't exist");
    const ticket = req.body;
    const updateTicket = await TicketModel.findByIdAndUpdate(id, ticket, {new: true})
    // try {
        
    // } catch (error) {
    //     res.status(404).json({message: error.message})
    // }
    res.json(updateTicket);
}

export const deleteTicket = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await TicketModel.findByIdAndDelete(id);
        res.status(201).send("Ticket deleted!");
    } catch (error) {
        res.status(404).json({message: "Ticket id doesn't exist"})
    }
}