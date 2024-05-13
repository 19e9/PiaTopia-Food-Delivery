import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>Daha iyi bir deneyim için uygulamamızı indirin<br /> PieTopia App</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="play-store" />
            <img src={assets.app_store} alt="app-store" />
        </div>
    </div>
  )
}

export default AppDownload