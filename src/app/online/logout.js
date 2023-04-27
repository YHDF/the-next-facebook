'use client'
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

const USER_TOKEN_COOKIE_NAME = 'userToken';
const USER_NAME_COOKIE_NAME = 'userName';
const USER_ID_COOKIE_NAME = 'userId'

const style = {

    redirectButton: {
        width: 'fit-content',
        height: '4vh',
        marginLeft: '2vw',
        marginTop: '2vh',
        border: 'none',
        backgroundColor: '#fff',
        color: '#000',
        cursor: 'pointer',
        borderRadius: '20px',
        display: 'inline-block'

    },

    currentUser: {
        width: 'fit-content',
        height: '4vh',
        marginLeft: '2vw',
        marginTop: '2vh',
        border: 'none',
        backgroundColor: 'transparent',
        color: '#fff',
        borderRadius: '20px',
        display: 'inline-block'
    }
};

const Logout = ({ children }) => {
    const router = useRouter();

    const [userName, setUserName] = useState('')

    const [cookies, setCookie, removeCookie] = useCookies([USER_TOKEN_COOKIE_NAME, USER_NAME_COOKIE_NAME, USER_ID_COOKIE_NAME]);

    useEffect(() => {
        setUserName((oldUserName) => cookies.userName)
    })

    const logout = () => {
        removeCookie(USER_TOKEN_COOKIE_NAME, { domain: 'localhost', sameSite: "lax" });
        removeCookie(USER_NAME_COOKIE_NAME, { domain: 'localhost', sameSite: "lax" });
        removeCookie(USER_ID_COOKIE_NAME, { domain: 'localhost', sameSite: "lax" });
        router.push('/offline/connect')
    };

    return (
        <>
            <button style={style.redirectButton} onClick={logout}>
                Logout
            </button>
            <button style={style.redirectButton} onClick={() => router.push('/online/dashboard')}>
                Home
            </button>
            <button style={style.currentUser} onClick={() => null}>Connected as : {userName} </button>
        </>
    )



};

export default Logout;
