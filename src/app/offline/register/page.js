'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';

import '../../shared/shared.css';

const USER_TOKEN_COOKIE_NAME = 'userToken'
const USER_NAME_COOKIE_NAME = 'userName'
const USER_ID_COOKIE_NAME = 'userId'

const CreateUser = async (body) => {
    const res = await fetch('/api/auth/signup', { method: 'POST', body: JSON.stringify(body) });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }
    return res.json();
};

const Register = () => {

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const emailRef = useRef(null);
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies([USER_TOKEN_COOKIE_NAME, USER_NAME_COOKIE_NAME]);

    useEffect(() => {

    });

    const signUp = () => {
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const result = CreateUser({ username: username, email: email, password: password });
        result.then((user) => {
            setCookie(USER_TOKEN_COOKIE_NAME, user.token)
            setCookie(USER_NAME_COOKIE_NAME, user.username)
            setCookie(USER_ID_COOKIE_NAME, user.id)
            console.log(user);
            router.push('/chat')
        });
    };



    return (
        <div className="login_frame" style={{ height: "45%" }}>
            <div className="lbl">
                <label htmlFor="username">nom d'utilisateur :</label>
            </div>
            <div className="txt">
                <input ref={usernameRef} type="text" name="username" />
            </div>
            <div className="lbl">
                <label htmlFor="email">addresse email :</label>
            </div>
            <div className="txt">
                <input ref={emailRef} type="text" name="email" />
            </div>
            <div className="lbl">
                <label htmlFor="password">mot de passe :</label>
            </div>
            <div className="txt">
                <input ref={passwordRef} type="password" name="password" />
            </div>
            <div className='submit-btn'>
                <button onClick={signUp} type='button'>Créer un compte</button>
            </div>
        </div>
    );
};

export default Register;
