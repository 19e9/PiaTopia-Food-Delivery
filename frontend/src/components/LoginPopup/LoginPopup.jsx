import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({ setShowLogin }) => {

    const [currState, setCurrState] = useState("Girişyap")

    const [phoneValue, setPhoneValue] = useState('');

    return (
        <div className='login-popup'>
            <form className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Girişyap" ? <></> : <input type='text' placeholder='Adınız' required />}

                    {currState === "Girişyap" ? <></> : <input
                        type='tel'
                        placeholder='Telefon Numaranız'
                        maxLength="11"
                        onKeyPress={(e) => {
                            if ((e.target.value.length === 0 && e.key !== '0') || (e.target.value.length > 0 && !/^[0-9]*$/.test(e.key)) || e.target.value.length >= 11) {
                                e.preventDefault();
                            }
                        }}
                        required
                    />}

                    <input type="email" placeholder='E-posta' required />
                    <input type="password" placeholder='Şifre' required />
                    <button>{currState === "Üye Ol" ? "Üye Ol" : "Girişyap"}</button>
                </div>
                
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>Kullanım koşullarını ve gizlilik politikasını kabul ediyorum.</p>
                </div>
                {currState === "Girişyap"
                    ? <p>Üye Olmak İstiyor musunuz ? <span onClick={() => setCurrState("Üye Ol")}>Üye Ol</span></p>
                    : <p>Hesapınız varsa ?  <span onClick={() => setCurrState("Girişyap")}>Girişyap</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup