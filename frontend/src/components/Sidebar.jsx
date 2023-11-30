import { FaChartPie, FaExchangeAlt, FaMoneyBillAlt, FaUserAlt } from "react-icons/fa"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom";

function Sidebar() {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
  
    const isActive = (path) => {
      return location.pathname === path ? "active" : "";
    };
  

  return (
    <div className="sidebar">
        <a href='/account' className={`sidebar-element user ${isActive('/account')}`}>
          <i className='accent'><FaUserAlt/></i>
          Hi {user && user.name}!
        </a>
        <a href='/' className={`sidebar-element ${isActive('/')}`}>
          <i className='accent'><FaChartPie/></i>
          Overview
        </a>
        <a href='/transactions' className={`sidebar-element ${isActive('/transactions')}`}>
          <i className='accent'><FaExchangeAlt/></i>
          Transactions
        </a>
        <a href='/budgets' className={`sidebar-element ${isActive('/budgets')}`}>
          <i className='accent'><FaMoneyBillAlt/></i>
          Budget
        </a>
    </div>
  )
}
export default Sidebar