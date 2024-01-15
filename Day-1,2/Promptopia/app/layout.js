import Navbar from '@components/Navbar'
import '@styles/global.css';
import Providers from '@components/Providers';


export const metadata = {
  title: 'Promptopia',
  description: 'Discover and share AI Prompts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <div className='main'>
            <div className="gradient" />
          </div>
          <main className="app">
            <Navbar />
            {children}
          </main>
        </body>
      </Providers>
    </html>
  )
}
