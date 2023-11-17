
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ExpenseForm from '../components/ExpenseForm'
import IncomeForm from '../components/IncomeForm'
import Spinner from '../components/Spinner'
import { getExpenses, reset } from '../features/expenses/expenseSlice'
import { getIncomes } from '../features/incomes/incomeSlice'
import ExpenseItem from '../components/ExpenseItem'
import IncomeItem from '../components/IncomeItem'
import Modal from 'react-modal'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);

  const { user } = useSelector((state) => state.auth)
  const { expenses, isLoading: expensesLoading, isError: expensesError, message: expensesMessage } = useSelector((state) => state.expenses);
  const { incomes, isLoading: incomesLoading, isError: incomesError, message: incomesMessage } = useSelector((state) => state.incomes);

  const toggleExpenseModal = () => {
    setShowExpenseModal(!showExpenseModal);
  };

  const toggleIncomeModal = () => {
    setShowIncomeModal(!showIncomeModal);
  };

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
      dispatch(reset())
    }
  }, [user, navigate, expensesError, incomesError, expensesMessage, incomesMessage, dispatch])
  
  if(expensesLoading || incomesLoading) {
    return <Spinner />
  }
  return (
  <>
    <section className="heading">
      <h1>Welcome {user && user.name}</h1>
      <p>Dashboard</p>
    </section>

    <Modal isOpen={showExpenseModal} onRequestClose={toggleExpenseModal} contentLabel="Expense Form Modal">
      <ExpenseForm onClose={toggleExpenseModal} />
    </Modal>
    <button className='btn minus' onClick={toggleExpenseModal}>
      <FaMinusCircle />
    </button>
    <Modal isOpen={showIncomeModal} onRequestClose={toggleIncomeModal} contentLabel="Income Form Modal">
      <IncomeForm onClose={toggleIncomeModal} />
    </Modal>
    <button className='btn plus' onClick={toggleIncomeModal}>
      <FaPlusCircle />
    </button>

    
    <section className="content">
      <div className="list">
        <ul className="list">
          {expenses.concat(incomes).length > 0 ? (
          expenses
            .concat(incomes)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt property
            .map((item) => {
              const isExpense = item.amount < 0; // Check if the amount is negative

              const className = isExpense ? 'minus' : 'plus';

              return (
                <li key={item._id} className={className}>
                  {isExpense ? (
                    <ExpenseItem expense={item} />
                  ) : (
                    <IncomeItem income={item} />
                  )}
                </li>
              );
            })
        ) : (
          <h3>No transactions to show</h3>
        )}
        </ul>
      </div>
    </section>
  </>
  )
}

export default Dashboard