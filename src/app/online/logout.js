'use client'
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

const USER_TOKEN_COOKIE_NAME = 'userToken';
const USER_NAME_COOKIE_NAME = 'userName';
const USER_ID_COOKIE_NAME = 'userId'

const Logout = ({ children }) => {
    const router = useRouter();


    const [cookies, setCookie, removeCookie] = useCookies([USER_TOKEN_COOKIE_NAME, USER_NAME_COOKIE_NAME, USER_ID_COOKIE_NAME]);


    const logout = () => {
        removeCookie(USER_TOKEN_COOKIE_NAME, { domain: 'localhost', sameSite: "lax" });
        removeCookie(USER_NAME_COOKIE_NAME, { domain: 'localhost', sameSite: "lax" });
        removeCookie(USER_ID_COOKIE_NAME, { domain: 'localhost', sameSite: "lax" });
        router.push('/offline/connect')
    };

    return (
        <button className="" onClick={logout}>
            Logout
        </button>
    )



};

export default Logout;
