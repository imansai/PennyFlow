import ExpenseItem from '../components/ExpenseItem'
import IncomeItem from '../components/IncomeItem'
import { useSelector } from 'react-redux'
import Spinner from './Spinner';

function Transactions() {
  const { expenses, isLoading: expensesLoading } = useSelector((state) => state.expenses);
  const { incomes, isLoading: incomesLoading } = useSelector((state) => state.incomes);
  if (expensesLoading && incomesLoading) {
      return <Spinner />
  }

  const allTransactions = expenses.concat(incomes);

  const sortedTransactions = allTransactions
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 12); // Get the 12 most recent transactions

  return (
    <div>
    {sortedTransactions.length > 0 ? (
        sortedTransactions.map((item) => {
            const isExpense = item.amount < 0;
            const className = isExpense ? '' : '';

            return (
                <div key={item._id} className={className}>
                    {isExpense ? (
                        <ExpenseItem expense={item} />
                    ) : (
                        <IncomeItem income={item} />
                    )}
                </div>
            );
        })
    ) : (
        <p>No transactions to show</p>
    )}
    </div>
  )
}
export default Transactions;