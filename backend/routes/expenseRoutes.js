const express = require('express')
const router = express.Router()
const { 
    getExpenses, 
    setExpense, 
    updateExpense, 
    deleteExpense, 
} = require('../controllers/expenseController')

router.route('/').get(getExpenses).post(setExpense)
router.route('/:id').put(updateExpense).delete(deleteExpense)

module.exports = router