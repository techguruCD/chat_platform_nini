import Avatar from '../components/Avatar';
import './Login.scss';

import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../store/action/authAction';
import { STATIC_PREFIX } from '../config';

const Login = () => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser({
            name, password
        }))
    }
    const errors = useSelector((state) => state.error.errors)
    return (
        <div className='login-container'>
            <div className='login-area d-flex flex-column'>
                <div className='login-header'>
                    <img src={`${STATIC_PREFIX}/2004 Messenger Logo.png`}></img>
                </div>
                <div className='login-form'>
                    <form className='input-form' onSubmit={loginSubmit}>
                        <div className='input-box'>
                            <div>
                                <p>Name:</p>
                                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                                {errors.name && <div className='input-error'>{errors.name}</div>}
                            </div>
                            <div>
                                <p>Password:</p>
                                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                {errors.password && <div className='input-error'>{errors.password}</div>}
                            </div>
                        </div>
                        <div className='button-box'>
                            <button>Sign In</button>
                            <div className='mt-2'>
                                <Link to="/chat/register">Sign Up</Link>
                            </div>
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