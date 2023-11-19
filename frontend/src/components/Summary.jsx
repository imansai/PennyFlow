import { useEffect } from 'react';
import { getExpenses } from '../features/expenses/expenseSlice'
import { getIncomes } from '../features/incomes/incomeSlice'
import { useDispatch, useSelector } from 'react-redux'


function Summary() {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expenses);
  const { incomes } = useSelector((state) => state.incomes);

  useEffect(() => {
    dispatch(getExpenses());
    dispatch(getIncomes());
  }, [dispatch]);

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const totalIncomes = incomes.reduce((acc, income) => acc + income.amount, 0);
  const balance = totalIncomes + totalExpenses;

  return (
    <div>
      <div>
        <h4>Your Balance</h4>
        <h1>{balance}</h1>
      </div>  
      <div className="inc-exp-container">
        <div>
          <h4>Expense</h4>
          <p className="money minus">{totalExpenses*-1}</p>
        </div>
        <div>
          <h4>Income</h4>
          <p className="money plus">{totalIncomes}</p>
        </div>
      </div>
    </div>
  )
}
export default Summary