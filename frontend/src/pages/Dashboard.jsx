
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getExpenses, reset as resetExpenses } from '../features/expenses/expenseSlice'
import { getIncomes, reset as resetIncomes} from '../features/incomes/incomeSlice'
import ExpenseForm from '../components/ExpenseForm'
import IncomeForm from '../components/IncomeForm'
import Transactions from '../components/Transactions'
import Summary from '../components/Summary'


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

    <section className="heading">
      <h1>Welcome {user && user.name}</h1>
      <p>Dashboard</p>
    </section>
    <Summary />
    <ExpenseForm />
    <IncomeForm />
    <Transactions />
  </>
  )
}

export default Dashboard