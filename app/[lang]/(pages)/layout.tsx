import { PropsWithChildren } from 'react'
import Navbar from '@/components/Navbar'

type LayoutProps = PropsWithChildren<{}>

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex size-full flex-col">
      {children}
      <Navbar />
    </div>
  )
}

export default Layout
