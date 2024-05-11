const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, 'Please add a message']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
},
{
    timestamps: true
})

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;