import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses } from '../features/expenses/expenseSlice';
import Chart from 'chart.js/auto';

function CategoriesDonut() {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expenses);
  const chartRef = useRef(null);

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  useEffect(() => {
    if (chartRef.current && expenses.length > 0) {
      // Calculate total expenses for each category
      const categoryExpensesMap = {};
      expenses.forEach((expense) => {
        const { category, amount } = expense;
        categoryExpensesMap[category] = (categoryExpensesMap[category] || 0) + amount;
      });

      // Sort categories by total expenses
      const sortedCategories = Object.keys(categoryExpensesMap).sort(
        (a, b) => categoryExpensesMap[b] - categoryExpensesMap[a]
      );

      // Select the top categories (e.g., top 5)
      const topCategories = sortedCategories.slice(0, 5);

      // Prepare data for Chart.js
      const chartLabels = topCategories;
      const chartData = topCategories.map((category) => categoryExpensesMap[category]);

      // Create the donut chart
      if (chartRef.current.chart) {
        chartRef.current.chart.data.labels = chartLabels;
        chartRef.current.chart.data.datasets[0].data = chartData;
        chartRef.current.chart.update();
      } else {
        const ctx = chartRef.current.getContext('2d');
        chartRef.current.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
            labels: chartLabels,
            datasets: [{
                label: 'Expenses',
                data: chartData,
                backgroundColor: [
                'rgba(208, 210, 218, 0.7)',
                'rgba(255, 106, 0, 0.7)',
                'rgba(0, 183, 254, 0.7)',
                'rgba(253, 34, 84, 0.7)',
                'rgba(85, 31, 255, 0.7)',
                // Add more colors as needed
                ],
            }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'right', // Set legend position to the right
                        labels: {
                          boxHeight: 10,
                          boxWidth: 10,
                          borderRadius: 100,
                        }
                    },
                },
            }
        });
        }
    }
  }, [expenses]);

  return (
    <div>
      <div className="chart" style={{ width: '100%', height: '100%' }}>
        <canvas id="topCategoriesChart" ref={chartRef}></canvas>
      </div>
    </div>
  );
}

export default CategoriesDonut;