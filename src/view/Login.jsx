import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ServerRemote from '../server/ServerRemote';

const Login = props => {

    const idRef = useRef('');
    const pwRef = useRef('');

    const navigate = useNavigate();

    const handleLogin = async() => {
        const id = idRef.current.value;
        const password = pwRef.current.value;

        const params = {
            email : id,
            password : password
        };

        const result = await ServerRemote.post('/users/login', params);

        props.setToken(result.token);
        localStorage.setItem('email', id);
        navigate("/");
    }

    return (
        <div id="login-outer-div">
        <h1 id="login-title">To do Login</h1>
        <div id='login-div'>
            <div className='login-input-div'>
                
                <div className='login-label-div'>
                    Id
                </div>
                <div className='login-inner-input-div'>
                    <input type='email' 
                        name='id-input' 
                        className='login-input'
                        ref={idRef} />
                </div>
                
            </div>
            <div className='login-input-div'>
                <div className='login-label-div'>
                    PW
                </div>
                <div className='login-inner-input-div'>
                    <input 
                        type='password' 
                        name='pw-input' 
                        className='login-input'
                        ref = {pwRef} />
                </div>
            </div>
            <div id='login-btn-div'>
                <button className='login-btn'
                    onClick={handleLogin}>로그인</button>
                <button className='login-btn'
                    onClick={() => {navigate("/auth/signup");}}>회원가입</button>
            </div>
        </div>
        </div>
    );
};

export default Login;