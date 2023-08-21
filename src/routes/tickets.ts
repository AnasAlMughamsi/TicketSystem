import express from "express";
import { 
    getAllTickets, 
    getTicketById,  
    createTicket, 
    updateTicket,
    deleteTicket
} from "../controllers/tickets"

const router = express.Router();

router.get('/all', getAllTickets);
router.get('/:id', getTicketById);
router.post('/add', createTicket);
router.patch('/:id/update', updateTicket);
router.delete('/:id/delete', deleteTicket);


export default router;