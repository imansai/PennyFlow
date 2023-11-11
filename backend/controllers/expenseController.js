const asyncHandler = require('express-async-handler')

// @desc Get expenses
// @route GET /api/expenses
// @access Private
const getExpenses = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get expenses' })
})

// @desc Create expense
// @route POST /api/expenses
// @access Private
const setExpense = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    res.status(200).json({ message: 'Create expense' })
})

// @desc Update expense
// @route PUT /api/expenses/:id
// @access Private
const updateExpense = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update expense ${req.params.id}` })
})

// @desc Delete expense
// @route DELETE /api/expenses/:id
// @access Private
const deleteExpense = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete expense ${req.params.id}` })
})

module.exports = {
    getExpenses,
    setExpense,
    updateExpense,
    deleteExpense,
}