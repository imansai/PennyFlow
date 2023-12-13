import { useDispatch } from "react-redux"
import { deleteExpense } from '../features/expenses/expenseSlice'
import { FaShoppingBasket,
  FaHome,
  FaBolt,
  FaCouch,
  FaUtensils,
  FaCar,
  FaChartLine,
  FaPiggyBank,
  FaMoneyCheckAlt,
  FaHeartbeat,
  FaFilm,
  FaShoppingBag,
  FaPlane,
  FaUser,
  FaGift,
  FaGraduationCap,
  FaEllipsisH } from 'react-icons/fa'


function ExpenseItem({ expense }) {
    const dispatch = useDispatch()
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(expense.amount);
    const categoryIcons = {
      'Uncategorized': FaShoppingBasket,
      'Housing': FaHome,
      'Utilities': FaBolt,
      'Household Items': FaCouch,
      'Food': FaUtensils,
      'Transportation': FaCar,
      'Investments': FaChartLine,
      'Savings': FaPiggyBank,
      'Debt': FaMoneyCheckAlt,
      'Health & Fitness': FaHeartbeat,
      'Entertainment': FaFilm,
      'Shopping': FaShoppingBag,
      'Travel': FaPlane,
      'Personal Care': FaUser,
      'Gifts & Donations': FaGift,
      'Education': FaGraduationCap,
      'Miscellaneous': FaEllipsisH
    };
    const ExpenseIcon = categoryIcons[expense.category] || FaShoppingBasket;
    const maxCharacters = 20;
    const truncatedName = expense.name.length > maxCharacters ? `${expense.name.substring(0, maxCharacters)}...` : expense.name;

    return (
    <div className="expense-item">
      <button className="closed" onClick={() => dispatch(deleteExpense(expense._id))}>
        X
      </button>
      <div className="icon">
      <ExpenseIcon />
      </div>
      
      <div className="data">
        <div className="left">
          <div className="text">
            <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{truncatedName}</p>
            <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{expense.description}</p>
          </div>
          
        </div>
        <div className="right">
          <div className="numbers">
            <p><span style={{ color: 'red' }}>{formattedAmount}</span></p>
            <p>{new Date(expense.date).toLocaleString('en-US', {year: "numeric", month: "numeric", day: "numeric"})}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpenseItem