import { useState } from 'react';
import ExpenseForm from "./ExpenseForm";
import IncomeForm from "./IncomeForm";

function FormSelector() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const clearSelectedOption = () => {
    setSelectedOption('');
  };

  const renderSelectedOption = () => {
    switch (selectedOption) {
      case 'expense':
        return <ExpenseForm initiallyOpen={true} onClose={clearSelectedOption} />;
      case 'income':
        return <IncomeForm initiallyOpen={true} onClose={clearSelectedOption} />;
      default:
        return null;
    }
  };

  return (
    <div className="form-selector">
      <div className="dropdown">
        <select className="form-select" value={selectedOption} onChange={(e) => handleOptionClick(e.target.value)}>
          <option value="">Add New</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      {renderSelectedOption()}
    </div>
  );
}

export default FormSelector;

