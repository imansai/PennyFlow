import { useDispatch } from "react-redux"
import { deleteIncome } from '../features/incomes/incomeSlice'
import {FaTrashAlt} from 'react-icons/fa'

function IncomeItem({income}) {
    const dispatch = useDispatch()
    const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(income.amount);
    return (
    <div className="income">
        <p>{income.name}</p>
        <p><span style={{ color: '#2ecc71' }}>+{formattedAmount}</span></p>
        <p>{new Date(income.createdAt).toLocaleString('en-US')}</p>
        <button onClick={() => dispatch(deleteIncome(income._id))} className="close"><FaTrashAlt/></button>
    </div>
  )
}

export default IncomeItem