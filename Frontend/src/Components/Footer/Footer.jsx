import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer-id'>
      <div className='footer-content'>
        <div className="footer-content-left">
            <img className='footer-logo' src={assets.logo} alt='logo' />
            <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="facebook-icon" />
                <img src={assets.twitter_icon} alt="twitter-icon" />
                <img src={assets.linkedin_icon} alt="linkedin-icon" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Company</h2>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2> Get In Touch</h2>
            <ul>
              <li>+0120-222-3421</li>
              <li>contact@foodora.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © Nomad Bite</p>
    </div>
  )
}

export default Footer
