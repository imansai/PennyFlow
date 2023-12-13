import { FaChartPie, FaExchangeAlt, FaUserAlt, FaPiggyBank } from "react-icons/fa"
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
          Profile
        </a>
        <a href='/' className={`sidebar-element ${isActive('/')}`}>
          <i className='accent'><FaChartPie/></i>
          Overview
        </a>
        <a href='/transactions' className={`sidebar-element ${isActive('/transactions')}`}>
          <i className='accent'><FaExchangeAlt/></i>
          Transactions
        </a>
        <a href='/savings' className={`sidebar-element ${isActive('/savings')}`}>
          <i className='accent'><FaPiggyBank/></i>
          Saving Goals
        </a>
    </div>
  )
}
export default Sidebar