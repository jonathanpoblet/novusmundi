import React from 'react';
import { Link } from 'react-router-dom'

import './home.css'

export default function Home() {
  return (
    <div  className='home'>
      <h1 className='home-title'>DIGITAL ART</h1>
      <h2 className='home-subtitle'>See all the images in the Gallery</h2>
      <Link className='home-link' to='/gallery'>
        Gallery
      </Link>
    </div>
  )
}
