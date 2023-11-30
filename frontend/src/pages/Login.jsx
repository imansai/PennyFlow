import {useState, useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
    )
  
  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <h4>Login</h4>
          <div className="inputbox">
            <input type='email' className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange}/>
          </div>

          <div className="inputbox">
            <input type='password' className='form-control' id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange}/>
          </div>
          
          <button type='submit' className='login-btn'>
            Log in
          </button>

          <div class="register">
              <p>Don't have a account <a href="./register">Register</a></p>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login