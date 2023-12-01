import { useState } from 'react';
import Sidebar from '../components/Sidebar';

function Savings() {
  const [savingsGoal, setSavingsGoal] = useState('');
  const [initialInvestment, setInitialInvestment] = useState('');
  const [yearsToGrow, setYearsToGrow] = useState('');
  const [annualInterestRate, setAnnualInterestRate] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const futureValue = calculateSavingsGoal();
    setResult(futureValue);
  };

  const calculateSavingsGoal = () => {
    const goal = parseFloat(savingsGoal);
    const initial = parseFloat(initialInvestment);
    const years = parseFloat(yearsToGrow);
    const interest = parseFloat(annualInterestRate);

    const months = years * 12;
    const monthlyContribution =
      (goal - initial) *
      (1 + annualInterestRate / 100 / 12) /
      ((Math.pow(1 + annualInterestRate / 100 / 12, months) - 1) /
        (annualInterestRate / 100 / 12));

    const futureValue = goal.toFixed(2);

    return `If you contribute $${monthlyContribution.toFixed(
      2
    )} every month over the next ${years} years towards your goal, you will have $${futureValue} in savings.`;
  };

  return (
    <div className='main'>
        <Sidebar/>
        <div className='content'>
            <div className='calculator'>
                <div className='form'>
                <form onSubmit={handleSubmit}>
                    <h4>Savings Goal Calculator</h4>
                    <div className='inputbox'>
                    <input
                        type="number"
                        value={savingsGoal}
                        onChange={(e) => setSavingsGoal(e.target.value)}
                        required
                        placeholder="Savings Goal"
                    />
                    </div>
                    <br />
                    <div className='inputbox'>
                    <input
                        type="number"
                        value={initialInvestment}
                        onChange={(e) => setInitialInvestment(e.target.value)}
                        required
                        placeholder="Initial Investment"
                    />
                    </div>
                    <br />
                    <div className='inputbox'>
                    <input
                        type="number"
                        value={yearsToGrow}
                        onChange={(e) => setYearsToGrow(e.target.value)}
                        required
                        placeholder="Years to Grow"
                    />
                    </div>
                    <br />
                    <div className='inputbox'>
                    <input
                        type="number"
                        value={annualInterestRate}
                        onChange={(e) => setAnnualInterestRate(e.target.value)}
                        required
                        placeholder="Estimated Annual Interest Rate (%)"
                    />
                    </div>
                    <br />
                    <button type="submit" className='login-btn'>Calculate</button>
                </form>
                </div>
            </div>
            <div className="results">
              <ul>
                <li><h5 className='sidebar-element'>Savings Goal</h5> <p>(Desired amount of money you want to save).</p></li>
                <li><h5 className='sidebar-element'>Initial Investment</h5> <p>(Amount you have already invested, if any).</p></li>
                <li><h5 className='sidebar-element'>Years to Grow</h5> <p>(Number of years for your savings to accumulate).</p></li>
                <li><h5 className='sidebar-element'>Estimated Annual Rate</h5> <p>Interest Rate (%) (The expected interest rate on your savings).</p></li>
              </ul>
              <div className="form">
                <h5>{result && <p>{result}</p>}</h5>
              </div>
            </div>
        </div>
    </div>
  );
}

export default Savings;