import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.css'

export default function Navbar() {
  return (
    <div className='header'>
        <Link className='header-nav-link' to= '../'>
            <h1 className='header-title'>Novusmundi</h1>
        </Link>
        <div className='header-nav'>
            <Link className='header-nav-link' to= '../gallery'>Gallery</Link>
        </div>
    </div>
  )
}
