import React from 'react'
import { FileEarmarkTextFill } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <header className="w-full bg-[--mantine-color-brightSun-filled] text-[--mantine-color-white] shadow z-10">
      <nav className="w-full px-6 py-4 flex justify-between items-center max-w-screen-2xl mx-auto">
        {/* Left - Logo */}
        <div className="flex items-center space-x-3 font-semibold text-xl">
          <FileEarmarkTextFill size={28} />
          <span>Resume Builder</span>
        </div>

        {/* Right - Nav Links */}
        <ul className="flex items-center space-x-6 font-medium text-lg">
          <li>
            <Link
              to="/resume-builder"
              className="hover:text-[--mantine-color-black] transition-colors"
            >
              Resume Templates
            </Link>
          </li>
          <li>
            <Link
              to="/resume-builder/myresume"
              className="hover:text-[--mantine-color-black] transition-colors"
            >
              My Resume
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default NavBar
