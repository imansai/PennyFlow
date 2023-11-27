import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses } from '../features/expenses/expenseSlice';
import Chart from 'chart.js/auto';

function ExpenseChart() {
  const dispatch = useDispatch();
  const { expenses }  = useSelector((state) => state.expenses);
  const chartRef = useRef(null);

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  // Filter expenses for the last 30 days and process for Chart.js
  useEffect(() => {
    if (chartRef.current && expenses.length > 0) {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
        const expensesLast30Days = expenses.filter(expense => new Date(expense.date) >= thirtyDaysAgo);

        // Sort expenses by date in ascending order (oldest to newest)
        expensesLast30Days.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Prepare data for Chart.js
        const chartLabels = expensesLast30Days.map(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
        });
        const chartData = expensesLast30Days.map(expense => {
          return (expense.amount)*-1;
        });
  
        // Check if chart instance exists and update data instead of creating a new instance
        if (chartRef.current.chart) {
          chartRef.current.chart.data.labels = chartLabels;
          chartRef.current.chart.data.datasets[0].data = chartData;
          chartRef.current.chart.update();
        } else {
          // Create the line chart if it doesn't exist
          const ctx = chartRef.current.getContext('2d');
          chartRef.current.chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: chartLabels,
              datasets: [{
                label: 'Expenses Last 30 Days',
                data: chartData,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }]
            },
            options: {
              responsive:true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  suggestedMin: 0
                }
              }
            }
          });
        }
      }
    }, [expenses]);
  
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="chart" style={{ width: '100%', height: '100%' }}>
          <canvas id="expenseChart" ref={chartRef}></canvas>
        </div>
      </div>
    );
  }

export default ExpenseChart;