
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getExpenses, reset as resetExpenses } from '../features/expenses/expenseSlice'
import { getIncomes, reset as resetIncomes } from '../features/incomes/incomeSlice'
import { useTotalExpenses, useTotalIncomes, useTotalBalance } from '../components/Summary'
import Sidebar from '../components/Sidebar'
import ExpenseChart from '../components/ExpenseChart'
import CategoriesDonut from '../components/CategoriesDonut'
import TransactionsTable from '../components/TransactionsTable'
import { FaPlusSquare, FaMinusSquare, FaGoogleWallet, FaIdCardAlt } from 'react-icons/fa'


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
    <Sidebar/>
    <div className="content">

      <div className="kpi">
        <div className="summary-container">
          <h4>Hi {user && user.name}!</h4>
          <div className="summary">
            <div className="balance-data">
              <div className="icon"><FaIdCardAlt/></div>
              <div className='data'>
                <p>Balance</p> 
                <h5>{useTotalBalance()}</h5>
              </div>
            </div>

            <div className="expenses-data">
              <div className="icon"><FaMinusSquare/></div>
              <div className="data">
                <p>Expenses</p>
                <h5>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', minimumFractionDigits: 2 }).format(useTotalExpenses())}</h5>
              </div>
            </div>

            <div className="incomes-data">
              <div className="icon"><FaPlusSquare/></div>
              <div className="data">
                <p>Incomes</p> 
                <h5>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', minimumFractionDigits: 2 }).format(useTotalIncomes())}</h5>
              </div>
            </div>

            <div className="savings-data">
              <div className="icon"><FaGoogleWallet/></div>
              <div className="data">
                <p>Savings</p> 
                <h5>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', minimumFractionDigits: 2 }).format(useTotalIncomes())}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="linechart-container">
          <div className="linechart"><ExpenseChart/></div>
        </div>

        <div className="insights-container">
          <h5>More insights</h5>
          <div className="insights">
            <div className="donutchart"><CategoriesDonut/></div>
            <div className="budgetlist"><CategoriesDonut/></div>
          </div>
        </div>
      </div>

      <div className='history-container'>
        <h5>Recent transactions</h5>
        <div className="history">
          <div className="table"><TransactionsTable/></div>
        </div>
      </div>

    </div>
  </div>
  </>
  )
}

export default Dashboard