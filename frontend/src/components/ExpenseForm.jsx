import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { createExpense } from '../features/expenses/expenseSlice'
import Modal from 'react-modal'
import { toast } from 'react-toastify'

function ExpenseForm({ initiallyOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        description: '',
        date: new Date().toISOString().substr(0, 10),
        category: 'Uncategorized',
    })
    const { name, amount, description, date, category} = formData
    
    const dispatch = useDispatch()


    const onSubmit = (e) => {
        e.preventDefault()
        
        // Validate the 'name' field
        if (formData.name.trim() === '') {
            toast.error('Please enter a valid name.');
            return;
        } else if (formData.amount.trim() === '' || isNaN(parseFloat(formData.amount))) {
            toast.error('Please enter a valid amount.');
            return;
        } else {
            toast.success('Form submitted successfully!', {
                position: 'top-right', // Set the position of the toast notification
                autoClose: 3000, // Duration to display the notification (in milliseconds)
              });
        }

        dispatch(createExpense(formData))
        setFormData({
            name: '',
            amount: '',
            description: '',
            date: new Date().toISOString().substr(0, 10),
            category: 'Uncategorized',
        })
    }
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }
    const [showExpenseModal, setShowExpenseModal] = useState(initiallyOpen);

    useEffect(() => {
        setShowExpenseModal(initiallyOpen);
      }, [initiallyOpen]);
    
      const handleCloseModal = () => {
        setShowExpenseModal(false);
        onClose(); // Callback to reset the selected option in the parent component
      };

    
    return (
        <section>
            <Modal isOpen={showExpenseModal} onRequestClose={handleCloseModal} contentLabel="Expense Form Modal">
                <h5>Add New Expense</h5>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='name'>Expense</label>
                        <input 
                            type='text' 
                            name='name' 
                            id='name' 
                            value={name} 
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='amount'>Amount</label>
                        <input 
                            type='number' 
                            name='amount' 
                            id='amount' 
                            value={amount} 
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='category'>Category</label>
                        <select 
                            name='category' 
                            id='category' 
                            value={category} 
                            onChange={onChange}
                        >
                            <option value='Uncategorized'>Uncategorized</option>
                            <option value='Housing'>Housing</option>
                            <option value='Utilities'>Utilities</option>
                            <option value='Household Items'>Household Items</option>
                            <option value='Food'>Food</option>
                            <option value='Transportation'>Transportation</option>
                            <option value='Investments'>Investments</option>
                            <option value='Savings'>Savings</option>
                            <option value='Debt'>Debt</option>
                            <option value='Health & Fitness'>Health & Fitness</option>
                            <option value='Entertainment'>Entertainment</option>
                            <option value='Shopping'>Shopping</option>
                            <option value='Travel'>Travel</option>
                            <option value='Personal Care'>Personal Care</option>
                            <option value='Gifts & Donations'>Gifts & Donations</option>
                            <option value='Education'>Education</option>
                            <option value='Miscellaneous'>Miscellaneous</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>Description</label>
                        <input 
                            type='text' 
                            name='description' 
                            id='description' 
                            value={description} 
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='date'>Date</label>
                        <input 
                            type='date' 
                            name='date' 
                            id='date' 
                            value={date} 
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block" type="submit">
                            Add expense
                        </button>
                    </div>
                </form>
            </Modal>

    </section>
    )
}
export default ExpenseForm