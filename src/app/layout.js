
export const metadata = {
  title: 'Next Facebook',
  description: 'Une application de disscussion en ligne',
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <header>
          {/* Header content */}
        </header>
        <nav>
          {/* Navigation content */}
        </nav>
        <main>
          {children}
        </main>
        <footer>
          {/* Footer content */}
        </footer>
      </body>
    </html>

  );
}
