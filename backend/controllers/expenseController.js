const asyncHandler = require('express-async-handler')

const Expense = require('../models/expenseModel')

// @desc Get expenses
// @route GET /api/expenses
// @access Private
const getExpenses = asyncHandler(async (req, res) => {
    const expenses = await Expense.find()
    res.status(200).json(expenses)
})

// @desc Create expense
// @route POST /api/expenses
// @access Private
const setExpense = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error('Please add valid name')
    }
    const expense = await Expense.create({
        name: req.body.name,
        amount: req.body.amount,
        description: req.body.description,
        date: req.body.date, 
    })
    res.status(200).json(expense)
})

// @desc Update expense
// @route PUT /api/expenses/:id
// @access Private
const updateExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id)

    if(!expense) {
        res.status(400)
        throw new Error('Expense not found')
    }
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedExpense)
})

// @desc Delete expense
// @route DELETE /api/expenses/:id
// @access Private
const deleteExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id)

    if(!expense) {
        res.status(400)
        throw new Error('Expense not found')
    }
    await expense.deleteOne()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getExpenses,
    setExpense,
    updateExpense,
    deleteExpense,
}