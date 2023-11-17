import { useState } from "react"
import { useDispatch } from "react-redux"
import { createExpense } from '../features/expenses/expenseSlice'

function ExpenseForm() {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        description: '',
        date: '',
    })
    const {name, amount, description, date} = formData
    
    const dispatch = useDispatch()


    const onSubmit = (e) => {
        e.preventDefault()
        
        // Validate the 'name' field
        if (formData.name.trim() === '') {
            alert('Please enter a valid name.');
            return;
        }

        dispatch(createExpense(formData))
        setFormData({
            name: '',
            amount: '',
            description: '',
            date: '',
        })
    }
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
    return (
        <section className='form'>
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
    </section>
    )
}
export default ExpenseForm