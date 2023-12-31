const mongoose = require('mongoose')

const expenseCategories = [
    'Housing',
    'Utilities',
    'Household Items',
    'Food',
    'Transportation',
    'Investments',
    'Savings',
    'Debt',
    'Health & Fitness',
    'Entertainment',
    'Shopping',
    'Travel',
    'Personal Care',
    'Gifts & Donations',
    'Education',
    'Miscellaneous',
    'Uncategorized',
  ];

const expenseSchema = mongoose.Schema(
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
        },
        category: {
            type: String,
            default: 'Uncategorized',
            required: [true, 'Please choose a category'],
            enum: expenseCategories,
        }
    },
    {
        timestamps: true,
    }
    )
module.exports = mongoose.model('Expense',expenseSchema)