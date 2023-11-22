
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getExpenses, reset as resetExpenses } from '../features/expenses/expenseSlice'
import { getIncomes, reset as resetIncomes } from '../features/incomes/incomeSlice'
import ExpenseForm from '../components/ExpenseForm'
import IncomeForm from '../components/IncomeForm'
import Transactions from '../components/Transactions'
import { useTotalExpenses, useTotalIncomes, useTotalBalance } from '../components/Summary'
import { FaChartPie, FaExchangeAlt, FaMoneyBillAlt, FaUserAlt } from 'react-icons/fa'
import { MdInsights } from "react-icons/md";


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { isError: expensesError, message: expensesMessage } = useSelector((state) => state.expenses);
  const { isError: incomesError, message: incomesMessage } = useSelector((state) => state.incomes);

  useEffect(() => {
    if(expensesError || incomesError) {
      return (
        <div>
          <h2>Error</h2>
          <p>There was an error loading data. Please try again later.</p>
          <p>{expensesError && `Expenses Error: ${expensesMessage}`}</p>
          <p>{incomesError && `Incomes Error: ${incomesMessage}`}</p>
        </div>
      );
    }

    if(!user) {
      navigate('/login')
    } else {
      dispatch(getExpenses());
      dispatch(getIncomes());
    }

    return () => {
      dispatch(resetExpenses())
      dispatch(resetIncomes())
    }
  }, [user, navigate, expensesError, incomesError, expensesMessage, incomesMessage, dispatch])


  return (
  <>
  <div className='main'>
    <div className="main-sidebar">
      <button className='sidebar-element user'>
       <p className='accent'><FaUserAlt/></p>
        <p>Hi {user && user.name}!</p>
      </button>
      <button className='sidebar-element'>
        <p className='accent'><FaChartPie/></p>
        <p>Overview</p>
      </button>
      <button className='sidebar-element'>
        <p className='accent'><FaExchangeAlt/></p>
        <p>Transactions</p>
      </button>
      <button className='sidebar-element'>
        <p className='accent'><FaMoneyBillAlt/></p>
        <p>Budget</p>
      </button>
    </div>
    <div className="main-content">
      <div className='cards summary'>
        <p>Balance</p> 
        <h4>{useTotalBalance()}</h4>
        <h4 className='accent'><MdInsights /></h4>
      </div>
      <div className="cards summary">
        <p>Expenses</p> 
        <h4>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(useTotalExpenses())}</h4>
        <h4 className='accent'><MdInsights /></h4>
      </div>
      <div className="cards summary">
        <p>Incomes</p> 
        <h4>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(useTotalIncomes())}</h4>
        <h4 className='accent'><MdInsights /></h4>
      </div>
      <div className="cards">
        <h5>Graph</h5>
      </div>
      <div className="cards new">
        <IncomeForm/> 
        <ExpenseForm/>
        </div>
      <div className="cards">
        <h5>Recent transactions</h5>
        <Transactions/>
        </div>
      <div className="cards">
        <h5>Top categories</h5>
      </div>
    </div>
  </div>
  </>
  )
}

export default Dashboard