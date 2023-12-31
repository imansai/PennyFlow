import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <a className='logo' href='/'>PennyFlow</a>
      </div>
      <ul>
        {user ? (
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
            <button className='btn'>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
              </button>
            </li>
            <li>
            <button className='btn'>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </button>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}
export default Header