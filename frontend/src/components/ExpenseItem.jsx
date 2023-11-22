import { useDispatch } from "react-redux"
import { deleteExpense } from '../features/expenses/expenseSlice'
import { FaTrashAlt } from 'react-icons/fa'


function ExpenseItem({expense}) {
    const dispatch = useDispatch()
    const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(expense.amount);

    return (
    <div className="expense">
      <p>{expense.name}</p>
      <p><span style={{ color: 'red' }}>{formattedAmount}</span></p>
      <p>{new Date(expense.createdAt).toLocaleString('en-US')}</p>
      <button onClick={() => dispatch(deleteExpense(expense._id))} className="close"><FaTrashAlt/></button>
    </div>
  )
}

export default ExpenseItem