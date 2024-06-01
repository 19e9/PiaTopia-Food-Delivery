import React from 'react'
import './NotFound.css'

export const NotFound = () => {
  return (
    <div>
        <h1 className='error'>404</h1>
        <p className='message'>Üzgünüz, erişmek istediğiniz sayfa bulunamadı !</p>
    </div>
  )
}

export default NotFound
