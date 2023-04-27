import { cookies } from 'next/headers';

import '../globals.css'
import AuthMiddleware from './auth-middleware';
import Logout from './logout';

export const metadata = {
  title: 'Next Facebook',
  description: 'Une application de disscussion en ligne',
}

export default function RootLayout({ children }) {
  return (
        <>
        <nav>
        <Logout/>
        </nav>
        
        <AuthMiddleware children={children}>
        
          </AuthMiddleware>
        </>
  );
}
