import './globals.css'
//import './theme.css'

export const metadata = {
  metadataBase: new URL('https://yaml2form.vercel.app'),
  title: 'Parse YAML into a form to be edited and database stored',
  description:
    'A simple Next.js app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
