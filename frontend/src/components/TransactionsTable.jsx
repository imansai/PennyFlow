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
            <td>{new Date(transaction.date).toLocaleString('en-US', {year: "numeric", month: "numeric", day: "numeric"})}</td>
            <td>{transaction.name}</td>
            <td className="minus">{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(transaction.amount)}</td>
            <td>{transaction.description}</td>
            <td>{new Date(transaction.createdAt).toLocaleString('en-US', {year: "numeric", month: "numeric", day: "numeric"})}</td>
            <td>
              <button className='close' expense={transaction} onClick={() => dispatch(deleteExpense(transaction._id))}>
              <FaTrashAlt/>
              </button>
            </td>
            
            
          </tr>
        );
      } else {
        return (
          <tr key={transaction._id}>
            <td>{new Date(transaction.date).toLocaleString('en-US', {year: "numeric", month: "numeric", day: "numeric"})}</td>
            <td>{transaction.name}</td>
            <td  className="plus">+{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(transaction.amount)}</td>
            <td>{transaction.description}</td>
            <td>{new Date(transaction.createdAt).toLocaleString('en-US', {year: "numeric", month: "numeric", day: "numeric"})}</td>
            <td>
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
                <th>Date</th>
                <th>Transaction Name</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Delete</th>
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
