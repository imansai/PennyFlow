import axios from 'axios'

const API_URL = '/api/budgets/'

// Create new budget
const createBudget = async (budgetData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, budgetData, config)
    
    return response.data
}

const getUnbudgetedBudget = async (userId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const response = await axios.get(`${API_URL}unbudgeted/${userId}`, config);
      return response.data;
    } catch (error) {
      // Handle errors
      console.error('Error fetching unbudgeted budget:', error);
      throw error;
    }
  };

// Get user budgets
const getBudgets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    
    return response.data
}

// Delete user budgets
const deleteBudget = async (budgetId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + budgetId, config)
    
    return response.data
}

const budgetService = {
    createBudget,
    getBudgets,
    deleteBudget,
    getUnbudgetedBudget,
}

export default budgetService