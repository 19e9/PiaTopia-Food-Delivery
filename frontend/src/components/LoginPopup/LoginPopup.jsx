import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';


const LoginPopup = ({ setShowLogin }) => {

    const {url,setToken} = useContext(StoreContext)

    const [currState, setCurrState] = useState("Girişyap")

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
        if (currState==="Login") {
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
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Girişyap" ? <></> : <input type='text' name='name' onChange={onChangeHandler} value={data.name} placeholder='Adınız' required />}

                    {currState === "Girişyap" ? <></> : <input
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
                    <button type='submit'>{currState === "Üye Ol" ? "Üye Ol" : "Girişyap"}</button>
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