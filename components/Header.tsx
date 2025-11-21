'use client'

type HeaderProps = {
  title: string
}

function Header({ title }: HeaderProps) {
  return (
    <div className="w-full py-4 font-semibold text-white shadow-md">
      <h1 className="text-center text-2xl">{title}</h1>
    </div>
  )
}

export default Header
