import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses } from '../features/expenses/expenseSlice';
import Chart from 'chart.js/auto';

function ExpenseChart() {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expenses);
  const chartRef = useRef(null);
  const [chartType, setChartType] = useState('monthly');
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  useEffect(() => {
    const processExpenses = (expensesData, type) => {
      let filteredExpenses = [];
      let startDate;
    
      // Filter expenses based on the selected type (monthly or weekly)
      if (type === 'monthly') {
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
      } else if (type === 'weekly') {
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
      }

        // Filter expenses including today
      filteredExpenses = expensesData.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= startDate && expenseDate <= new Date(); // Include expenses done today
      });

      // Sort filtered expenses by date in ascending order (oldest to newest)
      filteredExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));
    
      // Group expenses by date and calculate total amount for each date
      const groupedExpenses = {};
      filteredExpenses.forEach((expense) => {
        const expenseDate = new Date(expense.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        if (!groupedExpenses[expenseDate]) {
          groupedExpenses[expenseDate] = 0;
        }
        groupedExpenses[expenseDate] += expense.amount*-1;
      });
    
      // Extract labels and data from grouped expenses for Chart.js
      const chartLabels = Object.keys(groupedExpenses); // Get dates as labels
      const chartData = Object.values(groupedExpenses); // Get total amounts as data
    
      return { chartLabels, chartData };
    };


    const createChart = (canvasRef, { chartLabels, chartData }) => {
      const ctx = canvasRef.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, 200);
      gradient.addColorStop(0, 'rgba(183,176,232,1)');
      gradient.addColorStop(1, 'rgba(220,220,220,0)');

      const chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartLabels,
          datasets: [{
            label: '',
            data: chartData,
            backgroundColor: gradient,
            fill: 'start',
            borderColor: '#7549FF',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              suggestedMin: 0,
              grid: { display: false }
            },
            x: { grid: { display: false } }
          }
        }
      });

      return chartInstance;
    };

    if (chartRef.current && expenses.length > 0) {
      const processedExpenses = processExpenses(expenses, chartType);

      if (!chartInstance) {
        const newChartInstance = createChart(chartRef.current, processedExpenses);
        setChartInstance(newChartInstance);
      } else {
        updateChart(chartInstance, processedExpenses);
      }
    }

    function updateChart(chart, { chartLabels, chartData }) {
      chart.data.labels = chartLabels;
      chart.data.datasets[0].data = chartData;
      chart.options.plugins.title.text = chartType === 'monthly' ? 'Expenses Last 30 Days' : 'Expenses Last 7 Days';
      chart.update();
    }
  }, [dispatch, expenses, chartType, chartInstance]);

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  return (
    <div style={{ width: '100%', height: '400px' }}> 
      <div className="chart" style={{ width: '100%', height: '100%' }}>
        <canvas id="expenseChart" ref={chartRef}></canvas>
        <div className='filter-container'>
                   <button className={`filter-btn ${chartType === 'monthly' ? 'active' : ''}`} onClick={() => handleChartTypeChange('monthly')}>Last 30 days</button>
          <button className={`filter-btn ${chartType === 'weekly' ? 'active' : ''}`} onClick={() => handleChartTypeChange('weekly')}>Last 7 days</button>        </div>
      </div>
    </div>
  );
}

export default ExpenseChart;
