import { useDispatch } from "react-redux"
import { deleteIncome } from '../features/incomes/incomeSlice'
import {FaShoppingBasket, FaTrashAlt} from 'react-icons/fa'

function IncomeItem({income}) {
    const dispatch = useDispatch()
    const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(income.amount);
    return (
    <div>
      <div>
        <FaShoppingBasket />
      </div>
      <div>
        <p>{income.name}</p>
        <p>{new Date(income.createdAt).toLocaleString('en-US', {year: "numeric", month: "numeric", day: "numeric"})}</p>
      </div>
      <div>
        <p><span style={{ color: '#2ecc71' }}>+{formattedAmount}</span></p>
        <button onClick={() => dispatch(deleteIncome(income._id))}><FaTrashAlt/></button>
      </div>
        
        
    </div>
  )
}

export default IncomeItem