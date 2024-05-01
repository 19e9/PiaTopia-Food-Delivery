import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo_for_footer} alt="logo-for-footer" />
                    <p>2024 yılının Hazıran ayında hizmetinize giren Pietopia Restaurant her geçen gün sizlere daha da kaliteli hizmet vermeyi görev bilen deneyimli ekibi ile Samsun'da yeme- içme kültürü ve alışkanlıklarını değiştiren işletme politikası ile eğlence anlayışına yeni bir bakış açısı getirmek istiyor.</p>
                    <div className="footer-soical-icons">
                        <img src={assets.facebook_icon} alt="facebook" />
                        <img src={assets.twitter_icon} alt="twitter" />
                        <img src={assets.linkedin_icon} alt="linkedin" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>Hızlı Erişim Menüsü</h2>
                    <ul>
                        <li>AnaSayfa</li>
                        <li>Hakkımızda</li>
                        <li>Kullanım koşulları</li>
                        <li>Gizlilik politikası</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>İletişim</h2>
                    <ul>
                        <li>0 850 888 90 24</li>
                        <li>iletişim@pietopia.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright © PieTopia 2024. Tüm hakları saklıdır.</p>
        </div>
    )
}

export default Footer