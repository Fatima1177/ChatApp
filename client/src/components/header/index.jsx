import React from 'react'
import './style.scss'
import {Link} from 'react-router-dom'

const Header = ({setshowForm}) => {
  return (
    <header>
      <h1>WhatsApp</h1>
      <nav>
        <Link to='/about'>About</Link>
        <Link to='/support'>Support</Link>
      </nav>
      <button onClick={() => setshowForm(true)}>Login</button>
    </header>
  )
}

export default Header