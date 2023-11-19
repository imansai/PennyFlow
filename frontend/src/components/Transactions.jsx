import ExpenseItem from '../components/ExpenseItem'
import IncomeItem from '../components/IncomeItem'
import { useSelector } from 'react-redux'
import Spinner from './Spinner';

function Transactions() {
    const { expenses, isLoading: expensesLoading } = useSelector((state) => state.expenses);
    const { incomes, isLoading: incomesLoading } = useSelector((state) => state.incomes);
    if(expensesLoading && incomesLoading) {
      return <Spinner />
    } 

  return (
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
  )
}
export default Transactions