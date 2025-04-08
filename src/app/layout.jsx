import '../styles/globals.css'

export const metadata = {
  title: 'LMS Cardano',
  description: 'Learning Management System on Cardano',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

