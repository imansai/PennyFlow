import { useEffect } from 'react';
import { getExpenses } from '../features/expenses/expenseSlice'
import { getIncomes } from '../features/incomes/incomeSlice'
import { useDispatch, useSelector } from 'react-redux'

export function useTotalExpenses() {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  return totalExpenses;
}

export function useTotalIncomes() {
  const dispatch = useDispatch();
  const { incomes } = useSelector((state) => state.incomes);

  useEffect(() => {
    dispatch(getIncomes());
  }, [dispatch]);

  const totalIncomes = incomes.reduce((acc, income) => acc + income.amount, 0);
  return totalIncomes;
}

export function useTotalBalance() {
  const totalExpenses = useTotalExpenses();
  const totalIncomes = useTotalIncomes();
  const balance = totalIncomes +  totalExpenses;
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(balance);
}

function Summary() {
  const totalExpenses = useTotalExpenses();
  const totalIncomes = useTotalIncomes();
  const balance = useTotalBalance();

  return (
    <div>
      <div>
        <h4>Your Balance</h4>
        <h1>{balance}</h1>
      </div>  
      <div className="inc-exp-container">
        <div>
          <h4>Expense</h4>
          <p>{totalExpenses*-1}</p>
        </div>
        <div>
          <h4>Income</h4>
          <p>{totalIncomes}</p>
        </div>
      </div>
    </div>
  )
}
export default Summary