const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name value']
        },
        amount: {
            type: Number,
            required: [true, 'Please add an amount value']
        },
        description: {
            type: String,
            required: false,
        },
        date: {
            type: Date,
            default: Date.now,
            required: false,
        }
    },
    {
        timestamps: true,
    }
    )
module.exports = mongoose.model('Expense',expenseSchema)