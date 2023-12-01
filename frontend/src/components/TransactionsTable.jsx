import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import ReactPaginate from 'react-paginate';
import { deleteExpense } from '../features/expenses/expenseSlice';
import { deleteIncome } from '../features/incomes/incomeSlice';
import { FaTrashAlt } from 'react-icons/fa';

function TransactionsTable() {
  const { expenses, isLoading: expensesLoading } = useSelector((state) => state.expenses);
  const { incomes, isLoading: incomesLoading } = useSelector((state) => state.incomes);
  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(0);
  const transactionsPerPage = 10;
  const pagesVisited = pageNumber * transactionsPerPage;

  if (expensesLoading || incomesLoading) {
    return <Spinner />;
  }

  const allTransactions = [...expenses, ...incomes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const pageCount = Math.ceil(allTransactions.length / transactionsPerPage);

  const displayTransactions = allTransactions
    .slice(pagesVisited, pagesVisited + transactionsPerPage)
    .map((transaction) => {
      if (transaction.amount < 0) {
        return (
          <tr key={transaction._id}>
            <td>{transaction.name}</td>
            <td className="minus amount-column">{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', minimumFractionDigits: 2 }).format(transaction.amount)}</td>
            <td className='close-column'>
              <button className='close' expense={transaction} onClick={() => dispatch(deleteExpense(transaction._id))}>
              <FaTrashAlt/>
              </button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={transaction._id}>
            <td>{transaction.name}</td>
            <td  className="plus amount-column">+{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', minimumFractionDigits: 2 }).format(transaction.amount)}</td>
            <td className='close-column'>
              <button className='close' income={transaction} onClick={() => dispatch(deleteIncome(transaction._id))}>
              <FaTrashAlt/>
              </button>
            </td>
          </tr>
        );
      }
    });

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="content">
      {allTransactions.length > 0 ? (
        <div className='table'>
          <table>
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{displayTransactions}</tbody>
          </table>
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={'pagination-container'}
            previousLinkClassName={'previous'}
            nextLinkClassName={'next'}
            disabledClassName={'disabled'}
            activeClassName={'active'}
          />
        </div>
      ) : (
        <p>No transactions to show</p>
      )}
    </div>
  );
}

export default TransactionsTable;
