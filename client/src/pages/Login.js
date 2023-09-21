import Avatar from '../components/Avatar';
import './Login.scss';

import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../store/action/authAction';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser({
            email, password
        }))
    }
    const errors = useSelector((state) => state.error.errors)
    return (
        <div className='login-container'>
            <div className='login-area'>
                <div className='login-form'>
                    <div className='avatar-area'>
                        <Avatar imageURL={'msn-icon.png'} marginLeft={0} />
                    </div>
                    <form className='input-form' onSubmit={loginSubmit}>
                        <div className='input-box'>
                            <div>
                                <p>E-mail address:</p>
                                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
                                {errors.email && <div className='input-error'>{errors.email}</div>}
                            </div>
                            <div>
                                <p>Password:</p>
                                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                                {errors.password && <div className='input-error'>{errors.email}</div>}
                            </div>
                        </div>
                        <div className='button-box'>
                            <button>Sign In</button>
                            <Link to="/register">Sign Up</Link>
                        </div>
                        {/* <div className='input-area'>
                            <div>Username: </div>
                            <div><input type='text' /></div>
                        </div>
                        <div className='input-area'>
                            <div>Password: </div>
                            <div><input type='password' /></div>
                        </div>
                        <div className='input-area'>
                            <button>Sign In</button>
                            <button>Sign Up</button>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;