import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getBudgets, reset as resetBudgets } from '../features/budgets/budgetSlice';


function Budgets() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { user } = useSelector((state) => state.auth)
    const { isError: budgetsError, message: budgetsMessage } = useSelector((state) => state.budgets);
  
    useEffect(() => {
      if(budgetsError) {
        return (
          <div>
            <h2>Error</h2>
            <p>There was an error loading data. Please try again later.</p>
            <p>{budgetsError && `Budgets Error: ${budgetsMessage}`}</p>
          </div>
        );
      }
  
      if(!user) {
        navigate('/login')
      } else {
        dispatch(getBudgets());
      }
  
      return () => {
        dispatch(resetBudgets())
      }
    }, [user, navigate, budgetsError, budgetsMessage, dispatch])
    

  return (
    <div>
 
    </div>
  )
}
export default Budgets