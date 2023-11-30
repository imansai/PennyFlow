import { useState } from "react"
import { useDispatch } from "react-redux"
import { createIncome } from '../features/incomes/incomeSlice'
import Modal from 'react-modal'
import { FaPlusCircle } from 'react-icons/fa'
import { toast } from 'react-toastify'

function IncomeForm() {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        description: '',
        date: new Date().toISOString().substr(0, 10),
    })
    const {name, amount, description, date} = formData
    
    const dispatch = useDispatch()


    const onSubmit = (e) => {
        e.preventDefault()
        
        // Validate the 'name' field
        if (formData.name.trim() === '') {
            alert('Please enter a valid name.');
            return;
        } else {
            toast.success('Form submitted successfully!', {
                position: 'top-right', // Set the position of the toast notification
                autoClose: 3000, // Duration to display the notification (in milliseconds)
              });
        }

        dispatch(createIncome(formData))
        setFormData({
            name: '',
            amount: '',
            description: '',
            date: new Date().toISOString().substr(0, 10),
        })
    }
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }
    const [showIncomeModal, setShowIncomeModal] = useState(false)
    const toggleIncomeModal = () => {
        setShowIncomeModal(!showIncomeModal)
    }
    
    return (
        <section>
            <Modal isOpen={showIncomeModal} onRequestClose={toggleIncomeModal} contentLabel="Income Form Modal">
                <h5>Add New Income</h5>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='name'>Income</label>
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
                            Add income
                        </button>
                    </div>
                </form>
            </Modal>
            <button className='btn' onClick={toggleIncomeModal}>
                <FaPlusCircle />Income
            </button>
    </section>
    )
}
export default IncomeForm