import { useDispatch } from "react-redux"
import { deleteIncome } from '../features/incomes/incomeSlice'
import { FaDollarSign } from 'react-icons/fa'

function IncomeItem({income}) {
    const dispatch = useDispatch()
    const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(income.amount);
    const maxCharacters = 20;
    const truncatedName = income.name.length > maxCharacters ? `${income.name.substring(0, maxCharacters)}...` : income.name;

    return (
    <div className="income-item">
      <div className="icon">
        <FaDollarSign />
      </div>
      <div className="data">
        <div className="left">
        <div className="text">
            <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{truncatedName}</p>
            <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{income.description}</p>
          </div>          
        </div>
        <div className="right">
          <div className="numbers">
            <p><span style={{ color: '#2ecc71' }}>+{formattedAmount}</span></p>
            <p>{new Date(income.date).toLocaleString('en-US', {year: "numeric", month: "numeric", day: "numeric"})}</p>
          </div>
          <button className="closed"  onClick={() => dispatch(deleteIncome(income._id))}>
            X
          </button>
        </div>
      </div>  
    </div>
  )
}

export default IncomeItem