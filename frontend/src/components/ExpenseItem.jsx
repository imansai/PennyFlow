import { useDispatch } from "react-redux"
import { deleteExpense } from '../features/expenses/expenseSlice'

function ExpenseItem({expense}) {
    const dispatch = useDispatch()
    const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(expense.amount);

    return (
    <div className="expense">
        <div>{new Date(expense.createdAt).toLocaleString('en-US')}</div>
        <h2>{expense.name}</h2>
        <p><span style={{ color: 'red' }}>{formattedAmount}</span></p>
        <p>{expense.description}</p>
        <button onClick={() => dispatch(deleteExpense(expense._id))} className="close">X</button>
    </div>
  )
}

export default ExpenseItem