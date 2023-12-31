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
  return Intl.NumberFormat('en-US', { notation: 'compact', style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(balance);
}

export function useTotalSavings() {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expenses);
  const savingsExpenses = expenses.filter(expense => expense.category === 'Savings');
  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  const savingsTotal = Math.abs(savingsExpenses.reduce((total, expense) => total + expense.amount, 0));
  return Intl.NumberFormat('en-US', { notation: 'compact', style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(savingsTotal);
} 

function Summary() {
  const totalExpenses = useTotalExpenses();
  const totalIncomes = useTotalIncomes();
  const balance = useTotalBalance();
  const totalSavings = useTotalSavings();

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
        <div>
          <h4>Savings</h4>
          <p>{totalSavings}</p>
        </div>
      </div>
    </div>
  )
}
export default Summary