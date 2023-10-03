import Avatar from '../components/Avatar';
import './Login.scss';

import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { registerUser } from '../store/action/authAction';
import { STATIC_PREFIX } from '../config';

const Register = () => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [password_confirm, setPasswordConfirm] = useState("")
    const dispatch = useDispatch()

    const registerSubmit = (e) => {
        e.preventDefault()
        dispatch(registerUser({
            password, password_confirm, name
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
                    <form className='input-form' onSubmit={registerSubmit}>
                        <div className='input-box'>
                            <div>
                                <p>Username:</p>
                                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                                {errors.name && <div className='input-error'>{errors.name}</div>}
                            </div>
                            <div>
                                <p>Password:</p>
                                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                {errors.password && <div className='input-error'>{errors.password}</div>}
                            </div>
                            <div>
                                <p>Confirm Password:</p>
                                <input type='password' value={password_confirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                                {errors.password_confirm && <div className='input-error'>{errors.password_confirm}</div>}
                            </div>
                        </div>
                        <div className='button-box'>
                            <button>Sign Up</button>
                            <div className='mt-2'>
                                <Link to="/chat/login">Sign In</Link>
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

export default Register;