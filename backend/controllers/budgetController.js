const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Budget = require('../models/budgetModel');

// @desc Get budgets
// @route GET /api/budgets
// @access Private
const getBudgets = asyncHandler(async (req, res) => {
    const budgets = await Budget.find({ user: req.user.id})
    
    res.status(200).json(budgets)
})

// @desc Create budget
// @route POST /api/budgets
// @access Private
const setBudget = asyncHandler(async (req, res) => {
    if (!req.body.name || !req.body.amount || !req.body.startDate || !req.body.endDate) {
        res.status(400)
        throw new Error('Please add all required fields')
    }
    const budget = await Budget.create({
        name: req.body.name,
        amount: req.body.amount,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: req.body.status, 
        user: req.user.id,
    })
    res.status(200).json(budget)
})

// @desc Update budget
// @route PUT /api/budgets/:id
// @access Private
const updateBudget = asyncHandler(async (req, res) => {
    const budget = await Budget.findById(req.params.id)

    if(!budget) {
        res.status(400)
        throw new Error('Budget not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Make sure logged in user matches the budget user
    if(budget.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedBudget = await Budget.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedBudget)
})

// @desc Delete budget
// @route DELETE /api/budgets/:id
// @access Private
const deleteBudget = asyncHandler(async (req, res) => {
    const budget = await Budget.findById(req.params.id)

    if(!budget) {
        res.status(400)
        throw new Error('Budget not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Make sure logged in user matches the budget user
    if(budget.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await budget.deleteOne()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getBudgets,
    setBudget,
    updateBudget,
    deleteBudget,
} 