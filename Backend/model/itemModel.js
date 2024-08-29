const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    userName: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    schedules: {
        type: [
            {
                frequency: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
                startDate: {
                    type: Date,
                    required: true
                },
                endDate: {
                    type: Date
                }
            }
        ],
    
    }
});


module.exports = mongoose.model("items", ItemSchema);
