import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getExpenses, reset as resetExpenses } from '../features/expenses/expenseSlice'
import { getIncomes, reset as resetIncomes } from '../features/incomes/incomeSlice'
import Sidebar from "../components/Sidebar";
import TransactionsTable from "../components/TransactionsTable";

function Transactions() {
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
    <div className="main">
        <Sidebar/>
        <div className="main-content">
            <div className="cards">
            <TransactionsTable/>
            </div>
        </div>
    </div>
    </>
  )
}
export default Transactions