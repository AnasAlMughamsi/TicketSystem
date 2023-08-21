import express from "express";
import { 
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/user"

const router = express.Router();

router.get('/all', getAllUsers);
router.get('/:id', getUserById);
router.post('/add', createUser);
router.patch('/:id/update', updateUser);
router.delete('/:id/delete', deleteUser);


export default router;