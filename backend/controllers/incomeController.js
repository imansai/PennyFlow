const asyncHandler = require('express-async-handler')

const Income = require('../models/incomeModel')
const User = require('../models/userModel')

// @desc Get incomes
// @route GET /api/incomes
// @access Private
const getIncomes = asyncHandler(async (req, res) => {
    const incomes = await Income.find({ user: req.user.id})
    
    res.status(200).json(incomes)
})

// @desc Create income
// @route POST /api/incomes
// @access Private
const setIncome = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error('Please add valid name')
    }
    const income = await Income.create({
        name: req.body.name,
        amount: req.body.amount,
        description: req.body.description,
        date: req.body.date, 
        user: req.user.id,
    })
    res.status(200).json(income)
})

// @desc Update income
// @route PUT /api/incomes/:id
// @access Private
const updateIncome = asyncHandler(async (req, res) => {
    const income = await Income.findById(req.params.id)

    if(!income) {
        res.status(400)
        throw new Error('Income not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Make sure logged in user matches the income user
    if(income.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedIncome = await Income.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedIncome)
})

// @desc Delete income
// @route DELETE /api/incomes/:id
// @access Private
const deleteIncome = asyncHandler(async (req, res) => {
    const income = await Income.findById(req.params.id)

    if(!income) {
        res.status(400)
        throw new Error('Income not found')
    }


    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Make sure logged in user matches the income user
    if(income.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await income.deleteOne()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getIncomes,
    setIncome,
    updateIncome,
    deleteIncome,
}