
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getExpenses, reset as resetExpenses } from '../features/expenses/expenseSlice'
import { getIncomes, reset as resetIncomes } from '../features/incomes/incomeSlice'
import { useTotalExpenses, useTotalIncomes, useTotalBalance, useTotalSavings } from '../components/Summary'
import Sidebar from '../components/Sidebar'
import ExpenseChart from '../components/ExpenseChart'
import CategoriesDonut from '../components/CategoriesDonut'
import { FaPlus, FaMinus, FaPiggyBank, FaCreditCard } from 'react-icons/fa'
import Transactions from '../components/Transactions'
import FormSelector from '../components/AddNew'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { expenses, isError: expensesError, message: expensesMessage } = useSelector((state) => state.expenses);
  const { incomes, isError: incomesError, message: incomesMessage } = useSelector((state) => state.incomes);



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
    <Sidebar/>
    <div className="content">

      <div className="kpi">
        <div className="summary-container">
          <div className="welcome">
            <h4>Hi {user && user.name}!</h4>
            <div>
              <FormSelector/>
              
            </div>
          </div>
          <div className="summary">
            <div className="balance-data">
              <div className="icon"><FaCreditCard/></div>
              <div className='data'>
                <p>Balance</p> 
                <h5>{useTotalBalance()}</h5>
              </div>
            </div>

            <div className="expenses-data">
              <div className="icon"><FaMinus/></div>
              <div className="data">
                <p>Expenses</p>
                <h5>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', minimumFractionDigits: 2 }).format(useTotalExpenses())}</h5>
              </div>
            </div>

            <div className="incomes-data">
              <div className="icon"><FaPlus/></div>
              <div className="data">
                <p>Incomes</p> 
                <h5>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', minimumFractionDigits: 2 }).format(useTotalIncomes())}</h5>
              </div>
            </div>

            <div className="savings-data">
              <div className="icon"><FaPiggyBank/></div>
              <div className="data">
                <p>Savings</p> 
                <h5>{useTotalSavings()}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="linechart-container">
          
          <div className="linechart">
            <h5>Expenses trends over time</h5>
            <ExpenseChart/>
            </div>
        </div>

        <div className="insights-container">
          <div className="donutchart">
            <h5>Your Key Spending Areas: Top 5 Categories</h5>
            <CategoriesDonut/>
          </div>
        </div>
      </div>

      <div className="history">
        <div className='transaction-container'>
          <h5>Recent transactions</h5>
          <div className=""><Transactions/></div>
        </div>
      </div>

    </div>
  </div>
  </>
  )
}

export default Dashboard