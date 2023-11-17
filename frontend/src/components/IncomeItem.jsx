import { useDispatch } from "react-redux"
import { deleteIncome } from '../features/incomes/incomeSlice'

function IncomeItem({income}) {
    const dispatch = useDispatch()
    const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(income.amount);
    return (
    <div className="income">
        <div>{new Date(income.createdAt).toLocaleString('en-US')}</div>
        <h2 >{income.name}</h2>
        <p><span style={{ color: 'green' }}>+{formattedAmount}</span></p>
        <p >{income.description}</p>
        <button onClick={() => dispatch(deleteIncome(income._id))} className="close">X</button>
    </div>
  )
}

export default IncomeItem