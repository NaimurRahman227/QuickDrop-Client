import React from 'react'
import Logo from "/src/assets/logo.png"
import { Link } from 'react-router'
const QuickDropLogo = () => {
  return (
    <Link to='/'>
      <div className='flex items-end'>
        <img className='mb-1' src={Logo} alt="" />
        <p className='text-3xl -ml-4 font-bold'>QuickDrop</p>
      </div>
    </Link>
  )
}

export default QuickDropLogo
