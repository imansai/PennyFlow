const mongoose = require('mongoose')

const budgetSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required:  true,
            ref: 'User'
        },
        name: {
            type: String,
            required: [true, 'Please add a name value']
        },
        amount: {
            type: Number,
            required: [true, 'Please add an amount value'],
        },
        description: {
            type: String,
            required: false,
        },
        startDate: {
            type: Date,
            default: Date.now,
            required: [true, 'Please add a start date'],
        },
        endDate: {
            type: Date,
            required: [true, 'Please add an end date'],
        },
        status: {
            type: String,
            default: 'Active',
            enum: ['Active', 'Inactive'],
            required: false,
        }
    },
    {
        timestamps: true,
    }
    )
module.exports = mongoose.model('Budget',budgetSchema)