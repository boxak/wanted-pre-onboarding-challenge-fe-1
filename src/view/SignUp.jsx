import React, { useRef, useState } from 'react';
import ServerRemote from '../server/ServerRemote';
import NullChecker from '../util/NullChecker';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const emailRef = useRef('');
    const pwRef = useRef('');

    const [disableSubmit, setDisableSubmit] = useState(true);

    const navigate = useNavigate();

    const doSignUp = async() => {
        const email = emailRef.current.value;
        const password = pwRef.current.value;

        const params = {
            "email" : email,
            "password" : password
        };

        const result = await ServerRemote.post('/users/create', params);

        console.log("result : " + JSON.stringify(result));

        if (result !== undefined && result !== null) {
            if (result.status === 200) {
                alert('회원가입이 완료되었습니다.');
            } else {
                alert(result.data.details); 
            }
        }
    }

    const validateSignUp = () => {

        const email = emailRef.current.value;
        const password = pwRef.current.value;

        let validate = true;

        if (NullChecker.isEmpty(email) || NullChecker.isEmpty(password) ||
        !(password.length >= 8 && email.includes("@") && email.includes("."))) {
            validate = false;
        }

        setDisableSubmit(!validate);
    }

    return (
        <div id='signup-div'>
            <div className='signup-input-div'>
                <label>
                    email : 
                    <input name='signup-email-input'
                        type='email'
                        className='signup-input' 
                        ref={emailRef} 
                        onChange={validateSignUp}
                        />
                </label>
            </div>
            <div className='signup-input-div'>
                <label>
                    password : 
                    <input name='signup-pw-input'
                        type='password'
                        className='signup-input'
                        ref={pwRef} 
                        onChange={validateSignUp}
                        />
                </label>
            </div>
            <button onClick={doSignUp} disabled={disableSubmit}>제출하기</button>
            <button onClick={() => {navigate("/")}}>로그인으로 가기</button>
            <div id="signup-rule-div">
                <span>
                    이메일은 @,.이 포함되어야 합니다.
                    <br />
                    패스워드는 8자 이상으로 해주세요.
                </span>
            </div>
        </div>
    );
};

export default SignUp;