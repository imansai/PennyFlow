import { useDispatch } from "react-redux"
import { deleteExpense } from '../features/expenses/expenseSlice'
import { FaTrashAlt, FaShoppingBasket } from 'react-icons/fa'


function ExpenseItem({expense}) {
    const dispatch = useDispatch()
    const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(expense.amount);

    return (
    <div>
      <div>
        <FaShoppingBasket />
      </div>
      <div>
        <p>{expense.name}</p>
        <p>{new Date(expense.createdAt).toLocaleString('en-US', {year: "numeric", month: "numeric", day: "numeric"})}</p>
      </div>
      <div>
        <p><span style={{ color: 'red' }}>{formattedAmount}</span></p>
        <button onClick={() => dispatch(deleteExpense(expense._id))}><FaTrashAlt/></button>
      </div>
    </div>
  )
}

export default ExpenseItem