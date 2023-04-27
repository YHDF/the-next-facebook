'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';

import '../../shared/shared.css';

const USER_TOKEN_COOKIE_NAME = 'userToken'
const USER_NAME_COOKIE_NAME = 'userName'
const USER_ID_COOKIE_NAME = 'userId'


const fetchUser = async (body) => {
    const res = await fetch('/api/auth/signin', { method: 'POST', body: JSON.stringify(body) });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }
    return res.json();
};

export default function Connect() {

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies([USER_TOKEN_COOKIE_NAME, USER_NAME_COOKIE_NAME]);


    useEffect(() => {
        if (cookies.userToken) {
            router.push('/online/dashboard')
        }
    });

    const signIn = () => {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const result = fetchUser({ username: username, password: password });
        result.then((user) => {
            removeCookie(USER_TOKEN_COOKIE_NAME, { domain: 'localhost', sameSite: "lax" });
            removeCookie(USER_NAME_COOKIE_NAME, { domain: 'localhost', sameSite: "lax" });
            removeCookie(USER_ID_COOKIE_NAME, { domain: 'localhost', sameSite: "lax" });
            setCookie(USER_TOKEN_COOKIE_NAME, user.token)
            setCookie(USER_NAME_COOKIE_NAME, user.username)
            setCookie(USER_ID_COOKIE_NAME, user.id)
            router.push('/online/dashboard')
        });
    };

    if (cookies.userToken) {
        return (
            <>
            </>
        )
    } else {
        return (
            <>
                <div className='login_frame'>
                    <div className='lbl'>
                        <label htmlFor='email'>Nom d'utilisateur :</label>
                    </div>
                    <div className='txt'>
                        <input ref={usernameRef} id='username' type='text' name='email' />
                    </div>
                    <div className='nopasswd'>
                        <a href='#'>forgot password ?</a>
                    </div>
                    <div className='lbl'>
                        <label htmlFor='password'>Mot de passe :</label>
                    </div>
                    <div className='txt'>
                        <input ref={passwordRef} id='password' type='password' name='password' />
                    </div>
                    <div className='submit-btn'>
                        <button onClick={signIn} type='button'>Se connecter</button>
                    </div>
                    <div className='submit-btn'>
                        <button onClick={() => {router.push('/offline/register')}} type='button'>Créer un compte</button>
                    </div>
                </div>
            </>
        )
    }

}
