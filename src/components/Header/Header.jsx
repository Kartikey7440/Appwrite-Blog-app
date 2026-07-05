import React, { useState } from 'react'
import {Container, Logo, LogoutBtn} from "../index"
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'


function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: 'Login',
      slug: "/login",
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: "/signup",
      active: !authStatus
    },
    {
      name: 'All Post',
      slug: "/all-post",
      active: authStatus
    },
    {
      name: 'Add Post',
      slug: "/add-post",
      active: authStatus
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/75 border-b border-zinc-900/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
      <Container>
        <nav className="flex items-center justify-between py-3">
          <div className="flex items-center">
            <Link to='/' className="flex items-center transition-transform hover:scale-105 duration-200">
              <Logo width='70px' />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1 sm:gap-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-4 py-2 text-sm font-semibold text-zinc-300 hover:text-white rounded-lg transition-all duration-200 hover:bg-zinc-900/60 relative group active:scale-95 cursor-pointer"
                  >
                    {item.name}
                    <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-red-600 origin-bottom-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 rounded-full shadow-[0_0_8px_#dc2626]"></span>
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="ml-1">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-zinc-400 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-zinc-900/60 transition-all duration-200 cursor-pointer"
              aria-label="Toggle Menu"
            >
              <svg className="h-6 w-6 fill-none stroke-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-900 bg-black/95 backdrop-blur-lg px-4 py-4 transition-all duration-300 ease-in-out">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="w-full">
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-semibold text-zinc-300 hover:text-white rounded-lg transition-all duration-200 hover:bg-zinc-900/60 active:scale-[0.98] cursor-pointer block"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="w-full pt-3 mt-1 border-t border-zinc-900/80">
                <LogoutBtn className="w-full text-center" onClick={() => setIsOpen(false)} />
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header

