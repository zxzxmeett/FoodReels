const mongoose = require('mongoose');

const saveSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "userModel"
    },

    userModel: {
        type: String,
        required: true,
        enum: ["user", "foodPartner"]
    },

    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food',
        required: true
    }
    
}, {
    timestamps: true
})

const saveModel = mongoose.model('save', saveSchema);

module.exports = saveModel;