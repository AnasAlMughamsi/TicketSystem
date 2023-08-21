import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },

    description: {
        type: String, 
        required: true
    },

    createAt: {
        type: Date,
        default: new Date()
    }
});

const myDb = mongoose.connection.useDb("TicketSystem");
// const UserInfo = myDB.model('userInfo', userInfoSchema);

const TicketModel = myDb.model("Ticket", ticketSchema);
export default TicketModel;