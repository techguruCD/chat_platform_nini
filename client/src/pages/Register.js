import Avatar from '../components/Avatar';
import './Login.scss';

import { useState } from 'react'
import { Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className='login-container'>
            <div className='login-area'>
                <div className='login-form'>
                    <div className='avatar-area'>
                        <Avatar imageURL={'msn-icon.png'} marginLeft={0} />
                    </div>
                    <form className='input-form'>
                        <div className='input-box'>
                            <div>
                                <p>E-mail address:</p>
                                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <p>Username:</p>
                                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <p>Password:</p>
                                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className='button-box'>
                            <button>Sign Up</button>
                            <Link to="/login">Sign In</Link>
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