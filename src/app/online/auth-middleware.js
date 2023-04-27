'use client'
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

const USER_TOKEN_COOKIE_NAME = 'userToken'


const AuthMiddleware = ({ children }) => {
    const router = useRouter();

    const [cookies] = useCookies([USER_TOKEN_COOKIE_NAME]);


    useEffect(() => {
        if (!cookies.userToken) {
            router.push('/offline/connect');
        }
    }, [cookies]);

    if (cookies.userToken) {
        console.log("redirecting....;")
    }
    return <>{children}</>;



};

export default AuthMiddleware;
