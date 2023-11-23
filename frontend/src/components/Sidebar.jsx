import { FaChartPie, FaExchangeAlt, FaMoneyBillAlt, FaUserAlt } from "react-icons/fa"
import { useSelector } from "react-redux"

function Sidebar() {
    const { user } = useSelector((state) => state.auth)

  return (
    <div className="main-sidebar">
        <button className='sidebar-element user'>
        <p className='accent'><FaUserAlt/></p>
        <p>Hi {user && user.name}!</p>
        </button>
        <button className='sidebar-element'>
        <p className='accent'><FaChartPie/></p>
        <p>Overview</p>
        </button>
        <button className='sidebar-element'>
        <p className='accent'><FaExchangeAlt/></p>
        <p>Transactions</p>
        </button>
        <button className='sidebar-element'>
        <p className='accent'><FaMoneyBillAlt/></p>
        <p>Budget</p>
        </button>
    </div>
  )
}
export default Sidebar