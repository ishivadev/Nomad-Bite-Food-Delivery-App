import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/frontend_assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download-id'>
      <p>For Better Experince Download <br /> Foodora App</p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="platstore" />
        <img src={assets.app_store} alt="appstore" />
      </div>
    </div>
  )
}

export default AppDownload
