
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getExpenses, reset as resetExpenses } from '../features/expenses/expenseSlice'
import { getIncomes, reset as resetIncomes } from '../features/incomes/incomeSlice'
import ExpenseForm from '../components/ExpenseForm'
import IncomeForm from '../components/IncomeForm'
import Transactions from '../components/Transactions'
import { useTotalExpenses, useTotalIncomes, useTotalBalance } from '../components/Summary'
import Sidebar from '../components/Sidebar'
import ExpenseChart from '../components/ExpenseChart'
import TopCategories from '../components/TopCategories'
import CategoriesDonut from '../components/CategoriesDonut'


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
    <div className="main-content">
      <div className='cards summary first'>
        <p>Balance</p> 
        <h4>{useTotalBalance()}</h4>
      </div>
      <div className="cards summary second">
        <p>Expenses</p>
        <h4>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', minimumFractionDigits: 2 }).format(useTotalExpenses())}</h4>
        <ExpenseForm/>
      </div>
      <div className="cards summary third">
        <p>Incomes</p> 
        <h4>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', minimumFractionDigits: 2 }).format(useTotalIncomes())}</h4>
        <IncomeForm/>
      </div>
      <div className="cards chart">
        <ExpenseChart/>
      </div>
      <div className="cards top">
        <h5>Top categories</h5>
        <CategoriesDonut/>
      </div>
      <div className="cards history">
        <h5>Recent transactions</h5>
        <div className="history-table"><Transactions/></div>
      </div>

    </div>
  </div>
  </>
  )
}

export default Dashboard