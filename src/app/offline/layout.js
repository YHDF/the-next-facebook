import '../globals.css'
export const metadata = {
  title: 'Next Facebook',
  description: 'Une application de disscussion en ligne',
}

export default function RootLayout({ children }) {
  return (
    
        <main>
          {children}
        </main>
        

  );
}
