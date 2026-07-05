import React from 'react'
import {Container, Logo, LogoutBtn} from "../index"
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'


function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

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
          <ul className="flex items-center gap-1 sm:gap-2">
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
        </nav>
      </Container>
    </header>
  )
}

export default Header
