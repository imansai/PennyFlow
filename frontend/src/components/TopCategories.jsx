import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function TopCategories() {
    const [topCategories, setTopCategories] = useState([]);
    const { expenses } = useSelector((state) => state.expenses);

    useEffect(() => {
        if (expenses.length > 0) {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const expensesLast30Days = expenses.filter(
                (expense) => new Date(expense.date) >= thirtyDaysAgo
            );

            // Extract categories and calculate total spending for each category
            const categoryTotals = {};
            expensesLast30Days.forEach((expense) => {
                const { category, amount } = expense;
                if (!categoryTotals[category]) {
                    categoryTotals[category] = 0;
                }
                categoryTotals[category] += amount;
            });

            // Sort categories by spending and get the top categories with amounts
            const sortedCategories = Object.keys(categoryTotals).sort(
                (a, b) => categoryTotals[a] - categoryTotals[b]
            );
            const topCategoriesData = sortedCategories.map((category) => ({
                name: category,
                amount: categoryTotals[category],
            }));

            setTopCategories(topCategoriesData);
        } else {
            setTopCategories([]); // Reset topCategories when there are no expenses
        }
    }, [expenses]);

    return (
        <div>
            {topCategories.length > 0 ? (
                <ul>
                    {topCategories.map((category, index) => (
                        <li key={index}>
                            {category.name} - ${category.amount.toFixed(2)*-1}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No data to show</p>
            )}
        </div>
    );
}

export default TopCategories;