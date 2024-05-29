import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';


const LoginPopup = ({ setShowLogin }) => {

    const {url,setToken} = useContext(StoreContext)

    const [currState, setCurrState] = useState("login")

    const [phoneValue, setPhoneValue] = useState('');
    
    const [data,setData] = useState({
        name:"",
        phone:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data,[name]:value}))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl =  url;
        if (currState==="login") {
            newUrl += "/api/user/login"
        }
        else{
            newUrl += "/api/user/register";
        }

        const response = await axios.post(newUrl,data);
        
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false)
        }
        else{
            alert(response.data.message)
        }
    } 

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                <h2>{currState === "login" ? "Giriş Yap" : "Üye Ol"}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
                </div>
                <div className="login-popup-inputs">
                    {currState === "login" ? <></> : <input type='text' name='name' onChange={onChangeHandler} value={data.name} placeholder='Adınız' required />}

                    {currState === "login" ? <></> : <input
                        name='phone'
                        onChange={onChangeHandler}
                        value={data.phone}
                        type='tel'
                        placeholder='Telefon Numaranız'
                        maxLength="10"
                        onKeyPress={(e) => {
                            if ((e.target.value.length === 0 && e.key !== '5') || (e.target.value.length > 0 && !/^[0-9]*$/.test(e.key)) || e.target.value.length >= 10) {
                                e.preventDefault();
                            }
                        }}
                        required
                    />}

                    <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='E-posta' required />
                    <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Şifre' required />
                    <button type='submit'>{currState === "register" ? "Üye Ol" : "Girişyap"}</button>
                </div>
                
                {currState !== "login" && (
                    <div className="login-popup-condition">
                        <input type="checkbox" required />
                        <p>Kullanım koşullarını ve gizlilik politikasını kabul ediyorum.</p>
                    </div>
                )}
                {currState === "login"
                    ? <p>Üye Olmak İstiyor musunuz ? <span onClick={() => setCurrState("register")}>Üye Ol</span></p>
                    : <p>Hesapınız varsa ?  <span onClick={() => setCurrState("login")}>Girişyap</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup